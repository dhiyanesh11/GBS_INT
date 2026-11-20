import "server-only";
import {readdir,readFile} from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
export type BlogPost={slug:string;title:string;date:string;description:string;cover:string;coverAlt:string;body:string;readingTime:number};
const directory=path.join(process.cwd(),"content","blog");
export async function getBlogPosts():Promise<BlogPost[]>{const files=(await readdir(directory)).filter(file=>file.endsWith(".mdx"));const posts=await Promise.all(files.map(async file=>{const {data,content}=matter(await readFile(path.join(directory,file),"utf8"));const words=content.trim().split(/\s+/).length;return {slug:file.replace(/\.mdx$/,""),title:String(data.title||""),date:String(data.date||""),description:String(data.description||""),cover:String(data.cover||""),coverAlt:String(data.coverAlt||""),body:content,readingTime:Math.max(1,Math.ceil(words/220))}}));return posts.sort((a,b)=>b.date.localeCompare(a.date))}
export async function getBlogPost(slug:string){return (await getBlogPosts()).find(post=>post.slug===slug)}
