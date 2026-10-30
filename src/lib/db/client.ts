import { neon } from "@neondatabase/serverless";

export const getDb = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not configured.");
  }
  return neon(url);
};

export const query = async <T = any>(queryString: string, params: any[] = []): Promise<T[]> => {
  const sql = getDb();
  if (params.length === 0) {
    const result = await sql.query(queryString);
    return result as T[];
  }
  const result = await sql.query(queryString, params);
  return result as T[];
};

export const queryOne = async <T = any>(queryString: string, params: any[] = []): Promise<T | null> => {
  const rows = await query<T>(queryString, params);
  return rows.length > 0 ? rows[0] : null;
};
