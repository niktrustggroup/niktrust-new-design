import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { byKind, kindOf, fa } from "@/lib/data";
import { Page, PlatformRow, Empty, meta } from "@/components/site/ui";

export const Route = createFileRoute("/platforms/$kind/")({
  loader: ({ params }) => { const k = kindOf(params.kind); if (!k) throw notFound(); return k; },
  head: ({ loaderData }) => meta(loaderData?.plural ?? "پلتفرم‌ها", loaderData?.intro ?? "فهرست پلتفرم‌های بررسی‌شده"),
  component: Hub,
});

function Hub() {
  const k = Route.useLoaderData();
  const [minScore, setMin] = useState(0);
  const [iran, setIran] = useState(false);
  const [licensed, setLic] = useState(false);
  const [fa_, setFa] = useState(false);
  const list = useMemo(() => byKind(k.id).filter((p) => p.score >= minScore && (!iran || p.iran === "دسترسی دارد") && (!licensed || p.reg !== "اعلام نشده") && (!fa_ || p.persianSupport)), [k, minScore, iran, licensed, fa_]);
  const Box = ({ v, set, l }: { v: boolean; set: (b: boolean) => void; l: string }) => (
    <label className="flex items-center gap-2 py-1.5 text-sm"><input type="checkbox" checked={v} onChange={(e) => set(e.target.checked)} className="size-4 accent-primary" />{l}</label>
  );
  return (
    <Page crumbs={[{ label: "پلتفرم‌ها" }, { label: k.plural }]} title={k.plural} lead={k.intro}>
      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-20 lg:col-span-3">
          <p className="flex items-center gap-2 font-bold"><SlidersHorizontal className="size-4" />فیلترها</p>
          <div className="mt-4 space-y-1">
            <Box v={licensed} set={setLic} l="فقط دارای مجوز/ثبت" />
            <Box v={iran} set={setIran} l="دسترسی از ایران" />
            <Box v={fa_} set={setFa} l="پشتیبانی فارسی" />
          </div>
          <label className="mt-4 block text-sm">حداقل امتیاز: <span className="num font-bold">{fa(minScore)}</span>
            <input type="range" min={0} max={9} step={0.5} value={minScore} onChange={(e) => setMin(+e.target.value)} className="mt-2 w-full accent-primary" /></label>
          <p className="mt-4 border-t border-border pt-3 text-sm" aria-live="polite"><span className="num font-bold text-primary">{fa(list.length)}</span> نتیجه</p>
        </aside>
        <div className="lg:col-span-9">
          {list.length ? <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">{list.map((p, i) => <PlatformRow key={p.slug} p={p} rank={i + 1} />)}</ol>
            : <Empty title="نتیجه‌ای با این فیلترها پیدا نشد">یکی از فیلترها را بردارید.</Empty>}
          <p className="mt-3 text-xs text-muted-foreground">امتیاز بالاتر به معنای مناسب بودن برای هر کاربر نیست. داده‌های نمونه برای پیش‌نمایش طراحی.</p>
        </div>
      </div>
    </Page>
  );
}
