"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, LazyMotion, domAnimation, m, useAnimationControls, useSpring } from "framer-motion";
import Lenis from "lenis";
import { AppProvider, useApp } from "./store";
import { Logo, LogoStatic, NavLink, springBounce } from "./ui";
import { profile } from "@/lib/data";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const NAV = [["home", "/"], ["work", "/work"], ["about", "/about"], ["contact", "/contact"]];

/* ---------------- splash ---------------- */
const textVariants = {
  visible: (d) => ({ opacity: 1, y: 0, transition: { delay: d, type: "spring", mass: 0.1, restDelta: 1e-5 } }),
  hidden: (d) => ({ opacity: 0, y: -96, transition: { delay: d, duration: 0.5 } }),
};

function Splash() {
  const { stage, setStage, t } = useApp();
  const controls = useAnimationControls();
  const gone = stage === "afterDone";

  useEffect(() => {
    if (stage === "loading") controls.start("steps");
    if (stage === "loaded") {
      const id = setTimeout(() => {
        setStage("done");
        controls.start("exit").then(() => setStage("afterDone"));
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [stage, controls, setStage]);

  const hide = stage === "done" || stage === "afterDone";
  return (
    <m.div
      className="splashscreen"
      initial={{ opacity: 1 }}
      animate={stage === "done" || gone ? { opacity: [1, 1, 0], transitionEnd: { display: "none" } } : { opacity: 1 }}
    >
      <div><Logo size={72} animate={controls} /></div>
      <div className="loading-text-wrapper">
        <m.p className="loading-text" initial="hidden" animate={hide ? "hidden" : "visible"} custom={0} variants={textVariants}>
          {t("loading")}...
        </m.p>
      </div>
      <div className="credits">
        <m.p initial="hidden" animate={hide ? "hidden" : "visible"} custom={0.05} variants={textVariants}>
          {t("credit")} {profile.firstName} © {new Date().getFullYear()}
        </m.p>
      </div>
    </m.div>
  );
}

/* ---------------- header icons ---------------- */
const dots = [
  [12, 12, { hover: [0, 0, 1], close: [-24, -24, 0] }], [24, 12, { hover: [0, -24, 0], close: [0, -24, 0] }],
  [36, 12, { hover: [0, 0, 1], close: [24, -24, 0] }], [36, 24, { hover: [24, 0, 0], close: [24, 0, 0] }],
  [36, 36, { hover: [0, 0, 1], close: [24, 24, 0] }], [24, 36, { hover: [0, 24, 0], close: [0, 24, 0] }],
  [12, 36, { hover: [0, 0, 1], close: [-24, 24, 0] }], [12, 24, { hover: [-24, 0, 0], close: [-24, 0, 0] }],
];
const dv = (o) => ({ menu: { x: 0, y: 0, opacity: 1 }, hover: { x: o.hover[0], y: o.hover[1], opacity: o.hover[2] }, close: { x: o.close[0], y: o.close[1], opacity: o.close[2] } });

function Hamburger({ opened }) {
  const [hov, setHov] = useState(false);
  const s = opened ? "close" : hov ? "hover" : "menu";
  return (
    <m.div initial="menu" animate={s} variants={{ menu: { rotate: 0 }, hover: { rotate: 0 }, close: { rotate: 45 } }}>
      <m.svg viewBox="0 0 48 48" width="48" height="48" className="icons hamb" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => setHov(false)}>
        <title>Menu</title>
        {dots.map(([cx, cy, o]) => (
          <m.circle key={cx + "-" + cy} cx={cx} cy={cy} r="3" initial={s} animate={s} variants={dv(o)} />
        ))}
        <m.rect x="21" y="21" width="6" height="6" rx="3" ry="3" initial={s} animate={s}
          variants={{ menu: { x: 0, y: 0, width: 6, height: 6, opacity: 0.75 }, hover: { x: -12, y: 0, width: 30, height: 6, opacity: 1 }, close: { x: -16.97, y: 0, width: 39.94, height: 6, opacity: 1 } }} />
        <m.rect x="21" y="21" width="6" height="6" rx="3" ry="3" initial={s} animate={s}
          variants={{ menu: { x: 0, y: 0, width: 6, height: 6, opacity: 0.75 }, hover: { x: 0, y: -12, width: 6, height: 30, opacity: 1 }, close: { x: 0, y: -16.97, width: 6, height: 39.94, opacity: 1 } }} />
      </m.svg>
    </m.div>
  );
}

function ThemeIcon({ theme }) {
  return (
    <svg viewBox="0 0 17 17" width="17" height="17" className="icons mini-icons" style={{ overflow: "hidden" }}>
      <title>Theme</title>
      <m.path
        variants={{ dark: { y: -17, transitionEnd: { y: 17 } }, light: { y: 0 } }} initial={theme} animate={theme}
        d="M14.994,7.99a7,7,0,0,1-12.813,3.9,1,1,0,0,1,1.063-1.532,6.139,6.139,0,0,0,1.961.089,6.012,6.012,0,0,0,5.212-4.985,6.067,6.067,0,0,0-.065-2.274A1,1,0,0,1,11.9,2.182,6.985,6.985,0,0,1,14.994,7.99Z" />
      <m.g variants={{ dark: { y: 0 }, light: { y: -17, transitionEnd: { y: 17 } } }} initial={theme} animate={theme}>
        <circle cx="8.5" cy="8.5" r="3" />
        {[[8.5, 1, 8.5, 2], [13.803, 3.197, 13.096, 3.904], [16, 8.5, 15, 8.5], [13.803, 13.803, 13.096, 13.096], [8.5, 16, 8.5, 15], [3.197, 13.803, 3.904, 13.096], [1, 8.5, 2, 8.5], [3.197, 3.197, 3.904, 3.904]].map((l, i) => (
          <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
        ))}
      </m.g>
    </svg>
  );
}

/* ---------------- header ---------------- */
const partV = {
  menuOpen: { display: "flex", y: 0, transition: springBounce },
  menuClosed: { y: -100, transitionEnd: { display: "none" } },
};
const liV = {
  menuOpen: (i) => ({ display: "block", y: 0, transition: { delay: 0.5 + 0.05 * i, ...springBounce } }),
  menuClosed: (i) => ({ y: -100, transition: { delay: 0.05 * i, ...springBounce }, transitionEnd: { display: "none" } }),
};

function Header() {
  const { stage, menu, toggleMenu, theme, setTheme, lang, setLang, t, path } = useApp();
  const started = stage === "done" || stage === "afterDone";
  const showExtras = started; // language and theme switches stay available on every page
  return (
    <header>
      <m.div className="header-content" initial="menuClosed" animate={started ? "menuOpen" : "menuClosed"} transition={{ delayChildren: 0.25, staggerChildren: 0.1, staggerDirection: 1 }}>
        <m.div className="left-part" variants={partV}>
          <div className="logo">
            <NavLink href="/" className="logo-link"><LogoStatic size={56} /><span className="logo-text">{t("home")}</span></NavLink>
          </div>
          <m.h5 className="full-identity" initial="menuClosed" animate={menu.opened ? "menuOpen" : "menuClosed"} variants={liV} custom={0}>
            <span className="nickname">{profile.firstName} {profile.lastName.split(" ")[0]}</span> · <span className="fullname">{t("identityRole")}</span>
          </m.h5>
        </m.div>
        <m.div className="right-part" variants={partV}>
          <ul>
            <m.li className="language-switch" initial="menuClosed" animate={showExtras ? "menuOpen" : "menuClosed"} variants={liV} custom={1}>
              <a href="#" onClick={(e) => { e.preventDefault(); setLang(lang === "en" ? "es" : "en"); }}>{lang === "en" ? "ES" : "EN"}</a>
            </m.li>
            <m.li className="theme-switch" initial="menuClosed" animate={showExtras ? "menuOpen" : "menuClosed"} variants={liV} custom={2}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <ThemeIcon theme={theme} />
            </m.li>
            <li>
              <button className="hamburger-btn" aria-label={t(menu.opened ? "closeMenu" : "openMenu")} onClick={toggleMenu}><Hamburger opened={menu.opened} /></button>
            </li>
          </ul>
        </m.div>
      </m.div>
    </header>
  );
}

/* ---------------- menu ---------------- */
const menuV = {
  open: { display: "block", opacity: 1 },
  close: { opacity: 0.5, transition: { duration: 0.5, ...springBounce }, transitionEnd: { display: "none" } },
};
const menuItemV = {
  open: (i) => ({ y: 0, transition: { delay: 0.5 + 0.05 * i, ...springBounce } }),
  close: (i) => ({ y: -100, transition: { delay: 0.05 * i, ...springBounce } }),
};

function MenuInfo() {
  const { menu, menuItem, t } = useApp();
  return (
    <div className="menu-info">
      <AnimatePresence mode="wait">
        {menu.opened && menuItem && (
          <m.div key={menuItem} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { type: "spring", mass: 0.1, restDelta: 1e-5 } }} exit={{ opacity: 0, y: -40, transition: { duration: 0.15 } }}>
            <h6>{t("info_" + menuItem + "_t")}</h6>
            <p>{t("info_" + menuItem)}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Menu() {
  const { menu, setMenu, setMenuItem, t } = useApp();
  const st = menu.opened ? "open" : "close";
  const rows = [];
  for (let i = 0; i < profile.socials.length; i += 2) rows.push(profile.socials.slice(i, i + 2));
  return (
    <m.div className="menu" initial="close" animate={st} transition={{ duration: 0.5 }} variants={menuV}
      onAnimationComplete={(d) => { if (d === "close") setMenu((m) => ({ ...m, visibility: false })); }}>
      <MenuInfo />
      <div className="menu-content">
        <div className="menu-items">
          <nav>
            <ol>
              {NAV.map(([k, href], i) => (
                <m.li key={k} initial="close" animate={st} custom={i} variants={menuItemV}>
                  <div className="item-inner"
                    onMouseOver={() => setMenuItem(k)} onMouseOut={() => setMenuItem(null)}
                    onPointerDown={() => setMenuItem(k)} onPointerUp={() => setMenuItem(null)}>
                    <NavLink href={href}><h1>{t(k)}</h1></NavLink>
                  </div>
                </m.li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="menu-socials">
          <ul>
            {rows.map((row, r) => (
              <div key={r}>
                {row.map((s, i) => (
                  <m.li key={s.name} initial="close" animate={st} custom={i} variants={menuItemV}>
                    <div className="item-inner">
                      <div className="link-wrapper">
                        <div className="link"><a href={s.url} target="_blank" rel="noreferrer">↗ {s.name}</a></div>
                        <div className="link-underline" />
                      </div>
                    </div>
                  </m.li>
                ))}
                <br />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </m.div>
  );
}

/* ---------------- destination label next to the pointer while hovering a triforce part ---------------- */
const CREST_ROUTE = { hearts: ["/", "home"], top: ["/work", "work"], left: ["/about", "about"], right: ["/contact", "contact"] };
function CrestTip() {
  const { crestPart, path, t } = useApp();
  const ref = useRef(null);
  useEffect(() => {
    const mv = (e) => { if (ref.current) ref.current.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 20}px)`; };
    addEventListener("mousemove", mv);
    return () => removeEventListener("mousemove", mv);
  }, []);
  const dest = crestPart && CREST_ROUTE[crestPart];
  return (
    <div ref={ref} className={`crest-tip${dest ? " on" : ""}`} aria-hidden>
      {dest && (dest[0] === path ? t("here") : `${t("goTo")} ${t(dest[1])} →`)}
    </div>
  );
}

/* ---------------- cursor ---------------- */
function Cursor() {
  const { stage, theme, crestHover } = useApp();
  const [inside, setInside] = useState(false);
  const [sel, setSel] = useState(false);
  const [down, setDown] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const x1 = useSpring(-100, { stiffness: 200, damping: 10, mass: 0.25 });
  const y1 = useSpring(-100, { stiffness: 200, damping: 10, mass: 0.25 });
  const x2 = useSpring(-100, { stiffness: 200, damping: 10, mass: 0.15 });
  const y2 = useSpring(-100, { stiffness: 200, damping: 10, mass: 0.15 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(matchMedia("(pointer:fine)").matches);
    setNarrow(innerWidth < 992);
    const mv = (e) => { x1.set(e.clientX); y1.set(e.clientY); x2.set(e.clientX); y2.set(e.clientY); };
    const over = (e) => { setInside(true); setSel(!!e.target.closest?.("a, button, .theme-switch, .mini-icons")); };
    const out = (e) => { if (!e.relatedTarget) setInside(false); };
    const dn = () => setDown(true), up = () => setDown(false);
    addEventListener("mousemove", mv); document.addEventListener("mouseover", over); document.addEventListener("mouseout", out);
    addEventListener("pointerdown", dn); addEventListener("pointerup", up);
    return () => { removeEventListener("mousemove", mv); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); removeEventListener("pointerdown", dn); removeEventListener("pointerup", up); };
  }, [x1, y1, x2, y2]);

  if (!fine) return null;
  const light = theme === "light";
  const fill = light ? "#606887" : "#f3f2f9";
  const bw = narrow ? 1.5 : 2;
  const ring = {
    selected: { backgroundColor: fill, borderStyle: "none", borderWidth: 0, scale: 2, opacity: light ? 0.5 : 1 },
    visible: { backgroundColor: "rgba(0,0,0,0)", borderStyle: "solid", borderWidth: bw, scale: 1, opacity: 1 },
    invisible: { backgroundColor: "rgba(0,0,0,0)", borderStyle: "solid", borderWidth: 0, scale: 1, opacity: 0 },
    clickSelected: { backgroundColor: fill, borderStyle: "none", borderWidth: 0, scale: 4, opacity: light ? 0.5 : 1 },
    click: { backgroundColor: fill + "00", borderStyle: "solid", borderWidth: narrow ? 1 : 1.5, scale: 2, opacity: 1 },
  };
  const dot = { visible: { opacity: 1 }, invisible: { opacity: 0 }, selected: { opacity: 0 }, click: { opacity: 1 }, clickSelected: { opacity: 0 } };
  const on = inside && stage === "afterDone";
  const isSel = sel || crestHover;
  const s = !on ? "invisible" : down ? (isSel ? "clickSelected" : "click") : isSel ? "selected" : "visible";
  return (
    <>
      <m.div className="cursor-dot" style={{ left: x2, top: y2, x: "-50%", y: "-50%" }} variants={dot} initial="invisible" animate={s} transition={{ type: "spring", stiffness: 200, mass: 0.15 }} />
      <m.div className="cursor" style={{ left: x1, top: y1, x: "-50%", y: "-50%" }} variants={ring} initial="invisible" animate={s} transition={{ type: "spring", stiffness: 200, mass: 0.25 }} />
    </>
  );
}

/* ---------------- misc ---------------- */
function Noise() {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 200;
    const x = c.getContext("2d");
    const d = x.createImageData(200, 200);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 40; }
    x.putImageData(d, 0, 0);
    setSrc(c.toDataURL());
  }, []);
  return <div className="noise" style={{ backgroundImage: src ? `url(${src})` : "none" }} />;
}

function RouteBar() {
  const { leaving } = useApp();
  return (
    <m.div id="nprogress-bar" className="route-bar" initial={{ scaleX: 0, opacity: 0 }}
      animate={leaving ? { scaleX: 0.8, opacity: 1, transition: { duration: 0.6 } } : { scaleX: 1, opacity: 0, transition: { opacity: { delay: 0.2, duration: 0.3 } } }}
      onAnimationComplete={() => {}} />
  );
}

function Frame({ children }) {
  const { stage, menu, path, show } = useApp();
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);
  useEffect(() => {
    const lock = stage !== "afterDone" || menu.opened;
    lock ? window.__lenis?.stop() : window.__lenis?.start();
    document.body.style.overflowY = lock ? "hidden" : "";
  }, [stage, menu.opened]);

  const sharp = true;
  return (
    <>
      <m.div className="canvas" initial="sharp" animate={sharp ? "sharp" : "blurred"}
        variants={{ blurred: { filter: "blur(50px)" }, sharp: { filter: "blur(0px)" } }} transition={{ type: "tween", duration: 0.5 }}>
        <Scene />
      </m.div>
      <main className="container">
        <m.div className="page-content" initial="hidden" animate={show ? "visible" : "hidden"}
          variants={{ hidden: { opacity: 0, y: -96, transition: springBounce }, visible: { opacity: 1, y: 0, transition: springBounce } }}>
          {children}
        </m.div>
      </main>
    </>
  );
}

export default function Shell({ children }) {
  return (
    <LazyMotion features={domAnimation}>
    <AppProvider>
      <Splash />
      <Header />
      <Menu />
      <RouteBar />
      <Frame>{children}</Frame>
      <Noise />
      <Cursor />
      <CrestTip />
    </AppProvider>
    </LazyMotion>
  );
}
