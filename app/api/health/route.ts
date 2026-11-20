import {NextResponse} from "next/server";import {db} from "@/lib/db";
export const dynamic="force-dynamic";
export async function GET(){try{if(process.env.DATABASE_URL)await db().query("SELECT 1");else if(process.env.NODE_ENV==="production")throw new Error("Database unavailable");return NextResponse.json({status:"ok"},{headers:{"Cache-Control":"no-store"}})}catch{return NextResponse.json({status:"unavailable"},{status:503,headers:{"Cache-Control":"no-store"}})}}
