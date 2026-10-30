"use client";
import Image from "next/image";
import { Page, Item, PageHead, ULink, NavLink, Accordion, Letters, Footer } from "@/components/ui";
import { useApp } from "@/components/store";
import { profile } from "@/lib/data";
import { about } from "@/lib/about";

const L = {
  en: { skills: "Skills", exp: "Experience", edu: "Education", more: "Languages and certification", cv: "Download CV", mail: "Email me", work: "See my projects", lang: "Languages", cert: "Certification" },
  es: { skills: "Habilidades", exp: "Experiencia", edu: "Educación", more: "Idiomas y certificación", cv: "Descargar CV", mail: "Escríbeme", work: "Ver mis proyectos", lang: "Idiomas", cert: "Certificación" },
};

export default function About() {
  const { t, lang } = useApp();
  const l = L[lang];
  const txt = (v) => (typeof v === "string" ? v : v[lang]);
  return (
    <>
      <Page className="about">
        <div className="about-right">
          <Item className="profile-pic-wrapper">
            <Image className="profile-pic" src={profile.photo} alt={`${t("profilePic")} ${profile.firstName}`} fill priority sizes="(max-width: 768px) 100vw, 25vw" />
          </Item>
        </div>
        <div className="about-left">
          <Item><PageHead title={t("about")} /></Item>

          <Item className="about-hero">
            <span className="about-pill">{about.open[lang]} · {about.location}</span>
            <h2 className="about-headline"><Letters text={about.headline[lang]} step={18} /></h2>
            <p className="about-role">{profile.firstName} {profile.lastName} — {about.role[lang]}</p>
            <p className="presentation-text">{about.summary[lang]}</p>
          </Item>

          <Item className="about-stats">
            {about.stats.map((s) => (
              <div className="about-stat" key={s.value}><b>{s.value}</b><span>{s.label[lang]}</span></div>
            ))}
          </Item>

          <Item className="about-cta">
            <a className="cta-btn primary" href={profile.resume[lang]} target="_blank" rel="noreferrer">↓ {l.cv}</a>
            <NavLink href="/contact" className="cta-btn">✉ {l.mail}</NavLink>
            <a className="cta-btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="cta-btn" href={profile.socials[1].url} target="_blank" rel="noreferrer">GitHub ↗</a>
            <NavLink href="/work" className="cta-btn">{l.work} →</NavLink>
          </Item>

          <Item className="about-section">
            <Accordion title={about.offerTitle[lang]} defaultOpen>
              <ul>{about.offer[lang].map((o) => <li key={o}>{o}</li>)}</ul>
            </Accordion>
            <Accordion title={l.skills} meta={about.skills.length}>
              {about.skills.map((g) => (
                <div className="skill-block" key={g.name.en}>
                  <h6>{g.name[lang]}</h6>
                  <div className="chips">{g.items.map((i) => <span className="chip" key={txt(i)}>{txt(i)}</span>)}</div>
                </div>
              ))}
            </Accordion>
            <Accordion title={l.exp} meta={about.experience.length}>
              {about.experience.map((e) => (
                <Accordion key={e.role.en} title={txt(e.role)} meta={`${txt(e.place)} · ${txt(e.period)}`}>
                  {e.tags.length > 0 && <div className="exp-tags chips">{e.tags.map((g) => <span className="chip" key={g}>{g}</span>)}</div>}
                  <ul>{e.bullets[lang].map((b) => <li key={b}>{b}</li>)}</ul>
                </Accordion>
              ))}
            </Accordion>
            <Accordion title={l.edu}>
              <p><strong>{about.education.title[lang]}</strong></p>
              <p>{about.education.school} · {about.education.period[lang]}</p>
            </Accordion>
            <Accordion title={l.more}>
              <p><strong>{l.lang}:</strong> {about.languages[lang]}</p>
              <p><strong>{l.cert}:</strong> {about.certification[lang]}</p>
            </Accordion>
            <Accordion title={about.beyondTitle[lang]}>
              <p>{about.beyondIntro[lang]}</p>
              <div className="beyond-grid">
                {about.beyond.map((b) => (
                  <div className="beyond-card" key={b.title.en}><span aria-hidden>{b.icon}</span><h6>{b.title[lang]}</h6><p>{b.text[lang]}</p></div>
                ))}
              </div>
            </Accordion>
          </Item>
        </div>
      </Page>
      <Footer />
    </>
  );
}
