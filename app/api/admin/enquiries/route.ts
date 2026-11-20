import {NextResponse} from "next/server";
import {isAdmin} from "@/lib/admin-auth";
import {listEnquiries} from "@/lib/enquiries";
export async function GET(request:Request){if(!await isAdmin())return NextResponse.json({error:"Unauthorized."},{status:401});try{const search=new URL(request.url).searchParams.get("q")?.trim().slice(0,100)||"";return NextResponse.json(await listEnquiries(search),{headers:{"Cache-Control":"no-store"}})}catch{return NextResponse.json({error:"Could not load enquiries. Check database setup."},{status:503})}}
