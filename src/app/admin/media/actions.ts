"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/db/client";
import { getAdminSession } from "@/lib/auth/session";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function uploadMediaFile(formData: FormData) {
  const session = await getAdminSession();
  if (!session) {
    return { error: "Unauthorized access." };
  }

  const file = formData.get("file") as File | null;
  const altText = (formData.get("altText") as string) || "";
  const category = (formData.get("category") as string) || "general";

  if (!file || file.size === 0) {
    return { error: "Please select a valid file to upload." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP, SVG, PDF.` };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { error: `File size exceeds 10MB limit (File is ${(file.size / (1024 * 1024)).toFixed(1)}MB).` };
  }

  try {
    // Generate safe filename
    const ext = path.extname(file.name) || (file.type === "image/png" ? ".png" : ".jpg");
    const baseName = path.parse(file.name).name.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const uniqueFilename = `${baseName}-${Date.now()}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const targetPath = path.join(uploadsDir, uniqueFilename);
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(targetPath, Buffer.from(bytes));

    const publicUrl = `/uploads/${uniqueFilename}`;
    const assetId = `asset-${Date.now()}`;

    await query(
      `INSERT INTO media_assets (id, filename, file_path, file_size, mime_type, alt_text, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [assetId, uniqueFilename, publicUrl, file.size, file.type, altText || uniqueFilename, category]
    );

    await query(
      `INSERT INTO activity_logs (action, entity_type, entity_id, details, performed_by)
       VALUES ('UPLOAD', 'MEDIA_ASSET', $1, $2, $3)`,
      [assetId, `Uploaded media asset: ${uniqueFilename}`, session.username]
    );

    revalidatePath("/admin/media");
    return { success: true, url: publicUrl, message: `File uploaded successfully as ${uniqueFilename}` };
  } catch (err: any) {
    console.error("Upload error:", err);
    return { error: "Failed to save file to storage." };
  }
}
