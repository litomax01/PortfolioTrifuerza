"use client";
import { Page, Item, ULink, NavLink } from "@/components/ui";
import { useApp } from "@/components/store";
import { profile, projects } from "@/lib/data";
import { about } from "@/lib/about";

// Hovering a name moves the 3D shapes (fullname / nickname states) and plays the wave
function Name({ id, text }) {
  const { setIntroName } = useApp();
  return (
    <span className="name" onMouseOver={() => setIntroName(id)} onMouseOut={() => setIntroName(null)}>
      {text}
      <span className="wave-wrapper"><span className="wave" /></span>
    </span>
  );
}

const L = {
  en: { cv: "Download CV", work: "See my projects", mail: "Email me", recent: "Recent work" },
  es: { cv: "Descargar CV", work: "Ver mis proyectos", mail: "Escríbeme", recent: "Trabajo reciente" },
};

export default function Home() {
  const { t, lang } = useApp();
  const l = L[lang];
  return (
    <div className="home">
      <div className="intro-wrapper">
        <Page className="intro-text">
          <Item as="p" className="intro-status">{about.open[lang]} · {about.location}</Item>
          <Item as="h1" className="intro-id">{t("introLine1")}<Name id="fullname" text={`${profile.firstName} ${profile.lastName}`} /></Item>
          <Item as="h2" className="intro-id">{t("introLine2")}<Name id="nickname" text={profile.nickname} /></Item>
          <div className="intro-roles">
            <Item as="p" className="intro-role intro-role-main">{about.role[lang]}</Item>
            <Item as="p" className="intro-role intro-pitch">{about.pitch[lang]}</Item>
          </div>
          <Item className="intro-cta">
            <a className="cta-btn primary" href={profile.resume[lang]} target="_blank" rel="noreferrer">↓ {l.cv}</a>
            <NavLink href="/work" className="cta-btn">{l.work}</NavLink>
            <NavLink href="/contact" className="cta-btn">{l.mail}</NavLink>
          </Item>
          <Item className="intro-recent">
            <span className="intro-recent-label">{l.recent}</span>
            <ul className="chips">
              {projects.slice(0, 4).map((p) => (
                <li key={p.slug}><NavLink href={`/work/${p.slug}`} className="chip chip-link">{p.title}</NavLink></li>
              ))}
            </ul>
          </Item>
          <div className="intro-links">
            <ul><Item as="li"><ULink type="internal" text={t("knowMore")} href="/about" /></Item></ul>
          </div>
        </Page>
      </div>
    </div>
  );
}
