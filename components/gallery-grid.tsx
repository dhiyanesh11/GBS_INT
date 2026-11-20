"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  gallery,
  galleryRooms,
  galleryStyles,
  type GalleryItem,
} from "@/lib/site";

const ratios = ["3 / 4", "4 / 3", "1 / 1", "4 / 5", "3 / 2"];

export function GalleryGrid({ items = gallery }: { items?: GalleryItem[] }) {
  const [room, setRoom] = useState("All");
  const [style, setStyle] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (room === "All" || item.room === room) &&
          (style === "All" || item.style === style)
      ),
    [items, room, style]
  );

  const active = openIndex === null ? null : filtered[openIndex] || null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  function step(direction: 1 | -1) {
    if (openIndex === null) return;
    setOpenIndex((openIndex + direction + filtered.length) % filtered.length);
  }

  return (
    <>
      <div className="filter-bar">
        <span className="filter-label">Room</span>
        {galleryRooms.map((option) => (
          <button
            key={option}
            type="button"
            className={`chip${room === option ? " is-active" : ""}`}
            aria-pressed={room === option}
            onClick={() => {
              setRoom(option);
              setOpenIndex(null);
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="filter-bar">
        <span className="filter-label">Direction</span>
        {galleryStyles.map((option) => (
          <button
            key={option}
            type="button"
            className={`chip${style === option ? " is-active" : ""}`}
            aria-pressed={style === option}
            onClick={() => {
              setStyle(option);
              setOpenIndex(null);
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <p className="form-note" aria-live="polite" style={{ marginBottom: 18 }}>
        {filtered.length} {filtered.length === 1 ? "image" : "images"} ·
        Representative imagery, not completed client projects.
      </p>

      {filtered.length === 0 ? (
        <p className="gallery-empty">
          Nothing in this combination yet. Try another room or direction.
        </p>
      ) : (
        <div className="gallery-masonry">
          {filtered.map((item, index) => (
            <button
              className="gallery-item"
              key={`${item.src}-${index}`}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open ${item.alt}`}
            >
              <div
                className="gallery-frame"
                style={{ aspectRatio: ratios[index % ratios.length] }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                />
              </div>
              <span className="gallery-caption">
                <span>{item.room}</span>
                <span>{item.style}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Image viewer"
        onClose={() => setOpenIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
      >
        {active && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.alt} />
            <div className="lightbox-bar">
              <span>
                {active.room} · {active.style}
              </span>
              <span style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => step(-1)}>
                  ← Previous
                </button>
                <button type="button" onClick={() => step(1)}>
                  Next →
                </button>
                <button type="button" onClick={() => dialogRef.current?.close()}>
                  Close
                </button>
              </span>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
