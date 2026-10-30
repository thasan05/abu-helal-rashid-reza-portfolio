"use server";

import { redirect } from "next/navigation";
import { query, queryOne } from "@/lib/db/client";
import { verifyPassword } from "@/lib/auth/password";
import { setAdminSession, removeAdminSession, getAdminSession } from "@/lib/auth/session";

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/admin";

  if (!username || !password) {
    return { error: "Please provide both username and password." };
  }

  try {
    const user = await queryOne(
      `SELECT id, username, password_hash, role FROM admin_users WHERE username = $1`,
      [username.trim()]
    );

    if (!user) {
      return { error: "Invalid administrative credentials." };
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return { error: "Invalid administrative credentials." };
    }

    // Set authenticated session cookie
    await setAdminSession({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    // Update last login
    await query(`UPDATE admin_users SET last_login_at = NOW() WHERE id = $1`, [user.id]);

    // Log activity
    await query(
      `INSERT INTO activity_logs (action, entity_type, entity_id, details, performed_by)
       VALUES ('LOGIN', 'AUTH', $1, 'Admin logged into CMS console.', $2)`,
      [user.id, user.username]
    );
  } catch (err: any) {
    console.error("Login failure:", err);
    return { error: "An unexpected error occurred during authentication." };
  }

  redirect(redirectTo);
}

export async function logoutAction() {
  const session = await getAdminSession();
  if (session) {
    await query(
      `INSERT INTO activity_logs (action, entity_type, entity_id, details, performed_by)
       VALUES ('LOGOUT', 'AUTH', $1, 'Admin logged out of CMS console.', $2)`,
      [session.userId, session.username]
    );
  }
  await removeAdminSession();
  redirect("/admin/login");
}
