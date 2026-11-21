import {NextResponse} from "next/server";
import {randomUUID} from "node:crypto";
import {z} from "zod";
import {appendEnquiry} from "@/lib/enquiries";
import {rateLimit} from "@/lib/rate-limit";

const schema=z.object({name:z.string().trim().min(2).max(100),phone:z.string().trim().regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/,{error:"Enter a valid 10-digit Indian mobile number (you may add +91)."}),email:z.union([z.string().trim().email().max(254),z.literal("")]).optional(),city:z.string().trim().min(2).max(100),propertyType:z.enum(["Home","Commercial"]),service:z.string().trim().min(2).max(100),budget:z.string().trim().max(100).optional(),message:z.string().trim().max(2000).optional(),source:z.string().trim().max(100).optional(),estimateRange:z.string().trim().max(100).optional(),consent:z.literal(true),website:z.string().max(0).optional()});
export async function POST(request:Request){
  const origin=request.headers.get("origin");if(origin&&new URL(origin).host!==new URL(request.url).host)return NextResponse.json({error:"Request rejected."},{status:403});
  if(Number(request.headers.get("content-length")||0)>12_000)return NextResponse.json({error:"Request is too large."},{status:413});
  const ip=request.headers.get("cf-connecting-ip")?.trim()||request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim()||"unknown";const limit=process.env.NODE_ENV==="production"?5:100;if(!await rateLimit(ip,limit,10*60_000))return NextResponse.json({error:"Please wait a few minutes before trying again."},{status:429});
  let raw:unknown;try{raw=await request.json()}catch{return NextResponse.json({error:"Invalid request."},{status:400})}
  const parsed=schema.safeParse(raw);if(!parsed.success){const fields:Record<string,string>={};for(const issue of parsed.error.issues){const key=String(issue.path[0]||"form");fields[key]??=issue.message}return NextResponse.json({error:"Please correct the highlighted fields.",fields},{status:400})}
  const data=parsed.data;if(data.website)return NextResponse.json({ok:true});
  try{await appendEnquiry({id:randomUUID(),receivedAt:new Date().toISOString(),name:data.name,phone:data.phone,email:data.email||"",city:data.city,propertyType:data.propertyType,service:data.service,budget:data.budget||"",message:[data.estimateRange&&`Estimate: ${data.estimateRange}`,data.source&&`Source: ${data.source}`,data.message].filter(Boolean).join("\n"),consent:data.consent,deliveryStatus:"saved"});return NextResponse.json({ok:true},{status:201})}catch{return NextResponse.json({error:"We couldn’t save your enquiry. Please try again or contact us directly."},{status:503})}
}
