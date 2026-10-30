"use client";
import { Page, Item, ULink } from "@/components/ui";
import { useApp } from "@/components/store";

export default function NotFound() {
  const { t } = useApp();
  return (
    <Page className="error-container">
      <Item as="h1" className="error-code">404</Item>
      <Item as="p">{t("notFound")}</Item>
      <Item><ULink type="internal" text={t("backHome")} href="/" /></Item>
    </Page>
  );
}
