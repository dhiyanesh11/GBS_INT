"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const blank = (): Project => ({ id: crypto.randomUUID(), title: "", slug: "", type: "Residential", location: "", description: "", images: [], updatedAt: new Date().toISOString() });

export function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("Loading projects...");
  const [busy, setBusy] = useState(false);
  const current = projects.find(p => p.id === selected);

  useEffect(() => {
    fetch("/api/admin/projects").then(async response => {
      if (response.status === 401) { router.replace("/admin/login"); return null; }
      if (!response.ok) throw new Error("Could not load projects.");
      return response.json();
    }).then(data => { if (data) { setProjects(data); setSelected(data[0]?.id || ""); setStatus(data.length ? "" : "Add a project to start your showcase."); } }).catch(error => setStatus(error.message));
  }, [router]);

  function update<K extends keyof Project>(key: K, value: Project[K]) {
    if (!current) return;
    setProjects(all => all.map(project => project.id === current.id ? { ...project, [key]: value } : project));
  }
  function add() { const project = blank(); setProjects(all => [...all, project]); setSelected(project.id); setStatus("Unsaved project. Add its details and save."); }
  function remove() { if (!current) return; setProjects(all => all.filter(p => p.id !== current.id)); setSelected(""); setStatus("Project removed. Save changes to publish."); }
  async function save() {
    setBusy(true); setStatus("");
    try {
      const payload = projects.map(p => ({ ...p, images: p.images.map(url => url.trim()).filter(Boolean) }));
      const response = await fetch("/api/admin/projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not save.");
      setProjects(data); setSelected(data.find((p: Project) => p.id === selected)?.id || data[0]?.id || ""); setStatus("Changes saved. The public showcase is updated."); router.refresh();
    } catch (error) { setStatus(error instanceof Error ? error.message : "Could not save changes."); } finally { setBusy(false); }
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); router.refresh(); }

  return <div className="admin-dashboard">
    <div className="admin-top"><Link className="wordmark" href="/"><span className="mark">G<span>B</span>S</span><span className="wordmark-caption">INTERIORS</span></Link><div className="admin-top-actions"><Link className="admin-logout" href="/admin/enquiries">Enquiries ↗</Link><span className="admin-badge">ADMIN</span><button className="admin-logout" onClick={logout}>Sign out ↗</button></div></div>
    <div className="admin-heading"><div><div className="section-kicker">SHOWCASE MANAGEMENT</div><h1>Your <em>projects.</em></h1><p>Edit project details and the photos shown on the public site.</p></div><button className="button" onClick={add}>Add project <span>＋</span></button></div>
    <div className="admin-workspace"><aside className="admin-project-list"><div className="admin-list-title">PROJECTS <span>{projects.length}</span></div>{projects.map(project => <button key={project.id} className={selected === project.id ? "admin-project-item active" : "admin-project-item"} onClick={() => setSelected(project.id)}><span>{project.title || "Untitled project"}</span><small>{project.type} · {project.location || "Location"}</small></button>)}{!projects.length && <p className="admin-empty">No projects yet.</p>}</aside>
      {current ? <section className="admin-editor"><div className="admin-editor-head"><div><div className="section-kicker">PROJECT DETAILS</div><h2>{current.title || "New project"}</h2></div><button className="admin-delete" onClick={remove}>Delete project</button></div>
        <div className="admin-fields"><label>Project title<input value={current.title} onChange={e => update("title", e.target.value)} /></label><label>URL slug<input value={current.slug} onChange={e => update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/--+/g, "-"))} /></label><label>Project type<select value={current.type} onChange={e => update("type", e.target.value as Project["type"])}><option>Residential</option><option>Commercial</option></select></label><label>Location<input value={current.location} onChange={e => update("location", e.target.value)} /></label><label className="field-wide">Description<textarea rows={5} value={current.description} onChange={e => update("description", e.target.value)} /></label>
          <label className="field-wide">Photo URLs <small>One HTTPS image URL per line. First image is the cover; reorder the lines to reorder photos.</small><textarea rows={6} value={current.images.join("\n")} onChange={e => update("images", e.target.value.split("\n"))} /></label>
        </div><div className="admin-editor-bottom"><p role="status">{status}</p><button className="button" onClick={save} disabled={busy}>{busy ? "Saving..." : "Save changes"}<span>↗</span></button></div>
      </section> : <section className="admin-editor admin-editor-empty"><p>{status || "Select a project or add a new one."}</p></section>}</div>
    <p className="admin-footnote">Saved changes update the public showcase.</p>
  </div>;
}
