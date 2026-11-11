import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Sprout, Scale, FileSearch, ChevronLeft, ShieldCheck, Coins, Headset, Globe2,
  CalendarClock,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { KINDS, byKind, ARTICLES, type Kind } from "@/lib/data";
import { PlatformRow } from "@/components/site/ui";
import { Calculator } from "@/components/site/Calculator";
import { MarketPulse } from "@/components/site/MarketPulse";
import { PlatformFinder } from "@/components/site/PlatformFinder";
import { Button } from "@/components/ui/button";
import { Star, Bell, UserRound } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نیک‌تراست — بررسی و مقایسه مستقل پلتفرم‌های مالی" },
      { name: "description", content: "بروکرهای فارکس، صرافی‌های ارز دیجیتال و پراپ‌فرم‌ها را با معیارهای منتشرشده و داده‌های تاریخ‌دار مقایسه کنید." },
      { property: "og:title", content: "نیک‌تراست — ارزیاب پلتفرم‌های مالی با اولویت اعتماد" },
      { property: "og:description", content: "مقایسه شفاف، تخصصی و بی‌طرف بروکر، صرافی و پراپ‌فرم برای فارسی‌زبانان." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


function Index() {
  const nav = useNavigate();
  const [heroKind, setHeroKind] = useState<Kind>("broker");
  const [topKind, setTopKind] = useState<Kind>("broker");

  return (
    <div className="bg-background">

      <main className="mx-auto max-w-[1200px] px-4">
        {/* S1 Hero */}
        <section className="mt-6 grid gap-8 rounded-2xl bg-tint p-6 md:p-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-primary">شفاف · تخصصی · بی‌طرف</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-brand-deep md:text-5xl">پلتفرم مالی مناسب خود را پیدا کنید</h1>
            <p className="mt-4 max-w-xl text-[17px] leading-8 text-muted-foreground">بروکر، صرافی و پراپ‌فرم را با معیارهای منتشرشده و داده‌های تاریخ‌دار مقایسه کنید؛ تصمیم نهایی با خود شماست.</p>
            <div role="tablist" className="mt-6 grid grid-cols-3 rounded-xl bg-card p-1 sm:inline-grid">
              {KINDS.map((k) => (
                <button key={k.id} role="tab" aria-selected={heroKind === k.id} onClick={() => setHeroKind(k.id)}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${heroKind === k.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"}`}>{k.label}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const q = new FormData(e.currentTarget).get("q") as string; nav({ to: "/search", search: { q: q || undefined } }); }} className="mt-3 flex flex-col gap-3 sm:flex-row">
              <label className="flex h-12 flex-1 items-center gap-2 rounded-xl border border-input bg-card px-4 focus-within:ring-2 focus-within:ring-ring">
                <Search className="size-5 text-muted-foreground" />
                <input name="q" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" placeholder={`نام ${KINDS.find((k) => k.id === heroKind)?.label ?? "پلتفرم"} را جستجو کنید…`} />
              </label>
              <button type="button" onClick={() => nav({ to: "/platforms/$kind", params: { kind: heroKind } })} className="h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90">مقایسه پلتفرم‌ها</button>
            </form>
          </div>
          <aside className="self-end rounded-xl border border-border bg-card p-5 lg:col-span-5">
            <div className="flex items-center gap-2 font-bold text-brand-deep"><ShieldCheck className="size-5 text-success" />پنل اعتماد</div>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-muted-foreground">پلتفرم بررسی‌شده</dt><dd className="num mt-1 text-2xl font-bold">۱۲۴</dd></div>
              <div><dt className="text-muted-foreground">معیار ارزیابی</dt><dd className="num mt-1 text-2xl font-bold">۴ محور</dd></div>
            </dl>
            <p className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground"><CalendarClock className="size-4" />آخرین به‌روزرسانی: ۲۰ آبان ۱۴۰۵</p>
          </aside>
        </section>

        {/* S2 Intent */}
        <section className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { i: Sprout, to: "/learn", t: "تازه‌کارم", d: "از کجا شروع کنم و به چه چیزی اعتماد کنم؟" },
            { i: Scale, to: "/compare", t: "می‌خواهم مقایسه کنم", d: "۲ تا ۴ پلتفرم هم‌نوع را کنار هم ببینید." },
            { i: FileSearch, to: "/check", t: "پلتفرم خاصی را بررسی کنم", d: "خلاصهٔ تصمیم، مزایا، معایب و داده‌ها." },
          ].map(({ i: I, to, t, d }) => (
            <Link key={t} to={to} className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-tint text-primary"><I className="size-6" /></span>
              <span className="flex-1"><span className="block font-bold">{t}</span><span className="text-sm text-muted-foreground">{d}</span></span>
              <ChevronLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
            </Link>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">پلتفرم مناسب خود را پیدا کنید</h2><Link to="/finder" className="text-sm font-semibold text-primary">انتخاب هدایت‌شده ←</Link></div>
          <PlatformFinder />
        </section>

        {/* S3 Top rated */}
        <section id="top" className="mt-16 scroll-mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">امتیاز بالا در هر دسته</h2>
              <p className="mt-2 text-sm text-muted-foreground">امتیاز بالاتر به معنای مناسب بودن برای هر کاربر نیست.</p>
            </div>
            <div role="tablist" className="inline-flex rounded-xl bg-muted p-1">
              {KINDS.map((k) => (
                <button key={k.id} role="tab" aria-selected={topKind === k.id} onClick={() => setTopKind(k.id)}
                  className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${topKind === k.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}>{k.label}</button>
              ))}
            </div>
          </div>
          <ol className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {byKind(topKind).slice(0, 5).map((p, idx) => <PlatformRow key={p.slug} p={p} rank={idx + 1} />)}
          </ol>
          <Link to="/best" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">همهٔ فهرست‌ها<ChevronLeft className="size-4" /></Link>
          <p className="mt-2 text-xs text-muted-foreground">داده‌های نمونه برای پیش‌نمایش طراحی.</p>
        </section>

        {/* S4 Method */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">چگونه ارزیابی می‌کنیم</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: ShieldCheck, t: "امنیت و مجوز", d: "نهاد ناظر، تفکیک دارایی و سابقهٔ پلتفرم." },
              { i: Coins, t: "هزینه‌ها", d: "اسپرد، کمیسیون و کارمزد واریز و برداشت با تاریخ." },
              { i: Globe2, t: "دسترسی از ایران", d: "ثبت‌نام، روش پرداخت و محدودیت‌های اعلام‌شده." },
              { i: Headset, t: "پشتیبانی و تجربه", d: "پشتیبانی فارسی، پلتفرم معاملاتی و آموزش." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-xl border border-border bg-card p-5">
                <I className="size-6 text-primary" />
                <h3 className="mt-3 font-bold">{t}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <Link to="/methodology" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">روش ارزیابی کامل<ChevronLeft className="size-4" /></Link>
        </section>

        {/* S5 Five steps */}
        <section className="mt-16 rounded-2xl bg-brand-deep p-6 text-primary-foreground md:p-10">
          <h2 className="text-2xl font-extrabold md:text-3xl">پنج گام پیش از انتخاب</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-5">
            {["نوع پلتفرم را مشخص کنید", "مجوز و نهاد ناظر را بررسی کنید", "هزینه‌ها را مقایسه کنید", "دسترسی از ایران را بسنجید", "با مبلغ کم آزمایش کنید"].map((s, i) => (
              <li key={s} className="rounded-xl border border-primary-foreground/15 p-4">
                <span className="num text-3xl font-extrabold text-primary-foreground/50">{(i + 1).toLocaleString("fa-IR")}</span>
                <p className="mt-2 font-semibold leading-7">{s}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* S6 Comparisons */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">مقایسه‌های پرطرفدار</h2>
          <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
            {[["آلفا مارکتس", "نوا اف‌اکس", "alpha-markets,nova-fx"], ["بیت‌پل", "کوین‌گیت", "bitpal,coingate"], ["فاندد پرو", "تریدر کپیتال", "funded-pro,trader-capital"], ["مریدین", "اطلس ترید", "meridian,atlas-trade"]].map(([a, b, ids]) => (
              <Link key={a} to="/compare" search={{ p: ids }} className="min-w-[70%] snap-start rounded-xl border border-border bg-card p-5 hover:border-primary sm:min-w-[40%] md:min-w-0">
                <div className="flex items-center justify-between font-bold"><span>{a}</span><span className="rounded-md bg-tint px-2 py-0.5 text-xs text-primary">در برابر</span><span>{b}</span></div>
                <p className="mt-3 text-sm text-muted-foreground">هزینه، مجوز و دسترسی در یک جدول</p>
              </Link>
            ))}
          </div>
        </section>

        {/* S7 Learn */}
        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">نبض بازار</h2><Link to="/markets" className="text-sm font-semibold text-primary">نمای کامل بازار ←</Link></div>
          <MarketPulse />
        </section>
        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">ابزارها و ماشین‌حساب‌های مالی</h2><Link to="/tools" className="text-sm font-semibold text-primary">همهٔ ابزارها ←</Link></div>
          <Calculator compact />
        </section>
        <section className="mt-16 border-y border-border py-8">
          <div className="flex flex-wrap items-end justify-between gap-3"><h2 className="text-2xl font-extrabold text-brand-deep">آخرین تغییرات پلتفرم‌ها</h2><Link to="/alerts" className="text-sm font-semibold text-primary">مرکز هشدارها و تغییرات ←</Link></div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">تغییر تأییدشده‌ای منتشر نشده است. نبودن هشدار به معنی امنیت پلتفرم نیست.</p>
          <div className="mt-4 flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/alerts/report">گزارش تغییر یا مشکل</Link></Button><Button asChild variant="ghost"><Link to="/corrections">سیاست اصلاحات</Link></Button></div>
        </section>
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-brand-deep">پیگیری شخصی</h2><p className="mt-2 text-sm text-muted-foreground">حساب، ذخیرهٔ دائمی و ارسال اعلان هنوز فعال نیستند.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{p:'watchlist',t:'پلتفرم‌های ذخیره‌شده',i:Star},{p:'saved',t:'مقایسه‌های ذخیره‌شده',i:Scale},{p:'notifications',t:'اعلان تغییرات',i:Bell},{p:'profile',t:'حساب کاربری',i:UserRound}].map(({p,t,i:I})=><Link key={p} to="/account/$page" params={{page:p}} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"><I className="size-5 text-primary"/><span className="flex-1 text-sm font-semibold">{t}</span><span className="text-xs text-muted-foreground">غیرفعال</span></Link>)}</div>
        </section>
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">آموزش</h2>
            <Link to="/glossary" className="text-sm font-semibold text-primary">واژه‌نامه</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-3"><Button asChild variant="outline"><Link to="/blog">مجلهٔ نیک‌تراست</Link></Button><Button asChild variant="outline"><Link to="/news">اخبار و تحلیل</Link></Button></div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a) => (
              <Link key={a.slug} to="/learn/$slug" params={{ slug: a.slug }} className="rounded-xl border border-border bg-card p-5 hover:border-primary">
                <span className="text-xs font-semibold text-success">{a.cat}</span>
                <h3 className="mt-2 font-bold leading-7">{a.title}</h3>
                <p className="mt-3 text-xs text-muted-foreground">زمان مطالعه: {a.min} دقیقه</p>
              </Link>
            ))}
          </div>
        </section>

        {/* S8 FAQ */}
        <section className="mt-16 mb-16">
          <h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">پرسش‌های پرتکرار</h2>
          <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
            {[
              ["نیک‌تراست بروکر یا فروشنده است؟", "خیر. نیک‌تراست فقط بررسی و مقایسه می‌کند و هیچ خدمات معاملاتی یا سیگنال ارائه نمی‌دهد."],
              ["امتیازها چطور محاسبه می‌شوند؟", "بر اساس چهار محور منتشرشده در صفحهٔ روش ارزیابی؛ فرمول کامل در آن صفحه آمده است."],
              ["آیا همکاری تجاری روی امتیاز اثر دارد؟", "خیر. همکاری تجاری فقط روی دکمه‌های همکاری اثر دارد و همیشه برچسب می‌خورد."],
              ["داده‌ها هر چند وقت به‌روز می‌شوند؟", "هر داده تاریخ آخرین بررسی و منبع خود را کنارش نشان می‌دهد."],
              ["«اعلام نشده» یعنی چه؟", "یعنی پلتفرم اطلاعات رسمی دربارهٔ آن مورد منتشر نکرده و ما فرضی نمی‌کنیم."],
              ["مجوز داشتن یعنی پلتفرم کاملاً امن است؟", "خیر. مجوز تضمین درستی نیست؛ فقط یکی از نشانه‌های اعتماد است."],
            ].map(([q, a]) => (
              <details key={q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{q}<ChevronLeft className="size-4 transition-transform group-open:-rotate-90" /></summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}

