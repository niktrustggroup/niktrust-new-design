import { Link } from "@tanstack/react-router";
import { ChevronLeft, CalendarClock, Globe2 } from "lucide-react";
import type { ReactNode } from "react";
import { fa, type Platform } from "@/lib/data";

export function Page({ crumbs, title, lead, children }: { crumbs?: { label: string; to?: string }[]; title: string; lead?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-[1200px] px-4 pb-16">
      <nav aria-label="نان‌ریزه" className="flex flex-wrap items-center gap-1 pt-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">خانه</Link>
        {crumbs?.map((c) => (<span key={c.label} className="flex items-center gap-1"><ChevronLeft className="size-3" />{c.to ? <Link to={c.to as never} className="hover:text-primary">{c.label}</Link> : <span>{c.label}</span>}</span>))}
      </nav>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight text-brand-deep md:text-4xl">{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-[17px] leading-8 text-muted-foreground">{lead}</p>}
      <div className="mt-8">{children}</div>
    </main>
  );
}
export function Badge({ tone = "muted", children }: { tone?: "success" | "muted" | "primary"; children: ReactNode }) {
  const t = tone === "success" ? "bg-success/10 text-success" : tone === "primary" ? "bg-tint text-primary" : "bg-muted text-muted-foreground";
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${t}`}>{children}</span>;
}
export const regTone = (r: string) => (r === "اعلام نشده" ? "muted" : "success") as "muted" | "success";
export function Mark({ p, size = 12 }: { p: Platform; size?: number }) {
  return <span style={{ width: size * 4, height: size * 4 }} className="grid shrink-0 place-items-center rounded-lg border border-border bg-muted text-xs font-bold text-brand-deep"><bdi>{p.en.slice(0, 2)}</bdi></span>;
}
export function Trust({ date = "۲۰ آبان ۱۴۰۵", source = "وب‌سایت رسمی پلتفرم" }: { date?: string; source?: string }) {
  return <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarClock className="size-3.5" />آخرین بررسی: {date} · منبع: {source}</p>;
}
export function PlatformRow({ p, rank }: { p: Platform; rank: number }) {
  return (
    <li className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-4 gap-y-2 p-4 md:grid-cols-[2rem_3rem_1fr_9rem_9rem_6rem_auto]">
      <span className="num text-lg font-bold text-muted-foreground">{fa(rank)}</span>
      <Mark p={p} />
      <span><Link to="/platforms/$kind/$slug" params={{ kind: p.kind, slug: p.slug }} className="block font-bold hover:text-primary">{p.fa}</Link><bdi className="text-xs text-muted-foreground">{p.en}</bdi></span>
      <span className="num md:order-last md:text-end"><span className="text-xl font-extrabold text-primary">{fa(p.score)}</span><span className="text-xs text-muted-foreground"> از ۱۰</span></span>
      <span className="col-span-4 md:col-span-1"><Badge tone={regTone(p.reg)}>{p.reg}</Badge></span>
      <span className="col-span-4 md:col-span-1"><Badge><Globe2 className="size-3" />{p.iran}</Badge></span>
      <Link to="/platforms/$kind/$slug" params={{ kind: p.kind, slug: p.slug }} className="col-span-4 text-sm font-semibold text-primary hover:underline md:col-span-1">مشاهدهٔ بررسی</Link>
    </li>
  );
}
export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="rounded-xl border border-dashed border-border p-10 text-center"><p className="font-bold">{title}</p><div className="mt-2 text-sm text-muted-foreground">{children}</div></div>;
}
export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} | نیک‌تراست` }, { name: "description", content: description },
    { property: "og:title", content: `${title} | نیک‌تراست` }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ],
});
