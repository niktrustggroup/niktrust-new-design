import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Coins, Globe2, Headset } from "lucide-react";
import { Page, meta } from "@/components/site/ui";

const D = [
  { i: ShieldCheck, t: "امنیت و مجوز", w: "۴۰٪", d: "نهاد ناظر، تفکیک دارایی مشتری، سابقهٔ فعالیت و هشدارهای عمومی." },
  { i: Coins, t: "هزینه‌ها", w: "۲۵٪", d: "اسپرد، کمیسیون، کارمزد واریز و برداشت و هزینه‌های پنهان، همه با تاریخ." },
  { i: Globe2, t: "دسترسی از ایران", w: "۲۰٪", d: "امکان ثبت‌نام، روش‌های پرداخت و محدودیت‌های اعلام‌شده." },
  { i: Headset, t: "پشتیبانی و تجربه", w: "۱۵٪", d: "پشتیبانی فارسی، کیفیت پلتفرم معاملاتی و منابع آموزشی." },
];
export const Route = createFileRoute("/methodology")({
  head: () => meta("روش ارزیابی", "چهار محور ارزیابی نیک‌تراست، وزن هر محور و اصول بی‌طرفی و جدایی تجاری از تحریریه."),
  component: () => (
    <Page crumbs={[{ label: "روش ارزیابی" }]} title="روش ارزیابی" lead="هر امتیاز از چهار محور منتشرشده ساخته می‌شود. وزن‌ها پیشنهادی‌اند و پس از تأیید نهایی به‌روز می‌شوند.">
      <div className="grid gap-4 md:grid-cols-2">{D.map(({ i: I, t, w, d }) => (
        <div key={t} className="rounded-xl border border-border bg-card p-6"><div className="flex items-center justify-between"><I className="size-7 text-primary" /><span className="num rounded-md bg-tint px-2 py-1 text-sm font-bold text-primary">وزن {w}</span></div>
          <h2 className="mt-4 text-lg font-bold">{t}</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">{d}</p></div>))}</div>
      <section className="mt-10 grid gap-4 md:grid-cols-3 text-sm leading-7">
        {[["هر داده با تاریخ و منبع", "داده‌های حساس به زمان همیشه تاریخ آخرین بررسی و منبع دارند؛ نامعلوم = «اعلام نشده»."], ["جدایی تجاری از تحریریه", "همکاری تجاری بر امتیاز و ترتیب فهرست‌ها اثری ندارد و همیشه برچسب می‌خورد."], ["بازبینی دوره‌ای", "هر پروفایل دست‌کم هر سه ماه یک‌بار بازبینی می‌شود."]].map(([t, d]) => (
          <div key={t} className="rounded-xl bg-muted p-5"><p className="font-bold">{t}</p><p className="mt-2 text-muted-foreground">{d}</p></div>))}
      </section>
    </Page>
  ),
});
