import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X, Plus } from "lucide-react";
import { KINDS, PLATFORMS, bySlug, byKind, fa, type Kind } from "@/lib/data";
import { Page, Mark, Empty, Trust, meta } from "@/components/site/ui";

export const Route = createFileRoute("/compare")({
  validateSearch: (s: Record<string, unknown>): { p?: string } => ({ p: typeof s.p === "string" ? s.p : undefined }),
  head: () => meta("مقایسهٔ پلتفرم‌ها", "۲ تا ۴ پلتفرم هم‌نوع را بر اساس مجوز، هزینه و دسترسی از ایران کنار هم مقایسه کنید."),
  component: Compare,
});

function Compare() {
  const { p } = Route.useSearch();
  const nav = useNavigate({ from: "/compare" });
  const sel = (p ?? "").split(",").map(bySlug).filter(Boolean) as typeof PLATFORMS;
  const kind: Kind | undefined = sel[0]?.kind;
  const set = (slugs: string[]) => nav({ search: { p: slugs.length ? slugs.join(",") : undefined } });
  const pool = kind ? byKind(kind).filter((x) => !sel.includes(x)) : PLATFORMS;
  const rows: [string, (x: (typeof PLATFORMS)[number]) => string][] = [
    ["امتیاز", (x) => `${fa(x.score)} از ۱۰`], ["مجوز / وضعیت", (x) => x.reg], ["دسترسی از ایران", (x) => x.iran],
    ["حداقل واریز", (x) => x.minDeposit], ["هزینهٔ اصلی", (x) => x.fee], ["پشتیبانی فارسی", (x) => (x.persianSupport ? "دارد" : "ندارد")], ["سال تأسیس", (x) => x.founded],
  ];
  return (
    <Page crumbs={[{ label: "مقایسه" }]} title="مقایسهٔ پلتفرم‌ها" lead="۲ تا ۴ پلتفرم فقط از یک نوع انتخاب کنید.">
      <div className="sticky top-16 z-10 -mx-4 flex flex-wrap items-center gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <span className="text-sm font-semibold">در حال مقایسه ({fa(sel.length)}/۴):</span>
        {sel.map((x) => <button key={x.slug} onClick={() => set(sel.filter((y) => y !== x).map((y) => y.slug))} className="flex items-center gap-1 rounded-full bg-tint px-3 py-1 text-sm text-primary">{x.fa}<X className="size-3.5" /></button>)}
        {sel.length > 0 && <button onClick={() => set([])} className="text-xs text-muted-foreground underline">پاک کردن</button>}
      </div>
      {sel.length < 4 && (
        <section className="mt-6">
          <h2 className="font-bold">{kind ? `افزودن ${KINDS.find((k) => k.id === kind)!.label}` : "یک پلتفرم برای شروع انتخاب کنید"}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {pool.map((x) => (
              <button key={x.slug} onClick={() => set([...sel.map((y) => y.slug), x.slug])} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-start hover:border-primary">
                <Mark p={x} size={9} /><span className="flex-1"><span className="block text-sm font-bold">{x.fa}</span><span className="text-xs text-muted-foreground">{KINDS.find((k) => k.id === x.kind)!.label}</span></span><Plus className="size-4 text-primary" />
              </button>))}
          </div>
        </section>
      )}
      <section className="mt-8">
        {sel.length < 2 ? <Empty title="برای دیدن جدول، دست‌کم دو پلتفرم انتخاب کنید" /> : (
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[560px] text-sm">
              <thead><tr className="bg-muted"><th className="sticky start-0 bg-muted p-3 text-start">معیار</th>{sel.map((x) => <th key={x.slug} className="p-3 text-start"><Link to="/platforms/$kind/$slug" params={{ kind: x.kind, slug: x.slug }} className="hover:text-primary">{x.fa}</Link></th>)}</tr></thead>
              <tbody className="divide-y divide-border">{rows.map(([l, f]) => <tr key={l}><th className="sticky start-0 bg-card p-3 text-start font-medium">{l}</th>{sel.map((x) => <td key={x.slug} className="num p-3">{f(x)}</td>)}</tr>)}</tbody>
            </table>
          </div>)}
        <div className="mt-2"><Trust /></div>
      </section>
    </Page>
  );
}
