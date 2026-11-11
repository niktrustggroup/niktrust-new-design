import { createFileRoute, Link } from "@tanstack/react-router";
import { KINDS, byKind } from "@/lib/data";
import { SPECIAL_LISTS } from "@/lib/special-lists";
import { Page, PlatformRow, meta } from "@/components/site/ui";

export const Route = createFileRoute("/best")({
  head: () => meta("بهترین‌ها", "پلتفرم‌های با امتیاز بالا در هر دسته؛ امتیاز بالاتر به معنای مناسب بودن برای همه نیست."),
  component: () => (
    <Page crumbs={[{ label: "بهترین‌ها" }]} title="بهترین‌ها" lead="پلتفرم‌های با امتیاز بالا در هر دسته؛ امتیاز بالاتر به معنای مناسب بودن برای همه نیست.">
      <div className="mb-8 grid gap-3 sm:grid-cols-2">{SPECIAL_LISTS.map(l => <Link key={l.slug} to="/best/$list" params={{list:l.slug}} className="rounded-lg border border-border bg-card p-4 font-semibold text-primary">{l.title} ←</Link>)}</div>
      <div className="space-y-10">{KINDS.map((k) => (
        <section key={k.id}>
          <div className="flex items-end justify-between"><h2 className="text-xl font-extrabold text-brand-deep">بهترین {k.plural}</h2>
            <Link to="/platforms/$kind" params={{ kind: k.id }} className="text-sm font-semibold text-primary">همهٔ {k.plural}</Link></div>
          <ol className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">{byKind(k.id).slice(0, 3).map((p, i) => <PlatformRow key={p.slug} p={p} rank={i + 1} />)}</ol>
        </section>))}</div>
    </Page>
  ),
});
