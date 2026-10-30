import { query, queryOne } from "../src/lib/db/client";
import { getPublishedPortfolioData } from "../src/lib/db/data";
import { verifyPassword } from "../src/lib/auth/password";
import { createSessionToken, verifySessionToken } from "../src/lib/auth/session";

async function runEndToEndVerification() {
  console.log("=================================================");
  console.log("  CMS & ADMIN PANEL END-TO-END VERIFICATION SUITE");
  console.log("=================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`[PASS] ${testName}`);
    } else {
      console.error(`[FAIL] ${testName} - ${detail || "Assertion failed"}`);
      process.exitCode = 1;
    }
  }

  try {
    // 1. Database Connectivity & Table Check
    console.log("--- 1. Database Tables Integrity ---");
    const tables = [
      "site_settings", "seo_settings", "hero_settings", "headline_metrics",
      "executive_intro", "career_roles", "projects", "expertise_areas",
      "leadership_philosophy", "leadership_principles", "mentorship_settings",
      "mentorship_activities", "insight_articles", "credential_items",
      "personal_dimension", "personal_interests", "contact_settings",
      "contact_inquiries", "section_configurations", "theme_settings",
      "media_assets", "admin_users", "activity_logs"
    ];

    for (const table of tables) {
      const res = await query(`SELECT COUNT(*) as count FROM ${table}`);
      assert(res.length > 0, `Table '${table}' exists and is queryable`);
    }

    // 2. Default Admin Credentials Check
    console.log("\n--- 2. Administrative Authentication & Security ---");
    const adminUser = await queryOne<any>(`SELECT * FROM admin_users WHERE username = 'admin'`);
    assert(!!adminUser, "Admin user 'admin' exists in database");

    if (adminUser) {
      const isPasswordValid = await verifyPassword("Reza@Admin2026!", adminUser.password_hash);
      assert(isPasswordValid, "Password verification for admin matches 'Reza@Admin2026!'");

      const isBadPasswordRejected = !(await verifyPassword("WrongPassword123!", adminUser.password_hash));
      assert(isBadPasswordRejected, "Invalid password attempt is correctly rejected");

      // Test JWT session token creation & verification
      const token = await createSessionToken({ userId: "admin", username: "admin", role: "admin" });
      assert(typeof token === "string" && token.length > 20, "JWT session token created successfully");

      const verifiedPayload = await verifySessionToken(token);
      assert(verifiedPayload?.username === "admin", "Session token payload verifies 'admin'");

      const invalidPayload = await verifySessionToken("invalid.token.signature");
      assert(invalidPayload === null, "Malformed session token correctly rejected as null");
    }

    // 3. Data Retrieval Layer & Mapping
    console.log("\n--- 3. Public Data Retrieval Layer ---");
    const publicData = await getPublishedPortfolioData();
    assert(!!publicData.personalInfo.fullName, "Personal info loaded with full name: " + publicData.personalInfo.fullName);
    assert(publicData.careerTimeline.length > 0, `Career timeline loaded with ${publicData.careerTimeline.length} roles`);
    assert(publicData.projects.length > 0, `Landmark projects loaded with ${publicData.projects.length} projects`);
    assert(publicData.expertise.length > 0, `Capabilities matrix loaded with ${publicData.expertise.length} areas`);
    assert(publicData.sectionConfigs.length >= 11, `Section configurations loaded with ${publicData.sectionConfigs.length} sections`);

    // 4. Content Mutation & Reversion (CRUD)
    console.log("\n--- 4. Live Mutation & Persistence Verification ---");
    const originalSettings = await queryOne<any>(`SELECT professional_headline FROM site_settings WHERE id = 'default'`);
    const originalHeadline = originalSettings?.professional_headline;

    // Mutate
    const testHeadline = "Verified General Manager & Project Director [TEST MUTATION]";
    await query(`UPDATE site_settings SET professional_headline = $1 WHERE id = 'default'`, [testHeadline]);

    const updatedSettings = await queryOne<any>(`SELECT professional_headline FROM site_settings WHERE id = 'default'`);
    assert(updatedSettings?.professional_headline === testHeadline, "Database record successfully mutated");

    // Revert
    await query(`UPDATE site_settings SET professional_headline = $1 WHERE id = 'default'`, [originalHeadline]);
    const revertedSettings = await queryOne<any>(`SELECT professional_headline FROM site_settings WHERE id = 'default'`);
    assert(revertedSettings?.professional_headline === originalHeadline, "Database record safely restored to original");

    // 5. Inquiries Table & Activity Logs
    console.log("\n--- 5. Consultation Inquiries & Audit Trail ---");
    const testInquiryEmail = `test-e2e-${Date.now()}@example.com`;
    await query(
      `INSERT INTO contact_inquiries (name, email, organization, subject, message)
       VALUES ($1, $2, $3, $4, $5)`,
      ["E2E Test Consultant", testInquiryEmail, "Verification Bot Ltd", "Automated QA Verification", "Test message payload"]
    );

    const inquiryRow = await queryOne<any>(`SELECT * FROM contact_inquiries WHERE email = $1`, [testInquiryEmail]);
    assert(!!inquiryRow, "Consultation inquiry recorded in database");

    // Clean up test inquiry
    if (inquiryRow) {
      await query(`DELETE FROM contact_inquiries WHERE id = $1`, [inquiryRow.id]);
      const checkDeleted = await queryOne<any>(`SELECT * FROM contact_inquiries WHERE id = $1`, [inquiryRow.id]);
      assert(checkDeleted === null, "Test inquiry cleaned up successfully");
    }

    // Verify activity logs recording
    await query(
      `INSERT INTO activity_logs (action, entity_type, entity_id, details, performed_by)
       VALUES ('E2E_TEST', 'VERIFICATION_SUITE', 'test-run', 'Automated E2E Suite executed', 'qa_bot')`
    );
    const logEntry = await queryOne<any>(`SELECT * FROM activity_logs WHERE action = 'E2E_TEST' ORDER BY created_at DESC LIMIT 1`);
    assert(!!logEntry, "Activity audit log created and retrieved");
    if (logEntry) {
      await query(`DELETE FROM activity_logs WHERE id = $1`, [logEntry.id]);
    }

    console.log("\n=================================================");
    console.log(`  VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
    console.log("=================================================\n");

  } catch (error) {
    console.error("Verification suite failed with error:", error);
    process.exitCode = 1;
  }
}

runEndToEndVerification();
