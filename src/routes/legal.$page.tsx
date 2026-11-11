import { createFileRoute, notFound } from "@tanstack/react-router";
import { Page, meta } from "@/components/site/ui";

const PAGES: Record<string, { t: string; d: string; body: string[] }> = {
  disclosure: { t: "افشای همکاری تجاری", d: "نیک‌تراست چگونه درآمد دارد و چرا این درآمد بر امتیازها اثر ندارد.", body: ["نیک‌تراست از همکاری تجاری (CPA، CPL، RevShare)، تبلیغ و دوره‌های آموزشی درآمد دارد.", "لینک‌های همکاری همیشه زیر خط‌چین و با برچسب «ناحیهٔ همکاری» نمایش داده می‌شوند.", "همکاری تجاری بر امتیاز، ترتیب فهرست‌ها و متن بررسی هیچ اثری ندارد."] },
  terms: { t: "قوانین استفاده", d: "شرایط استفاده از وب‌سایت نیک‌تراست.", body: ["محتوای نیک‌تراست صرفاً اطلاع‌رسانی است و توصیهٔ سرمایه‌گذاری محسوب نمی‌شود.", "استفاده از محتوا با ذکر منبع مجاز است."] },
  privacy: { t: "حریم خصوصی", d: "نحوهٔ جمع‌آوری و استفاده از اطلاعات کاربران.", body: ["ما فقط اطلاعات لازم برای پاسخ به پیام‌ها و بهبود سایت را نگهداری می‌کنیم.", "اطلاعات شما به هیچ پلتفرمی فروخته نمی‌شود."] },
  risk: { t: "هشدار ریسک", d: "ریسک‌های معامله در بازارهای مالی.", body: ["معامله در بازارهای مالی، به‌ویژه با اهرم، با ریسک از دست رفتن تمام سرمایه همراه است.", "مجوز داشتن یک پلتفرم تضمین درستی یا امنیت کامل آن نیست."] },
};
export const Route = createFileRoute("/legal/$page")({
  loader: ({ params }) => { const p = PAGES[params.page]; if (!p) throw notFound(); return p; },
  head: ({ loaderData: p }) => p ? meta(p.t, p.d) : { meta: [{ title: "یافت نشد | نیک‌تراست" }, { name: "robots", content: "noindex" }] },
  component: () => { const p = Route.useLoaderData(); return (
    <Page crumbs={[{ label: "حقوقی" }, { label: p.t }]} title={p.t} lead={p.d}>
      <div className="max-w-3xl space-y-4 text-[17px] leading-9">{p.body.map((b) => <p key={b}>{b}</p>)}<p className="text-sm text-muted-foreground">متن نمونه — نسخهٔ حقوقی نهایی جایگزین می‌شود.</p></div>
    </Page>); },
});
