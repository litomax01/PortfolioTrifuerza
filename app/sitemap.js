import { projects } from "@/lib/data";

const base = "https://leonardo-torres-portfolio.vercel.app";

export default function sitemap() {
  const pages = ["", "/work", "/about", "/contact"].map((p) => ({ url: base + p, changeFrequency: "monthly", priority: p === "" ? 1 : 0.8 }));
  const work = projects.map((p) => ({ url: `${base}/work/${p.slug}`, changeFrequency: "monthly", priority: 0.7 }));
  return [...pages, ...work];
}
