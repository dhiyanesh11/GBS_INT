import Link from "next/link";
import type {Metadata} from "next";
import {getBlogPosts} from "@/lib/blog";
export const metadata:Metadata={title:"Journal"};
export default async function Blog(){const posts=await getBlogPosts();return <main className="inner-page"><div className="inner-hero"><div className="section-kicker">THE JOURNAL</div><h1>Ideas for more<br/><em>thoughtful spaces.</em></h1><p>Notes on materials, the details that matter, and making a home your own.</p></div><div className="journal-grid journal-posts">{posts.map(post=><article key={post.slug}><Link href={`/blog/${post.slug}`}><div className="journal-image" style={{backgroundImage:`url(${post.cover})`}}/></Link><span className="section-kicker">DESIGN NOTES · {post.readingTime} MIN READ</span><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><Link href={`/blog/${post.slug}`} className="text-link">Read story <span>↗</span></Link></article>)}</div></main>}
