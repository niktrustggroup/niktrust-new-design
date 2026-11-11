import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, X, AlertTriangle, Scale } from "lucide-react";
import { bySlug, byKind, kindOf, fa } from "@/lib/data";
import { Page, Badge, Mark, Trust, regTone, meta } from "@/components/site/ui";

export const Route = createFileRoute("/platforms/$kind/$slug")({
  loader: ({ params }) => { const p = bySlug(params.slug); if (!p || p.kind !== params.kind) throw notFound(); return p; },
  head: ({ loaderData: p }) => p ? meta(`بررسی ${p.fa}`, `امتیاز ${fa(p.score)} از ۱۰؛ مجوز، هزینه‌ها، دسترسی از ایران، مزایا و معایب ${p.fa}.`) : { meta: [{ title: "یافت نشد | نیک‌تراست" }, { name: "robots", content: "noindex" }] },
  component: Profile,
});

function Profile() {
  const p = Route.useLoaderData();
  const k = kindOf(p.kind)!;
  const alts = byKind(p.kind).filter((x) => x.slug !== p.slug).slice(0, 3);
  const facts: [string, string][] = [["مجوز / وضعیت", p.reg], ["دسترسی از ایران", p.iran], ["حداقل واریز", p.minDeposit], ["هزینهٔ اصلی", p.fee], ["پشتیبانی فارسی", p.persianSupport ? "دارد" : "ندارد"], ["سال تأسیس", p.founded]];
  return (
    <Page crumbs={[{ label: k.plural, to: `/platforms/${p.kind}` }, { label: p.fa }]} title={`بررسی ${p.fa}`}>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          {/* Decision summary */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Mark p={p} size={16} />
              <div className="flex-1"><p className="text-xl font-extrabold">{p.fa}</p><bdi className="text-sm text-muted-foreground">{p.en}</bdi></div>
              <div className="num text-center"><p className="text-4xl font-extrabold text-primary">{fa(p.score)}</p><p className="text-xs text-muted-foreground">از ۱۰</p></div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-success/5 p-4"><p className="text-sm font-bold text-success">مناسب برای</p><ul className="mt-2 space-y-1 text-sm">{p.goodFor.map((g) => <li key={g}>• {g}</li>)}</ul></div>
              <div className="rounded-xl bg-muted p-4"><p className="flex items-center gap-1 text-sm font-bold"><AlertTriangle className="size-4" />موارد احتیاط</p><ul className="mt-2 space-y-1 text-sm">{p.caution.map((g) => <li key={g}>• {g}</li>)}</ul></div>
            </div>
            <div className="mt-4"><Trust date={p.updated} /></div>
          </section>
          <section><h2 className="text-xl font-extrabold text-brand-deep">دادهٔ کلیدی</h2>
            <table className="mt-4 w-full overflow-hidden rounded-xl border border-border bg-card text-sm"><tbody className="divide-y divide-border">
              {facts.map(([a, b]) => <tr key={a}><th className="w-1/3 bg-muted p-3 text-start font-medium">{a}</th><td className="num p-3">{b}</td></tr>)}
            </tbody></table><div className="mt-2"><Trust date={p.updated} /></div></section>
          <section className="grid gap-4 md:grid-cols-2">
            <div><h2 className="text-xl font-extrabold text-brand-deep">مزایا</h2><ul className="mt-3 space-y-2">{p.pros.map((x) => <li key={x} className="flex gap-2 text-sm"><Check className="size-4 shrink-0 text-success" />{x}</li>)}</ul></div>
            <div><h2 className="text-xl font-extrabold text-brand-deep">معایب</h2><ul className="mt-3 space-y-2">{p.cons.map((x) => <li key={x} className="flex gap-2 text-sm"><X className="size-4 shrink-0 text-destructive" />{x}</li>)}</ul></div>
          </section>
          <section><h2 className="text-xl font-extrabold text-brand-deep">جایگزین‌های هم‌دسته</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">{alts.map((a) => (
              <Link key={a.slug} to="/platforms/$kind/$slug" params={{ kind: a.kind, slug: a.slug }} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary"><Mark p={a} size={10} /><span className="flex-1 font-bold">{a.fa}</span><span className="num font-bold text-primary">{fa(a.score)}</span></Link>))}</div></section>
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-20 lg:col-span-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2"><Badge tone={regTone(p.reg)}>{p.reg}</Badge><Badge>{p.iran}</Badge></div>
            <Link to="/compare" search={{ p: p.slug }} className="mt-4 flex h-11 items-center justify-center gap-2 rounded-lg border border-primary font-semibold text-primary hover:bg-tint"><Scale className="size-4" />مقایسه با دیگران</Link>
            <div className="mt-4 border-t border-dashed border-border pt-4">
              <p className="text-xs text-muted-foreground">ناحیهٔ همکاری · این لینک ممکن است همکاری تجاری باشد و بر امتیاز اثری ندارد.</p>
              <a href="#" rel="sponsored nofollow" className="mt-2 flex h-11 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90">رفتن به وب‌سایت {p.fa}</a>
            </div>
          </div>
        </aside>
      </div>
    </Page>
  );
}
