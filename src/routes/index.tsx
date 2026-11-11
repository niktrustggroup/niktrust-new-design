import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Sprout, Scale, FileSearch, ChevronLeft, ShieldCheck, Coins, Headset, Globe2,
  Menu, X, CalendarClock, Info,
} from "lucide-react";
import logo from "@/assets/niktrust-logotype.svg.asset.json";
import logoWhite from "@/assets/niktrust-logotype-white.svg.asset.json";

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

type Kind = "broker" | "exchange" | "prop";
const KINDS: { id: Kind; label: string }[] = [
  { id: "broker", label: "بروکر" },
  { id: "exchange", label: "صرافی" },
  { id: "prop", label: "پراپ‌فرم" },
];

// نمونه داده — تا اتصال پایگاه داده جایگزین می‌شود
const TOP: Record<Kind, { fa: string; en: string; score: string; reg: string; iran: string }[]> = {
  broker: [
    { fa: "آلفا مارکتس", en: "Alpha Markets", score: "۸٫۹", reg: "دارای مجوز", iran: "اعلام نشده" },
    { fa: "نوا اف‌اکس", en: "Nova FX", score: "۸٫۶", reg: "دارای مجوز", iran: "دسترسی محدود" },
    { fa: "مریدین", en: "Meridian", score: "۸٫۲", reg: "دارای مجوز", iran: "اعلام نشده" },
    { fa: "اطلس ترید", en: "Atlas Trade", score: "۷٫۹", reg: "مجوز فراساحلی", iran: "دسترسی دارد" },
    { fa: "کوانتا", en: "Quanta", score: "۷٫۵", reg: "مجوز فراساحلی", iran: "اعلام نشده" },
  ],
  exchange: [
    { fa: "بیت‌پل", en: "BitPal", score: "۸٫۷", reg: "ثبت‌شده", iran: "دسترسی دارد" },
    { fa: "کوین‌گیت", en: "CoinGate", score: "۸٫۳", reg: "ثبت‌شده", iran: "اعلام نشده" },
    { fa: "ارزین", en: "Arzin", score: "۸٫۰", reg: "اعلام نشده", iran: "دسترسی دارد" },
    { fa: "توکنیا", en: "Tokenia", score: "۷٫۶", reg: "ثبت‌شده", iran: "دسترسی محدود" },
    { fa: "ساتوشی‌لند", en: "Satoshiland", score: "۷٫۲", reg: "اعلام نشده", iran: "اعلام نشده" },
  ],
  prop: [
    { fa: "فاندد پرو", en: "Funded Pro", score: "۸٫۵", reg: "سابقه پرداخت شفاف", iran: "دسترسی دارد" },
    { fa: "تریدر کپیتال", en: "Trader Capital", score: "۸٫۱", reg: "سابقه پرداخت شفاف", iran: "اعلام نشده" },
    { fa: "اسکیل‌فاند", en: "SkillFund", score: "۷٫۸", reg: "اعلام نشده", iran: "دسترسی محدود" },
    { fa: "چلنج‌پلاس", en: "ChallengePlus", score: "۷٫۴", reg: "اعلام نشده", iran: "اعلام نشده" },
    { fa: "پراپ‌وان", en: "PropOne", score: "۷٫۰", reg: "اعلام نشده", iran: "اعلام نشده" },
  ],
};

const NAV = ["پلتفرم‌ها", "بهترین‌ها", "مقایسه و ابزارها", "آموزش و اخبار", "دربارهٔ نیک‌تراست"];

function Index() {
  const [heroKind, setHeroKind] = useState<Kind>("broker");
  const [topKind, setTopKind] = useState<Kind>("broker");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-4">
          <a href="/" aria-label="نیک‌تراست"><img src={logo.url} alt="نیک‌تراست" className="h-8 w-auto" /></a>
          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a key={n} href="#" className="rounded-lg px-3 py-2 text-[15px] font-medium text-foreground hover:bg-accent">{n}</a>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <button aria-label="جستجو" className="rounded-lg p-2 text-muted-foreground hover:bg-accent"><Search className="size-5" /></button>
            <a href="#top" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex">پیدا کردن پلتفرم مناسب</a>
            <button aria-label="منو" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-lg p-2 lg:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-card px-4 pb-4 lg:hidden">
            <a href="#top" className="my-3 flex h-12 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">پیدا کردن پلتفرم مناسب</a>
            {NAV.map((n) => (
              <a key={n} href="#" className="flex h-[52px] items-center justify-between border-b border-border">{n}<ChevronLeft className="size-4 text-muted-foreground" /></a>
            ))}
          </div>
        )}
      </header>

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
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <label className="flex h-12 flex-1 items-center gap-2 rounded-xl border border-input bg-card px-4 focus-within:ring-2 focus-within:ring-ring">
                <Search className="size-5 text-muted-foreground" />
                <input className="w-full bg-transparent outline-none placeholder:text-muted-foreground" placeholder={`نام ${KINDS.find((k) => k.id === heroKind)!.label} را جستجو کنید…`} />
              </label>
              <button className="h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90">مقایسه پلتفرم‌ها</button>
            </div>
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
            { i: Sprout, t: "تازه‌کارم", d: "از کجا شروع کنم و به چه چیزی اعتماد کنم؟" },
            { i: Scale, t: "می‌خواهم مقایسه کنم", d: "۲ تا ۴ پلتفرم هم‌نوع را کنار هم ببینید." },
            { i: FileSearch, t: "پلتفرم خاصی را بررسی کنم", d: "خلاصهٔ تصمیم، مزایا، معایب و داده‌ها." },
          ].map(({ i: I, t, d }) => (
            <a key={t} href="#" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-tint text-primary"><I className="size-6" /></span>
              <span className="flex-1"><span className="block font-bold">{t}</span><span className="text-sm text-muted-foreground">{d}</span></span>
              <ChevronLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
            </a>
          ))}
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
            {TOP[topKind].map((p, idx) => (
              <li key={p.en} className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-4 gap-y-2 p-4 md:grid-cols-[2rem_3rem_1fr_9rem_9rem_6rem_auto]">
                <span className="num text-lg font-bold text-muted-foreground">{(idx + 1).toLocaleString("fa-IR")}</span>
                <span className="grid size-12 place-items-center rounded-lg border border-border bg-muted text-xs font-bold text-brand-deep"><bdi>{p.en.slice(0, 2)}</bdi></span>
                <span><span className="block font-bold">{p.fa}</span><bdi className="text-xs text-muted-foreground">{p.en}</bdi></span>
                <span className="num text-start md:order-last md:text-end"><span className="text-xl font-extrabold text-primary">{p.score}</span><span className="text-xs text-muted-foreground"> از ۱۰</span></span>
                <span className="col-span-4 flex flex-wrap gap-2 md:col-span-1"><Badge tone={p.reg === "اعلام نشده" ? "muted" : "success"}>{p.reg}</Badge></span>
                <span className="col-span-4 md:col-span-1"><Badge tone="muted"><Globe2 className="size-3" />{p.iran}</Badge></span>
                <a href="#" className="col-span-4 text-sm font-semibold text-primary hover:underline md:col-span-1">مشاهدهٔ بررسی</a>
              </li>
            ))}
          </ol>
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
          <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">روش ارزیابی کامل<ChevronLeft className="size-4" /></a>
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
            {[["آلفا مارکتس", "نوا اف‌اکس"], ["بیت‌پل", "کوین‌گیت"], ["فاندد پرو", "تریدر کپیتال"], ["مریدین", "اطلس ترید"]].map(([a, b]) => (
              <a key={a} href="#" className="min-w-[70%] snap-start rounded-xl border border-border bg-card p-5 hover:border-primary sm:min-w-[40%] md:min-w-0">
                <div className="flex items-center justify-between font-bold"><span>{a}</span><span className="rounded-md bg-tint px-2 py-0.5 text-xs text-primary">در برابر</span><span>{b}</span></div>
                <p className="mt-3 text-sm text-muted-foreground">هزینه، مجوز و دسترسی در یک جدول</p>
              </a>
            ))}
          </div>
        </section>

        {/* S7 Learn */}
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-brand-deep md:text-3xl">آموزش</h2>
            <a href="#" className="text-sm font-semibold text-primary">واژه‌نامه</a>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { c: "مبتدی", t: "اسپرد چیست و چرا مهم است؟", m: "۶ دقیقه" },
              { c: "امنیت", t: "چطور مجوز یک بروکر را استعلام کنیم؟", m: "۸ دقیقه" },
              { c: "پراپ", t: "قوانین چالش پراپ‌فرم‌ها به زبان ساده", m: "۷ دقیقه" },
            ].map((a) => (
              <a key={a.t} href="#" className="rounded-xl border border-border bg-card p-5 hover:border-primary">
                <span className="text-xs font-semibold text-success">{a.c}</span>
                <h3 className="mt-2 font-bold leading-7">{a.t}</h3>
                <p className="mt-3 text-xs text-muted-foreground">زمان مطالعه: {a.m}</p>
              </a>
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

      {/* Footer */}
      <footer className="bg-brand-deep text-primary-foreground">
        <div className="mx-auto max-w-[1200px] px-4 py-12">
          <div className="flex gap-3 rounded-xl border border-primary-foreground/20 p-4 text-sm leading-7">
            <Info className="mt-1 size-5 shrink-0" />
            <p><strong>هشدار ریسک:</strong> معامله در بازارهای مالی با ریسک از دست رفتن سرمایه همراه است. محتوای نیک‌تراست توصیهٔ سرمایه‌گذاری نیست.</p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div><img src={logoWhite.url} alt="نیک‌تراست" className="h-8 w-auto" /><p className="mt-3 text-sm text-primary-foreground/70">ارزیاب پلتفرم‌های مالی با اولویت اعتماد</p></div>
            {[
              ["پلتفرم‌ها", ["بروکرهای فارکس", "صرافی‌های ارز دیجیتال", "پراپ‌فرم‌ها"]],
              ["ابزارها", ["مقایسهٔ پلتفرم‌ها", "بهترین‌ها", "پلتفرم مناسب من"]],
              ["آموزش", ["مقالات", "واژه‌نامه", "اخبار"]],
              ["نیک‌تراست", ["روش ارزیابی", "افشای همکاری", "تماس با ما"]],
            ].map(([h, ls]) => (
              <div key={h as string}><h3 className="font-bold">{h}</h3>
                <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">{(ls as string[]).map((l) => <li key={l}><a href="#" className="hover:text-primary-foreground">{l}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <p className="mt-10 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">© ۱۴۰۵ نیک‌تراست. همکاری تجاری بر امتیاز و ترتیب فهرست‌ها اثری ندارد.</p>
        </div>
      </footer>
    </div>
  );
}

function Badge({ tone, children }: { tone: "success" | "muted"; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${tone === "success" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{children}</span>
  );
}
