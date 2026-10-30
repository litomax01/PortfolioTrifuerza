"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useApp } from "./store";
import { crest, TOP, MID, BOT } from "@/lib/shapes";

const PI = Math.PI;
const ZOOM = 5;
const CS = 0.03; // crest units -> world units
const CY = (TOP + BOT) / 2; // vertical centre of the triforce
const GROUPS = ["top", "left", "right", "hearts"];
const ITEM = { hearts: "home", top: "work", left: "about", right: "contact" };
const ROUTE = { hearts: "/", top: "/work", left: "/about", right: "/contact" };
const PIVOT = { top: [0, (TOP + MID) / 2], left: [-20, (MID + BOT) / 2], right: [20, (MID + BOT) / 2], hearts: [0, -24] };
const W = ([x, y]) => [x * CS, -(y - CY) * CS];

/* ---------- deterministic pseudo-random so the sketch lines are stable ---------- */
const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* ---------- watercolor shader (yellow/orange/red washes + paper grain) ---------- */
const NOISE = `
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.;a*=.5;}return v;}`;

function washMaterial(a, b, c, seed, vertical = 1) {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: true, depthTest: true, side: THREE.DoubleSide,
    uniforms: { cA: { value: new THREE.Color(a) }, cB: { value: new THREE.Color(b) }, cC: { value: new THREE.Color(c) }, seed: { value: seed }, vert: { value: vertical }, opacity: { value: 0 } },
    vertexShader: `varying vec3 vO; varying vec3 vP;
      void main(){ vO = normal; vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 cA; uniform vec3 cB; uniform vec3 cC; uniform float seed; uniform float vert; uniform float opacity;
      varying vec3 vO; varying vec3 vP;
      ${NOISE}
      void main(){
        vec2 p = vP.xy*2.6 + seed;
        float t = fbm(p);
        float g = clamp(vP.y*0.45*vert + 0.5 + (t-0.5)*0.9, 0.0, 1.0);
        vec3 col = mix(cB, cA, g);
        col = mix(col, cC, smoothstep(0.58, 0.78, fbm(p*1.6 + 7.0))*0.85);
        col = mix(col, cA, smoothstep(0.66, 0.8, fbm(p*2.3 - 3.0))*0.6);
        col *= 0.94 + 0.1*h(gl_FragCoord.xy);
        float front = step(0.85, abs(vO.z));
        col = mix(col*0.55, col, front);
        gl_FragColor = vec4(col, opacity); }`,
  });
}
const flatMaterial = (color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, side: THREE.DoubleSide });

/* ---------- geometry builders ---------- */
function extrudePoly(poly, depth) {
  const shape = new THREE.Shape(poly.map((p) => new THREE.Vector2(...W(p))));
  const geo = new THREE.ExtrudeGeometry(shape, { depth: depth * CS, bevelEnabled: false, curveSegments: 1 });
  geo.translate(0, 0, (-depth / 2) * CS);
  return geo;
}

// sketchy ink line: slightly overshoots the corners and wobbles, like a hand drawn stroke
function sketchLine(p0, p1, seed, w = 0.65) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l, nx = -uy, ny = ux;
  const e0 = 1.5 + rnd(seed) * 5, e1 = 1.5 + rnd(seed + 1) * 5, j0 = (rnd(seed + 2) - 0.5) * 1.6, j1 = (rnd(seed + 3) - 0.5) * 1.6;
  const a = [p0[0] - ux * e0 + nx * j0, p0[1] - uy * e0 + ny * j0];
  const b = [p1[0] + ux * e1 + nx * j1, p1[1] + uy * e1 + ny * j1];
  const poly = [[a[0] + nx * w, a[1] + ny * w], [b[0] + nx * w * 0.7, b[1] + ny * w * 0.7], [b[0] - nx * w * 0.7, b[1] - ny * w * 0.7], [a[0] - nx * w, a[1] - ny * w]];
  return new THREE.ShapeGeometry(new THREE.Shape(poly.map((p) => new THREE.Vector2(...W(p)))));
}

function outlineGeo(poly, seed) {
  const gs = [];
  for (let i = 0; i < 3; i++) {
    gs.push(sketchLine(poly[i], poly[(i + 1) % 3], seed + i * 10));
    if (rnd(seed + i) > 0.35) gs.push(sketchLine(poly[i], poly[(i + 1) % 3], seed + i * 10 + 5, 0.35)); // second, thinner pass
  }
  return mergeGeometries(gs.map((g) => g.toNonIndexed()));
}

// irregular watercolor blob
function blobGeo(cx, cy, rx, ry, seed, n = 48) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * PI * 2;
    const k = 1 + 0.22 * Math.sin(a * 3 + seed) + 0.14 * Math.sin(a * 5 + seed * 2.1) + 0.08 * Math.sin(a * 9 + seed * 3.3);
    pts.push(new THREE.Vector2(cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k));
  }
  return new THREE.ShapeGeometry(new THREE.Shape(pts));
}

// pixel-art heart: 3D voxels with a black outline and a highlight
const HEART = ["..rrr..rrr..", ".rrrrrrrrrr.", ".rrrrrrrrrr.", ".rrrrrrrrrr.", "..rrrrrrrr..", "...rrrrrr...", "....rrrr....", ".....rr....."].map((r) => r.padEnd(12, "."));
function heartGeo() {
  const rows = HEART.length, cols = 12, cell = 1.45, depth = 3;
  const isFill = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols && HEART[r][c] === "r";
  const cells = [];
  for (let r = -1; r <= rows; r++) for (let c = -1; c <= cols; c++) {
    if (isFill(r, c)) cells.push([r, c, (r === 1 && (c === 2 || c === 3)) || (r === 2 && c === 2) ? "#f7b0a8" : "#c9231f"]);
    else if (isFill(r - 1, c) || isFill(r + 1, c) || isFill(r, c - 1) || isFill(r, c + 1)) cells.push([r, c, "#1a0c0c"]);
  }
  const geos = cells.map(([r, c, col]) => {
    const g = new THREE.BoxGeometry(cell * CS, cell * CS, depth * CS).toNonIndexed();
    g.translate((c - (cols - 1) / 2) * cell * CS, -(r - (rows - 1) / 2) * cell * CS, 0);
    const color = new THREE.Color(col), arr = [], nrm = g.attributes.normal;
    for (let i = 0; i < nrm.count; i++) {
      const k = Math.abs(nrm.getZ(i)) > 0.5 ? 1 : 0.6;
      arr.push(color.r * k, color.g * k, color.b * k);
    }
    g.setAttribute("color", new THREE.Float32BufferAttribute(arr, 3));
    return g;
  });
  return mergeGeometries(geos);
}

/* ---------- spring (stiffness 30, damping 3, mass .15 — same feel as the reference) ---------- */
class Spring {
  constructor(v, m = 0.15, k = 30, c = 3) { this.v = v; this.t = v; this.vel = 0; this.m = m; this.k = k; this.c = c; }
  step(dt) {
    const n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
    for (let i = 0; i < n; i++) {
      const a = (-this.k * (this.v - this.t) - this.c * this.vel) / this.m;
      this.vel += a * h; this.v += this.vel * h;
    }
  }
}

/* ---------- states ---------- */
// which part comes out for each section: hearts = Home, top = Work (power), left = About (wisdom), right = Contact (courage)
const ACTIVE = { home: "hearts", work: "top", about: "left", contact: "right" };
const POP = { hearts: [0, 0, 1.4], top: [0, 0.5, 1], left: [-0.6, -0.2, 1], right: [0.6, -0.2, 1] };
const SCATTER = {
  top: { x: 0, y: 2.6, z: -1, rx: 1.2, ry: 0.6, rz: 0.5, s: 1 },
  left: { x: -3.4, y: -1.2, z: -1, rx: 0.6, ry: -0.8, rz: 0.9, s: 1 },
  right: { x: 3.4, y: -1.2, z: -1, rx: 0.6, ry: 0.8, rz: -0.9, s: 1 },
  hearts: { x: 0, y: -2.4, z: 2, rx: -1, ry: 0.5, rz: 0.3, s: 0.2 },
};
const REST = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: 1 };

function groupState(g, st) {
  const op = (o) => ({ ...REST, o });
  const popped = (k, mult = 1) => {
    const [x, y, z] = POP[k];
    return { x: x * mult, y: y * mult, z: z * mult, rx: 0, ry: k === "left" ? -0.12 : k === "right" ? 0.12 : 0, rz: 0, s: k === "hearts" ? 1.25 : 1.08 };
  };
  const section = ["home", "work", "about", "contact"].find((k) => st.startsWith(k));
  if (st === "initial") return { ...SCATTER[g], o: 0 };
  if (st === "else") return op(0);
  if (st === "error") return { ...SCATTER[g], x: SCATTER[g].x * 0.3, y: SCATTER[g].y * 0.3, z: -0.3, o: 0.6 };
  if (st === "home" || st === "menu") return op(1);
  if (st === "fullName") return g === "hearts" ? { ...popped("hearts"), o: 1 } : op(1);
  if (st === "nickname") return g === "top" ? { ...popped("top"), o: 1 } : op(1);
  if (st.endsWith("Selected")) {
    const k = ACTIVE[section];
    return g === k ? { ...popped(k), o: 1 } : op(0.7);
  }
  if (st === "project") return g === "hearts" ? { ...popped("hearts", 1.2), o: 0.55 } : op(0.3);
  // work / about / contact pages: the matching part detaches, the rest becomes a faint ghost
  const k = ACTIVE[st];
  return g === k ? { ...popped(k, 0.9), o: 0.7 } : op(0.3);
}

function outerState(st, v) {
  const wide = v.W >= 992, m = v.W < 768;
  const base = m ? 0.45 : 0.72;
  const menu = { x: wide ? v.vw / 4 / ZOOM : 0, y: wide ? 0 : -0.1, s: wide ? 0.5 : 0.38 };
  if (st === "menu" || st.endsWith("Selected")) return menu;
  // desktop: text on the left, crest on the right
  const hx = wide ? v.vw / 4.6 / ZOOM : 0, hs = wide ? 0.6 : base;
  if (st === "home") return { x: hx, y: 0, s: hs };
  if (st === "fullName" || st === "nickname") return { x: hx, y: 0, s: hs * 1.04 };
  if (st === "project") return { x: 0, y: 0, s: 0.65 };
  if (st === "error") return { x: 0, y: 0, s: 0.4 };
  if (st === "else") return { x: 0, y: 0, s: 1 };
  if (m) return { x: 0, y: 0, s: 0.4 };
  // keep the crest in the free area of each page
  if (st === "work") return { x: wide ? -v.vw / 4 / ZOOM : 0, y: 0, s: 0.62 };
  if (st === "about") return { x: wide ? v.vw / 6 / ZOOM : 0, y: -0.05, s: 0.5 };
  return { x: 0, y: -0.2, s: 0.5 }; // contact
}

export function stateName({ menu, menuItem, introName, path }) {
  if (menu.opened) {
    if (["home", "work", "about", "contact"].includes(menuItem)) return menuItem + "Selected";
    return "menu";
  }
  if (introName === "fullname") return "fullName";
  if (introName === "nickname") return "nickname";
  if (path === "/") return "home";
  if (path === "/work") return "work";
  if (path.startsWith("/work/")) return "project";
  if (path === "/about") return "about";
  if (path === "/contact") return "contact";
  return "error";
}

// links/buttons keep working; text and empty areas let the crest react
const INTERACTIVE = "a,button,input,.menu-info,.profile-pic-wrapper,.projects-left-inside";
const setOpacity = (m, o) => { if (m.uniforms) m.uniforms.opacity.value = o; else m.opacity = o; };

export default function Scene() {
  const app = useApp();
  const ref = useRef(null);
  const live = useRef(app);
  live.current = app;

  useEffect(() => {
    const cv = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); // sharp enough, ~45% fewer pixels than 2x
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.5, 50);
    camera.position.set(0, 0, 10);
    camera.zoom = ZOOM;
    const outer = new THREE.Group();
    scene.add(outer);

    const disposables = [];
    const parts = GROUPS.map((name) => {
      const sub = new THREE.Group();
      const pv = W(PIVOT[name]);
      const mats = [];
      const add = (geo, mat, x = 0, y = 0, z = 0) => {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x - pv[0], y - pv[1], z);
        sub.add(mesh);
        disposables.push(geo);
        if (!mats.includes(mat)) { mats.push(mat); disposables.push(mat); }
      };

      if (name === "hearts") {
        const hm = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0 });
        [-19.5, 0, 19.5].forEach((x) => add(heartGeo(), hm, ...W([x, -24]), 3.4 * CS));
      } else {
        const idx = { top: 0, left: 1, right: 2 }[name];
        const poly = crest.tri[idx];
        const wash = washMaterial("#f8cf2e", "#e8841a", "#c4331c", idx * 4.3 + 1.0, 1);
        add(extrudePoly(poly, 4), wash);
        add(outlineGeo(poly, 20 + idx * 31), flatMaterial("#14110f"), 0, 0, 2.2 * CS);
      }
      outer.add(sub);
      const i = groupState(name, "initial");
      return { name, sub, pv, mats, sp: { x: new Spring(i.x), y: new Spring(i.y), z: new Spring(i.z), rx: new Spring(i.rx), ry: new Spring(i.ry), rz: new Spring(i.rz), s: new Spring(i.s), o: new Spring(0) } };
    });
    const osp = { x: new Spring(0, 0.1), y: new Spring(0, 0.1), s: new Spring(0.5, 0.1), rx: new Spring(0, 0.1), ry: new Spring(0, 0.1) };

    const ray = new THREE.Raycaster();
    const pickables = parts.flatMap((p) => p.sub.children.map((m) => ({ m, p })));
    let hover = null, fromCrest = false;
    let w = 1, h = 1, raf, last = performance.now(), prev = null;
    const resize = () => {
      w = cv.clientWidth; h = cv.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    addEventListener("resize", resize);
    const click = (e) => {
      if (!hover || e.target.closest?.(INTERACTIVE)) return;
      live.current.go(ROUTE[hover]);
    };
    addEventListener("click", click);
    requestAnimationFrame(() => live.current.setStage((s) => (s === "loading" ? "loaded" : s)));

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      const a = live.current;
      const ready = a.stage === "afterDone";
      const vh = 2 * Math.tan((60 * PI) / 360) * 10, vw = vh * (w / h);
      const v = { W: w, vw, vh };
      const st = ready ? stateName(a) : "initial";
      // which crest part is under the mouse (the canvas sits under the page, so we raycast manually)
      let hp = null;
      // the crest reacts and is clickable everywhere except inside Projects (/work and each project), so a visitor reading a project cannot leave it by accident
      if (ready && (a.menu.opened || !a.path.startsWith("/work")) && matchMedia("(pointer:fine)").matches) {
        const ndc = new THREE.Vector2(a.mouse.current.x / innerWidth * 2 - 1, -(a.mouse.current.y / innerHeight) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(pickables.map((x) => x.m), false)[0];
        const owner = hit && pickables.find((x) => x.m === hit.object).p;
        const free = !document.elementFromPoint(a.mouse.current.x, a.mouse.current.y)?.closest?.(INTERACTIVE);
        if (owner && owner.sp.o.v > 0.08 && free) hp = owner.name;
      }
      hover = hp;
      // inside the menu, pointing at a part selects it exactly like pointing at its word (pop-out + info panel)
      if (a.menu.opened) {
        if (hp) { fromCrest = true; if (a.menuItem !== ITEM[hp]) a.setMenuItem(ITEM[hp]); }
        else if (fromCrest) { fromCrest = false; a.setMenuItem(null); }
      } else fromCrest = false;
      if (a.setCrestHover) a.setCrestHover(hp);
      const key = st + "|" + w + "|" + hp;

      if (key !== prev) {
        prev = key;
        for (const p of parts) {
          const t = groupState(p.name, st);
          if (p.name === hp && !a.menu.opened) { t.z += 0.9; t.s *= 1.22; t.rz += p.name === "left" ? 0.08 : p.name === "right" ? -0.08 : 0; t.y += 0.08; t.o = 1; }
          for (const k of ["x", "y", "z", "rx", "ry", "rz", "s"]) p.sp[k].t = t[k];
          p.sp.o.t = t.o;
        }
        const o = outerState(st === "initial" ? "home" : st, v);
        osp.x.t = o.x; osp.y.t = o.y; osp.s.t = st === "initial" ? 0.5 : o.s;
      }

      const mx = a.mouse.current.x / innerWidth * 2 - 1, my = a.mouse.current.y / innerHeight * 2 - 1;
      osp.rx.t = my * 0.12; osp.ry.t = mx * 0.18;
      for (const k in osp) osp[k].step(dt);
      outer.position.set(osp.x.v, osp.y.v, 0);
      outer.scale.setScalar(Math.max(0.01, osp.s.v));
      outer.rotation.set(osp.rx.v, osp.ry.v, 0);

      for (const p of parts) {
        for (const k in p.sp) p.sp[k].step(dt);
        const s = p.sp;
        p.sub.position.set(p.pv[0] + s.x.v, p.pv[1] + s.y.v, s.z.v);
        p.sub.rotation.set(s.rx.v, s.ry.v, s.rz.v);
        p.sub.scale.setScalar(Math.max(0.01, s.s.v));
        const o = Math.min(1, Math.max(0, s.o.v));
        p.mats.forEach((m) => setOpacity(m, o));
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("click", click);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}
