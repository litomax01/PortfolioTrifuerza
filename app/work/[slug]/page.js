"use client";
import Image from "next/image";
import { use } from "react";
import { notFound } from "next/navigation";
import { Page, Item, ULink, NavLink, Accordion, Letters, Footer } from "@/components/ui";
import { useApp } from "@/components/store";
import { projects } from "@/lib/data";

export default function Project({ params }) {
  const { slug } = use(params);
  const { t, lang, theme } = useApp();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return (
    <>
      <Page className="project">
        <Item className="project-pager">
          <NavLink href={`/work/${prev.slug}`} className="pager-btn">
            <span className="pager-dir">← {t("prev")}</span>
            <span className="pager-name">{prev.title}</span>
          </NavLink>
          <NavLink href={`/work/${next.slug}`} className="pager-btn pager-next">
            <span className="pager-dir">{t("next")} →</span>
            <span className="pager-name">{next.title}</span>
          </NavLink>
        </Item>
        <Item as="h1" className="project-title"><Letters text={p.title} /></Item>
        <Item className="project-intro">
          <div className="project-data">
            <table><tbody>
              <tr><td><h6>{t("work")}</h6></td><td><p>{p.category[lang]}</p></td></tr>
              <tr><td><h6>{t("year")}</h6></td><td><p>{p.year}</p></td></tr>
              <tr><td><h6>{t("stack")}</h6></td><td><p>{p.stack}</p></td></tr>
            </tbody></table>
          </div>
          <div className="project-description">
            <p>{p.description[lang]}</p>
            {p.live && <div className="project-website"><ULink type="external" text={t("visit")} href={p.live} /></div>}
            {p.repo && <div className="project-website"><ULink type="external" text={t("viewCode")} href={p.repo} /></div>}
          </div>
        </Item>
        <Item className="acc-group">
          <Accordion title={t("motive")} defaultOpen><p>{p.motive[lang]}</p></Accordion>
          <Accordion title={t("problem")}><p>{p.problem[lang]}</p></Accordion>
          <Accordion title={t("features")} meta={p.features[lang].length}><ul>{p.features[lang].map((f) => <li key={f}>{f}</li>)}</ul></Accordion>
          <Accordion title={t("howBuilt")} meta={p.howBuilt[lang].length}><ol>{p.howBuilt[lang].map((x) => <li key={x}>{x}</li>)}</ol></Accordion>
          <Accordion title={t("techWhy")} meta={p.tech.length}><ul>{p.tech.map((x) => <li key={x.name}><strong>{x.name}:</strong> {x.why[lang]}</li>)}</ul></Accordion>
          <Accordion title={t("shots")} meta={p.images.length} defaultOpen>
            <div className="shots-grid">{p.images.map((src) => <Image key={src} src={src} alt={p.title} width={0} height={0} sizes="(max-width: 1200px) 100vw, 1100px" style={{ width: "100%", height: "auto" }} />)}</div>
          </Accordion>
        </Item>
        <Item className="project-pager project-pager-bottom">
          <NavLink href={`/work/${prev.slug}`} className="pager-btn">
            <span className="pager-dir">← {t("prev")}</span>
            <span className="pager-name">{prev.title}</span>
          </NavLink>
          <NavLink href={`/work/${next.slug}`} className="pager-btn pager-next">
            <span className="pager-dir">{t("next")} →</span>
            <span className="pager-name">{next.title}</span>
          </NavLink>
        </Item>
      </Page>
      <NavLink href={`/work/${prev.slug}`} className="side-arrow side-arrow-left" aria-label={`${t("prev")}: ${prev.title}`} title={prev.title}>‹</NavLink>
      <NavLink href={`/work/${next.slug}`} className="side-arrow side-arrow-right" aria-label={`${t("next")}: ${next.title}`} title={next.title}>›</NavLink>
      <Footer />
    </>
  );
}
