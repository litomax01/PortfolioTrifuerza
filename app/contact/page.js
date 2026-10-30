"use client";
import { useState } from "react";
import { Page, Item, PageHead, Letters, Footer } from "@/components/ui";
import { useApp } from "@/components/store";
import { profile } from "@/lib/data";

const L = {
  en: {
    title: "Let’s talk about your project",
    lead: "Tell me what you need: a store, a management system or a website. I read every message and reply by email.",
    direct: "Contact directly",
    cv: "Download CV",
    formTitle: "Send a message",
    name: "Your name", email: "Your email", topic: "What do you need?", message: "Message",
    topics: ["Freelance project", "Collaboration", "Other"],
    send: "Send message", sending: "Sending…", sent: "Message sent. Thank you, I will reply to your email soon.", fail: "The message could not be sent. Please try again in a few minutes.", rate: "Too many attempts. Please wait a few minutes.", notConfigured: "Sending is not available right now. Please reach me on LinkedIn.", privacy: "Your email is only used to reply to you.",
    errName: "Enter your name.", errEmail: "Enter a valid email.", errMsg: "Write a message of at least 10 characters.",
    subject: "Portfolio contact",
  },
  es: {
    title: "Hablemos de tu proyecto",
    lead: "Cuéntame qué necesitas: una tienda, un sistema de gestión o un sitio web. Leo cada mensaje y respondo por correo.",
    direct: "Contacto directo",
    cv: "Descargar CV",
    formTitle: "Envíame un mensaje",
    name: "Tu nombre", email: "Tu correo", topic: "¿Qué necesitas?", message: "Mensaje",
    topics: ["Proyecto freelance", "Colaboración", "Otro"],
    send: "Enviar mensaje", sending: "Enviando…", sent: "Mensaje enviado. Gracias, responderé a tu correo pronto.", fail: "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.", rate: "Demasiados intentos. Espera unos minutos.", notConfigured: "El envío no está disponible por ahora. Escríbeme por LinkedIn.", privacy: "Tu correo solo se usa para responderte.",
    errName: "Escribe tu nombre.", errEmail: "Escribe un correo válido.", errMsg: "Escribe un mensaje de al menos 10 caracteres.",
    subject: "Contacto desde el portafolio",
  },
};

export default function Contact() {
  const { t, lang } = useApp();
  const l = L[lang];
  const [f, setF] = useState({ name: "", email: "", topic: 0, message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | fail | rate | notConfigured
  const [website, setWebsite] = useState(""); // honeypot
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const validate = () => {
    const er = {};
    if (f.name.trim().length < 2) er.name = l.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) er.email = l.errEmail;
    if (f.message.trim().length < 10) er.message = l.errMsg;
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending" || !validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.name, email: f.email, topic: l.topics[f.topic], message: f.message, website }),
      });
      if (res.ok) { setStatus("sent"); setF({ name: "", email: "", topic: 0, message: "" }); return; }
      const { error } = await res.json().catch(() => ({}));
      setStatus(error === "rate" ? "rate" : error === "not-configured" ? "notConfigured" : "fail");
    } catch { setStatus("fail"); }
  };
  const statusText = { sent: l.sent, fail: l.fail, rate: l.rate, notConfigured: l.notConfigured, sending: l.sending }[status] || "";

  return (
    <>
      <Page className="contact">
        <Item><PageHead title={t("contact")} /></Item>
        <div className="contact-grid">
          <div className="contact-info">
            <Item as="h2" className="contact-title"><Letters text={l.title} step={20} /></Item>
            <Item as="p" className="contact-lead">{l.lead}</Item>
            <Item className="contact-direct">
              <h6>{l.direct}</h6>
              <div className="contact-actions">
                <a className="cta-btn primary" href={profile.resume[lang]} target="_blank" rel="noreferrer">↓ {l.cv}</a>
                {profile.socials.map((s) => (
                  <a key={s.name} className="cta-btn" href={s.url} target="_blank" rel="noreferrer">{s.name} ↗</a>
                ))}
              </div>
            </Item>
          </div>

          <Item as="form" className="contact-form" onSubmit={submit} noValidate aria-labelledby="cf-title">
            <h3 id="cf-title" className="contact-form-title">{l.formTitle}</h3>
            <label className="field">
              <span>{l.name}</span>
              <input type="text" name="name" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
              {errors.name && <em id="e-name" className="field-error">{errors.name}</em>}
            </label>
            <label className="field">
              <span>{l.email}</span>
              <input type="email" name="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
              {errors.email && <em id="e-email" className="field-error">{errors.email}</em>}
            </label>
            <fieldset className="field topics">
              <legend>{l.topic}</legend>
              <div className="chips">
                {l.topics.map((x, i) => (
                  <label key={x} className={`chip topic${f.topic === i ? " on" : ""}`}>
                    <input type="radio" name="topic" checked={f.topic === i} onChange={() => setF({ ...f, topic: i })} />
                    {x}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="field">
              <span>{l.message}</span>
              <textarea name="message" rows={5} value={f.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-msg" : undefined} />
              {errors.message && <em id="e-msg" className="field-error">{errors.message}</em>}
            </label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hp" value={website} onChange={(e) => setWebsite(e.target.value)} />
            <div className="contact-actions">
              <button type="submit" className="cta-btn primary" disabled={status === "sending"}>{status === "sending" ? l.sending : `${l.send} →`}</button>
            </div>
            <p className={`contact-note${status === "sent" ? " ok" : ""}`} role="status" aria-live="polite">{statusText || l.privacy}</p>
          </Item>
        </div>
      </Page>
      <Footer />
    </>
  );
}
