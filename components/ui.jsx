"use client";
import { useState, Children, cloneElement, isValidElement } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useApp } from "./store";
import { crest, allPolys, toPath } from "@/lib/shapes";

// ---- animation tokens copied from the reference ----
export const springBounce = { type: "spring", bounce: 0.1, duration: 0.8, restDelta: 1e-5 };
export const itemVariants = {
  visible: { opacity: 1, y: 0, transition: { type: "spring", mass: 0.1, restDelta: 1e-5 } },
  hidden: { opacity: 0, y: -96, transition: { type: "spring", mass: 0.1 }, transitionEnd: { y: -48 } },
};
export const listVariants = {
  visible: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: 1 } },
};

// Page container: stagger children in reverse on enter, forwards on exit
export function Page({ className, children }) {
  const { show } = useApp();
  return (
    <m.div className={className} initial="hidden" animate={show ? "visible" : "hidden"} variants={listVariants}>
      {children}
    </m.div>
  );
}

// Child that enters with the spring variants
export function Item({ as = "div", children, ...rest }) {
  const M = m[as];
  return <M variants={itemVariants} {...rest}>{children}</M>;
}

// Internal navigation with page exit transition
export function NavLink({ href, children, onClick, ...rest }) {
  const { go, setLinkHover } = useApp();
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); onClick?.(); go(href); }}
      onMouseOver={() => setLinkHover(true)}
      onMouseOut={() => setLinkHover(false)}
      {...rest}
    >
      {children}
    </a>
  );
}

// Link with underline that slides in (tween .1s) — type: internal | external | document
export function ULink({ text, href, type = "internal" }) {
  const { setLinkHover } = useApp();
  const mark = type === "internal" ? "→ " : type === "document" ? "↓ " : "↗ ";
  const hv = { onMouseOver: () => setLinkHover(true), onMouseOut: () => setLinkHover(false) };
  return (
    <div className="link-wrapper">
      <div className="link">
        {type === "internal" ? (
          <NavLink href={href}>{mark}{text}</NavLink>
        ) : (
          <a href={href} target="_blank" rel="noreferrer" {...hv}>{mark}{text}</a>
        )}
      </div>
      <div className="link-underline" />
    </div>
  );
}

export function PageHead({ title, itemsNumber }) {
  return (
    <>
      <div className="page-head">
        <h1 className="page-title">{title}</h1>
        {itemsNumber != null && <span className="elements-number mono">({itemsNumber})</span>}
      </div>
      <hr className="head-separator" />
    </>
  );
}

export function Footer() {
  const { t, show } = useApp();
  return (
    <m.footer initial="hidden" animate={show ? "visible" : "hidden"} variants={listVariants}>
      <Item as="hr" />
      <Item className="footer-wrapper">
        <p style={{ fontSize: "1rem" }}>{t("credit")} Leonardo © {new Date().getFullYear()}</p>
        <div className="footer-right"><ULink type="internal" text={t("home")} href="/" /></div>
      </Item>
    </m.footer>
  );
}

// 2D logo built from the same centerlines as the 3D scene (monoline)
const pathVariants = {
  initial: { y: 0, pathLength: 0, opacity: 0 },
  steps: { y: [0, -8, 0], opacity: [0, 1, 1], pathLength: [0, 1, 1], rotate: [0, -6, 0], transition: { duration: 2, y: { repeat: Infinity, duration: 2 }, rotate: { repeat: Infinity, duration: 2 } } },
  exit: { y: -96, pathLength: 1, opacity: 0, rotate: 0, transition: { duration: 0.5 } },
};
export function Logo({ size = 72, animate, onAnimationComplete, className = "icons" }) {
  return (
    <m.svg viewBox="-48 -76 96 82" width={size * 1.17} height={size} className={className} initial="initial" animate={animate}
      transition={{ staggerChildren: 0.05, staggerDirection: 1 }} onAnimationComplete={onAnimationComplete} aria-hidden style={{ strokeWidth: 3 }}>
      {allPolys.map((p, i) => <m.path key={i} d={toPath(p)} variants={pathVariants} />)}
    </m.svg>
  );
}

// Static triforce for the header
export function LogoStatic({ size = 48 }) {
  return (
    <svg viewBox="-48 -76 96 82" width={size * 1.17} height={size} className="icons" aria-hidden style={{ strokeWidth: 3 }}>
      {crest.tri.map((p, i) => <path key={i} d={toPath(p)} />)}
    </svg>
  );
}

// Collapsible section (accordion item). `defaultOpen` opens it on first render.
const easeOut = [0.65, 0, 0.35, 1]; // ease-in-out: visible start, smooth landing
export function Accordion({ title, meta, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const { setLinkHover } = useApp();
  return (
    <div className={`acc${open ? " open" : ""}`}>
      <button type="button" className="acc-head" aria-expanded={open} onClick={() => setOpen(!open)}
        onMouseEnter={() => setLinkHover(true)} onMouseLeave={() => setLinkHover(false)}>
        <span className="acc-title">{title}</span>
        {meta && <span className="acc-meta">{meta}</span>}
        <m.span className="acc-icon" aria-hidden animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.45, ease: easeOut }}>+</m.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div className="acc-body" key="b"
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}>
            <m.div className="acc-inner"
              initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}>
              {splitWords(children, { n: 0 })}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Letter-by-letter reveal for titles (each character rises and fades in).
export function Letters({ text, step = 28, delay = 0 }) {
  return (
    <span className="letters" aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span aria-hidden key={i} className="ch" style={{ animationDelay: `${delay + Math.min(i * step, 1200)}ms` }}>{c === " " ? " " : c}</span>
      ))}
    </span>
  );
}

// Word-by-word reveal for body text: walks the children and splits every string into animated words.
function splitWords(node, counter) {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((w, k) => (/^\s+$/.test(w) || w === "" ? w : (
      <span key={k} className="wd" style={{ animationDelay: `${Math.min(counter.n++ * 22, 1000) + 120}ms` }}>{w}</span>
    )));
  }
  if (Array.isArray(node)) return Children.map(node, (n) => splitWords(n, counter));
  if (isValidElement(node) && node.props.children != null && typeof node.type === "string" && node.type !== "img") {
    return cloneElement(node, undefined, splitWords(node.props.children, counter));
  }
  return node;
}
