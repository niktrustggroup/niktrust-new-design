import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/data";
import { Page, Trust, meta } from "@/components/site/ui";
import { TOPICS } from "@/lib/content";
import { ContentHub } from "@/components/site/ContentHub";

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => { const a = ARTICLES.find((x) => x.slug === params.slug); const topic = TOPICS.find((x) => x.slug === params.slug); if (!a && !topic) throw notFound(); return a ?? { slug: topic?.slug ?? params.slug, title: `آموزش ${topic?.label}`, excerpt: "مطالب نمونهٔ آموزشی در این موضوع", cat: topic?.cat ?? "", min: "", topic: true }; },
  head: ({ loaderData: a }) => a ? { ...meta(a.title, a.excerpt), meta: [...meta(a.title, a.excerpt).meta.filter((m) => !("property" in m && m.property === "og:type")), { property: "og:type", content: "article" }] } : { meta: [{ title: "یافت نشد | نیک‌تراست" }, { name: "robots", content: "noindex" }] },
  component: Article,
});

function Article() {
  const a = Route.useLoaderData();
  if ("topic" in a) return <Page title={a.title} lead={a.excerpt}><ContentHub key={a.slug} topic={a.slug} /></Page>;
  const rel = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <Page crumbs={[{ label: "آموزش", to: "/learn" }, { label: a.title }]} title={a.title} lead={a.excerpt}>
      <div className="grid gap-10 lg:grid-cols-12">
        <article className="space-y-5 text-[17px] leading-9 lg:col-span-8">
          <Trust source="تیم تحریریهٔ نیک‌تراست" />
          <h2 className="text-xl font-extrabold text-brand-deep">خلاصه در یک نگاه</h2>
          <p>این مقاله یک نمونهٔ ساختاری است. متن نهایی توسط تیم تحریریه جایگزین می‌شود و هر اصطلاح در اولین استفاده توضیح داده می‌شود.</p>
          <h2 className="text-xl font-extrabold text-brand-deep">چرا مهم است؟</h2>
          <p>انتخاب آگاهانه یعنی دانستن هزینه‌ها، ریسک‌ها و شرایط پیش از واریز. نیک‌تراست اطلاعات می‌دهد و تصمیم با شماست.</p>
          <div className="rounded-xl bg-tint p-5 text-base"><strong>نکته:</strong> همیشه پیش از واریز اصلی، یک برداشت آزمایشی با مبلغ کم انجام دهید.</div>
        </article>
        <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-20 lg:col-span-4">
          <p className="font-bold">مقالات مرتبط</p>
          <ul className="mt-3 space-y-3 text-sm">{rel.map((r) => <li key={r.slug}><Link to="/learn/$slug" params={{ slug: r.slug }} className="hover:text-primary">{r.title}</Link></li>)}</ul>
          <Link to="/compare" className="mt-5 flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">مقایسهٔ پلتفرم‌ها</Link>
        </aside>
      </div>
    </Page>
  );
}
