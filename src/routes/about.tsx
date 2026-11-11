import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, meta } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => meta("دربارهٔ نیک‌تراست", "نیک‌تراست مرجع مستقل بررسی و مقایسهٔ پلتفرم‌های مالی برای فارسی‌زبانان است."),
  component: () => (
    <Page crumbs={[{ label: "دربارهٔ ما" }]} title="دربارهٔ نیک‌تراست" lead="مرجع مستقل بررسی و مقایسهٔ پلتفرم‌های مالی برای فارسی‌زبانان؛ ارزیاب پلتفرم‌های مالی با اولویت اعتماد.">
      <div className="grid gap-4 md:grid-cols-3">
        {[["اطلاعات می‌دهیم", "داده‌های تاریخ‌دار و منبع‌دار دربارهٔ هر پلتفرم."], ["مقایسه می‌کنیم", "با معیارهای منتشرشده و یکسان برای همه."], ["تصمیم با شماست", "ما بروکر، فروشنده یا سیگنال‌دهنده نیستیم."]].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-border bg-card p-6"><p className="text-lg font-bold text-brand-deep">{t}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{d}</p></div>))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/methodology" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">روش ارزیابی</Link>
        <Link to="/legal/$page" params={{ page: "disclosure" }} className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold">افشای همکاری</Link>
      </div>
    </Page>
  ),
});
