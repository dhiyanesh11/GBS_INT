import "server-only";
import {Pool} from "pg";
const globalPool=globalThis as typeof globalThis & {gbsPool?:Pool};
export function db(){if(!process.env.DATABASE_URL)throw new Error("DATABASE_URL is not configured.");if(!globalPool.gbsPool){const url=new URL(process.env.DATABASE_URL);if(process.env.DATABASE_SSL!=="false")url.searchParams.set("sslmode","verify-full");globalPool.gbsPool=new Pool({connectionString:url.toString(),max:5,idleTimeoutMillis:30_000,connectionTimeoutMillis:5_000,ssl:process.env.DATABASE_SSL==="false"?undefined:{rejectUnauthorized:true}})}return globalPool.gbsPool}
