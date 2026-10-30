"use client";
import { useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Page, Item, PageHead, NavLink, Footer, springBounce, itemVariants } from "@/components/ui";
import { useApp } from "@/components/store";
import { projects } from "@/lib/data";

function Row({ p, index, selected, setSelected }) {
  const { t, lang, theme, setAccent } = useApp();
  const on = selected === index;
  const shift = { unselected: { x: 0 }, selected: { x: 24 } };
  return (
    <m.li variants={itemVariants}
      onMouseEnter={() => setSelected(index)}
      onPointerDown={() => setSelected(index)}
      onClick={() => setAccent(theme === "light" ? p.colorDark : p.color)}>
      <NavLink href={`/work/${p.slug}`}>
        <div className="projects-row">
          <div className="projects-row-left">
            <div className="projects-selected-wrapper">
              <m.h4 className="projects-selected" initial="unselected" variants={{ unselected: { x: "-100%" }, selected: { x: 0 } }} animate={on ? "selected" : "unselected"}>→</m.h4>
            </div>
            <m.h4 className="projects-title" initial="unselected" variants={shift} animate={on ? "selected" : "unselected"}>{p.title}</m.h4>
          </div>
          <div className="projects-row-right">
            {p.images[0] && (
              <m.span className="projects-thumb" initial="unselected" variants={{ unselected: { opacity: 0, scale: 0.9 }, selected: { opacity: 1, scale: 1 } }} animate={on ? "selected" : "unselected"}>
                <Image src={p.images[0]} alt="" aria-hidden fill sizes="160px" quality={70} />
              </m.span>
            )}
                        <p className="projects-category">{p.category[lang]}</p>
          </div>
        </div>
      </NavLink>
    </m.li>
  );
}

export default function Work() {
  const { t } = useApp();
  const [selected, setSelected] = useState(null); // after the first hover, the last hovered project stays visible (and clickable)
  return (
    <>
      <Page className="projects">
        <div className="projects-left" />
        <div className="projects-right">
          <Item><PageHead title={t("work")} itemsNumber={projects.length} /></Item>
          <m.ul>
            {projects.map((p, i) => <Row key={p.slug} p={p} index={i} selected={selected} setSelected={setSelected} />)}
          </m.ul>
        </div>
      </Page>
      <Footer />
    </>
  );
}
