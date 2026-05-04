"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ImageMagnifierProps {
  src: string;
  zoomSrc: string;
  alt: string;
  width: number;
  height: number;
  zoomLevel?: number;
  lensSize?: number;
  zoomPanelWidth?: number;
}

export default function ImageMagnifier({
  src,
  zoomSrc,
  alt,
  width,
  height,
  zoomLevel = 2.5,
  lensSize = 120,
  zoomPanelWidth = 380,
}: ImageMagnifierProps) {
  const [isCoarsePointer, setIsCoarsePointer] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [zoomReady, setZoomReady] = useState(false);
  const triggered = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomImgRef = useRef<HTMLImageElement>(null);
  const rafId = useRef<number>(0);

  const zoomLevelRef = useRef(zoomLevel);
  const lensSizeRef = useRef(lensSize);
  const panelWidthRef = useRef(zoomPanelWidth);

  useEffect(() => {
    zoomLevelRef.current = zoomLevel;
  }, [zoomLevel]);
  useEffect(() => {
    lensSizeRef.current = lensSize;
  }, [lensSize]);
  useEffect(() => {
    panelWidthRef.current = zoomPanelWidth;
  }, [zoomPanelWidth]);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const containerA11y = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    if (modalOpen) closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModalOpen(false);
        containerA11y.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  function handlePointerUp() {
    if (!isCoarsePointer) return;
    if (!triggered.current) {
      triggered.current = true;
      setZoomReady(true);
    }
    setModalOpen(true);
  }

  function handlePointerEnter() {
    if (isCoarsePointer) return;
    if (!triggered.current) {
      triggered.current = true;
      setZoomReady(true);
    }
    setActive(true);
  }

  function handlePointerLeave() {
    if (isCoarsePointer) return;
    cancelAnimationFrame(rafId.current);
    setActive(false);
  }

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isCoarsePointer) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const ls = lensSizeRef.current;
        const zl = zoomLevelRef.current;
        const pw = panelWidthRef.current;
        const ph = rect.height;
        const zw = width * zl;
        const zh = height * zl;

        const rx = e.clientX - rect.left;
        const ry = e.clientY - rect.top;

        const cx = Math.max(ls / 2, Math.min(rx, rect.width - ls / 2));
        const cy = Math.max(ls / 2, Math.min(ry, rect.height - ls / 2));

        if (lensRef.current) {
          lensRef.current.style.transform = `translate3d(${cx - ls / 2}px, ${cy - ls / 2}px, 0)`;
        }

        let ox = pw / 2 - cx * zl;
        let oy = ph / 2 - cy * zl;

        ox = Math.min(0, Math.max(ox, pw - zw));
        oy = Math.min(0, Math.max(oy, ph - zh));

        if (zoomImgRef.current) {
          zoomImgRef.current.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
        }
      });
    },
    [isCoarsePointer, width, height],
  );

  function closeModal() {
    setModalOpen(false);
    containerA11y.current?.focus();
  }

  return (
    <>
      <style>{`
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        @keyframes fadeOut {
          0%,70% { opacity: 1; }
          100%   { opacity: 0; }
        }
      `}</style>

      <div
        ref={containerA11y}
        tabIndex={-1}
        style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
        aria-label={`Product image. ${isCoarsePointer ? "Tap" : "Hover"} to zoom.`}
      >
        <div
          ref={containerRef}
          onPointerUp={handlePointerUp}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          style={{
            position: "relative",
            flexShrink: 0,
            cursor: isCoarsePointer ? "pointer" : "crosshair",
            touchAction: "manipulation",
            width,
            height,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ display: "block" }}
          />

          {isCoarsePointer && !reducedMotion && (
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.55)",
                color: "#E8E4DE",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "4px 10px",
                pointerEvents: "none",
                animation: "fadeOut 2.5s ease forwards",
                whiteSpace: "nowrap",
                zIndex: 3,
              }}
            >
              Tap to zoom
            </div>
          )}

          {active && !reducedMotion && (
            <div
              ref={lensRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: lensSize,
                height: lensSize,
                borderRadius: "50%",
                border: "2px solid rgba(212,168,83,0.9)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(1px)",
                pointerEvents: "none",
                willChange: "transform",
                transform: "translate3d(0,0,0)",
                boxSizing: "border-box",
                zIndex: 2,
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.2) inset, 0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
          )}
        </div>

        {!isCoarsePointer && (
          <div
            style={{
              width: zoomPanelWidth,
              height,
              overflow: "hidden",
              position: "relative",
              border: "1px solid #3A3830",
              background: "#1E1C18",
              opacity: active ? 1 : 0,
              transition: "opacity 0.15s ease",
              flexShrink: 0,
            }}
          >
            {zoomReady && (
              <img
                ref={zoomImgRef}
                src={zoomSrc}
                alt=""
                aria-hidden="true"
                role="presentation"
                loading="eager"
                draggable={false}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: width * zoomLevel,
                  height: height * zoomLevel,
                  pointerEvents: "none",
                  willChange: "transform",
                  transform: "translate3d(0,0,0)",
                  userSelect: "none",
                }}
              />
            )}
            {!zoomReady && active && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg,#2A2820 25%,#3A3830 50%,#2A2820 75%)",
                  backgroundSize: "200% 100%",
                  animation: reducedMotion ? "none" : "shimmer 1.4s infinite",
                }}
              />
            )}
          </div>
        )}
      </div>

      {modalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Zoomed product image"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              touchAction: "none",
            }}
            onPointerDown={closeModal}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                touchAction: "pinch-zoom",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {zoomReady && (
                <Image
                  src={zoomSrc}
                  alt={alt}
                  priority={true}
                  draggable={false}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "contain",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                  }}
                />
              )}
            </div>

            <button
              ref={closeBtnRef}
              aria-label="Close zoom view"
              onPointerUp={closeModal}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                touchAction: "manipulation",
              }}
            >
              ✕
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
