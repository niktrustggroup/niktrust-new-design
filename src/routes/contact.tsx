import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Page, meta } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => meta("تماس با ما", "پرسش، گزارش خطا در داده‌ها یا درخواست همکاری را برای تیم نیک‌تراست بفرستید."),
  component: Contact,
});
function Contact() {
  const [sent, setSent] = useState(false);
  const f = "mt-1 w-full rounded-lg border border-input bg-card px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring";
  return (
    <Page crumbs={[{ label: "تماس" }]} title="تماس با ما" lead="برای گزارش خطا در داده‌ها، پرسش یا درخواست همکاری پیام بفرستید.">
      {sent ? <div className="flex max-w-xl items-center gap-3 rounded-xl bg-success/10 p-6 text-success"><CheckCircle2 />پیام شما ثبت شد. به‌زودی پاسخ می‌دهیم.</div> : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="max-w-xl space-y-4 rounded-xl border border-border bg-card p-6">
          <label className="block text-sm font-medium">نام<input required className={f} /></label>
          <label className="block text-sm font-medium">ایمیل<input required type="email" dir="ltr" className={f} /></label>
          <label className="block text-sm font-medium">موضوع<select className={f}><option>پرسش عمومی</option><option>گزارش خطا در داده</option><option>همکاری تجاری</option></select></label>
          <label className="block text-sm font-medium">پیام<textarea required rows={5} className={f} /></label>
          <button className="h-11 w-full rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90">ارسال پیام</button>
        </form>)}
    </Page>
  );
}
