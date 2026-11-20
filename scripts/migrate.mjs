import {Pool} from "pg";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const {loadEnvConfig}=require("@next/env");
import {readdir,readFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
loadEnvConfig(process.cwd());
if(!process.env.DATABASE_URL){console.error("Set DATABASE_URL before running migrations.");process.exit(1)}
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const databaseUrl=new URL(process.env.DATABASE_URL);if(process.env.DATABASE_SSL!=="false")databaseUrl.searchParams.set("sslmode","verify-full");
const pool=new Pool({connectionString:databaseUrl.toString(),ssl:process.env.DATABASE_SSL==="false"?undefined:{rejectUnauthorized:true},max:1});
const client=await pool.connect();
try{await client.query("SELECT pg_advisory_lock(748392105)");await client.query("CREATE TABLE IF NOT EXISTS schema_migrations(name text PRIMARY KEY,applied_at timestamptz NOT NULL DEFAULT now())");const files=(await readdir(path.join(root,"db","migrations"))).filter(f=>f.endsWith(".sql")).sort();for(const name of files){const prior=await client.query("SELECT 1 FROM schema_migrations WHERE name=$1",[name]);if(prior.rowCount)continue;await client.query("BEGIN");try{await client.query(await readFile(path.join(root,"db","migrations",name),"utf8"));await client.query("INSERT INTO schema_migrations(name) VALUES($1)",[name]);await client.query("COMMIT");console.log(`Applied ${name}`)}catch(error){await client.query("ROLLBACK");throw error}}}finally{await client.query("SELECT pg_advisory_unlock(748392105)");client.release();await pool.end()}
