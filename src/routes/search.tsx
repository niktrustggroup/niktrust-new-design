import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search as S } from "lucide-react";
import { PLATFORMS, ARTICLES, kindOf } from "@/lib/data";
import { Page, Mark, Empty, meta } from "@/components/site/ui";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined } => ({ q: typeof s["q"] === "string" ? s["q"] : undefined }),
  head: () => meta("جستجو", "جستجو در پلتفرم‌ها و مقالات نیک‌تراست با نام فارسی یا لاتین."),
  component: Search,
});
function Search() {
  const { q = "" } = Route.useSearch();
  const nav = useNavigate({ from: "/search" });
  const t = q.trim().toLowerCase();
  const ps = t ? PLATFORMS.filter((p) => p.fa.includes(t) || p.en.toLowerCase().includes(t)) : [];
  const as = t ? ARTICLES.filter((a) => a.title.includes(t)) : [];
  return (
    <Page crumbs={[{ label: "جستجو" }]} title="جستجو">
      <label className="flex h-12 max-w-2xl items-center gap-2 rounded-xl border border-input bg-card px-4 focus-within:ring-2 focus-within:ring-ring">
        <S className="size-5 text-muted-foreground" />
        <input autoFocus value={q} onChange={(e) => nav({ search: { q: e.target.value || undefined }, replace: true })} className="w-full bg-transparent outline-none" placeholder="نام فارسی یا لاتین پلتفرم، یا موضوع مقاله…" />
      </label>
      <div className="mt-8 max-w-2xl space-y-6">
        {!t ? <Empty title="چیزی بنویسید تا جستجو شروع شود">مثلاً «بیت‌پل» یا «Alpha»</Empty>
          : !ps.length && !as.length ? <Empty title={`نتیجه‌ای برای «${q}» پیدا نشد`}>املای دیگری را امتحان کنید یا <Link to="/best" className="text-primary">بهترین‌ها</Link> را ببینید.</Empty> : (<>
          {ps.length > 0 && <section><h2 className="font-bold">پلتفرم‌ها</h2><ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">{ps.map((p) => (
            <li key={p.slug}><Link to="/platforms/$kind/$slug" params={{ kind: p.kind, slug: p.slug }} className="flex items-center gap-3 p-3 hover:bg-accent"><Mark p={p} size={9} /><span className="flex-1 font-bold">{p.fa} <bdi className="text-xs font-normal text-muted-foreground">{p.en}</bdi></span><span className="text-xs text-muted-foreground">{kindOf(p.kind)!.label}</span></Link></li>))}</ul></section>}
          {as.length > 0 && <section><h2 className="font-bold">مقالات</h2><ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">{as.map((a) => (
            <li key={a.slug}><Link to="/learn/$slug" params={{ slug: a.slug }} className="block p-3 hover:bg-accent">{a.title}</Link></li>))}</ul></section>}
        </>)}
      </div>
    </Page>
  );
}
