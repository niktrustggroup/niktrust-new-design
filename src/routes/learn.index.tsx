import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, GLOSSARY } from "@/lib/data";
import { Page, meta } from "@/components/site/ui";

export const Route = createFileRoute("/learn/")({
  head: () => meta("آموزش و اخبار", "مقالات آموزشی دربارهٔ بروکر، صرافی و پراپ‌فرم و واژه‌نامهٔ اصطلاحات مالی."),
  component: () => (
    <Page crumbs={[{ label: "آموزش" }]} title="آموزش و اخبار" lead="از مفاهیم پایه تا نکات حرفه‌ای، بدون اصطلاحات توضیح‌داده‌نشده.">
      <div className="grid gap-4 md:grid-cols-3">{ARTICLES.map((a) => (
        <Link key={a.slug} to="/learn/$slug" params={{ slug: a.slug }} className="rounded-xl border border-border bg-card p-5 hover:border-primary">
          <span className="text-xs font-semibold text-success">{a.cat}</span><h2 className="mt-2 font-bold leading-7">{a.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{a.excerpt}</p><p className="mt-3 text-xs text-muted-foreground">زمان مطالعه: {a.min} دقیقه</p>
        </Link>))}</div>
      <section id="glossary" className="mt-12"><h2 className="text-xl font-extrabold text-brand-deep">واژه‌نامه</h2>
        <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">{GLOSSARY.map(([t, d]) => <div key={t} className="grid gap-1 p-4 md:grid-cols-4"><dt className="font-bold">{t}</dt><dd className="text-sm text-muted-foreground md:col-span-3">{d}</dd></div>)}</dl></section>
    </Page>
  ),
});
