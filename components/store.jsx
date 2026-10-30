"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dict } from "@/lib/i18n";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

// stage: loading -> loaded -> done -> afterDone  (same flow as the reference splash)
export function AppProvider({ children }) {
  const router = useRouter();
  const path = usePathname();
  const [stage, setStage] = useState("loading");
  const [menu, setMenu] = useState({ opened: false, visibility: false });
  const [theme, setThemeState] = useState("light");
  const [lang, setLangState] = useState("en");
  const [menuItem, setMenuItem] = useState(null);
  const [introName, setIntroName] = useState(null);
  const [accent, setAccent] = useState(null);
  const [linkHover, setLinkHover] = useState(false);
  const [crestHover, setCrestHover] = useState(false);
  const [crestPart, setCrestPart] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const timer = useRef(null);

  // always start on Home
  useEffect(() => { if (path !== "/") router.replace("/"); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = "dark"; // every visit opens in night mode; the visitor can switch to day mode from the header
    const l = localStorage.getItem("lang") || (navigator.language?.toLowerCase().startsWith("es") ? "es" : "en");
    setThemeState(t);
    setLangState(l);
    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setTheme = useCallback((t) => { setThemeState(t); localStorage.setItem("theme", t); }, []);
  const setLang = useCallback((l) => { setLangState(l); localStorage.setItem("lang", l); }, []);

  // route changed: close menu, show new page
  useEffect(() => {
    setLeaving(false);
    setMenu((m) => ({ ...m, opened: false }));
    setLinkHover(false);
    setIntroName(null);
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [path]);

  const go = useCallback((href) => {
    if (href === path) {
      setMenu((m) => ({ ...m, opened: false }));
      window.__lenis?.scrollTo(0);
      return;
    }
    setLeaving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => router.push(href), menu.opened ? 350 : 650);
  }, [path, router, menu.opened]);

  const toggleMenu = useCallback(() => {
    setMenu((m) => (m.opened ? { ...m, opened: false } : { opened: true, visibility: true }));
  }, []);

  const t = useCallback((k) => dict[lang][k] ?? k, [lang]);

  // the menu page (Inicio / Proyectos / Sobre mí / Contacto) is the first screen a visitor sees
  const openedFirst = useRef(false);
  useEffect(() => {
    if (stage === "afterDone" && !openedFirst.current) {
      openedFirst.current = true;
      setMenu({ opened: true, visibility: true });
    }
  }, [stage]);

  // content is shown only when the splash is done, the menu is closed and we are not leaving
  const show = stage === "afterDone" && !menu.visibility && !leaving;

  const value = useMemo(() => ({
    stage, setStage, menu, setMenu, toggleMenu, theme, setTheme, lang, setLang, t, path, go,
    crestHover, crestPart, setCrestHover: (p) => { setCrestHover(!!p); setCrestPart(p || null); }, menuItem, setMenuItem, introName, setIntroName, accent, setAccent, linkHover, setLinkHover, mouse, show, leaving,
  }), [crestHover, crestPart, stage, menu, theme, lang, t, path, go, menuItem, introName, accent, linkHover, show, leaving, setTheme, setLang, toggleMenu]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
