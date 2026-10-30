// Receives the contact form and forwards it to Formspree. The destination email is
// configured in the Formspree dashboard, so it never appears in this code or in the browser.
const hits = new Map(); // ip -> timestamps (simple in-memory rate limit)

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (limited(ip)) return Response.json({ error: "rate" }, { status: 429 });

  let data;
  try { data = await request.json(); } catch { return Response.json({ error: "bad" }, { status: 400 }); }

  if (data.website) return Response.json({ ok: true }); // honeypot: bots fill hidden fields

  const name = clean(data.name, 80);
  const email = clean(data.email, 120);
  const topic = clean(data.topic, 60);
  const message = String(data.message ?? "").replace(/\r/g, "").trim().slice(0, 4000);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) return Response.json({ error: "not-configured" }, { status: 503 });

  const res = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, topic, message, _subject: `Portafolio: ${topic} — ${name}` }),
  });
  if (!res.ok) return Response.json({ error: "send-failed" }, { status: 502 });
  return Response.json({ ok: true });
}
