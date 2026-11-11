import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import logoWhite from "@/assets/niktrust-logotype-white.svg.asset.json";

const C = "hover:text-primary-foreground";
export function Footer() {
  return (
    <footer className="bg-brand-deep text-primary-foreground">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="flex gap-3 rounded-xl border border-primary-foreground/20 p-4 text-sm leading-7">
          <Info className="mt-1 size-5 shrink-0" />
          <p><strong>هشدار ریسک:</strong> معامله در بازارهای مالی با ریسک از دست رفتن سرمایه همراه است. محتوای نیک‌تراست توصیهٔ سرمایه‌گذاری نیست.</p>
        </div>
        <div className="mt-10 grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-5">
          <div><img src={logoWhite.url} alt="نیک‌تراست" className="h-8 w-auto" /><p className="mt-3 text-primary-foreground/70">ارزیاب پلتفرم‌های مالی با اولویت اعتماد</p></div>
          <div><h3 className="font-bold">پلتفرم‌ها</h3><ul className="mt-3 space-y-2 text-primary-foreground/70">
            <li><Link className={C} to="/platforms/$kind" params={{ kind: "broker" }}>بروکرهای فارکس</Link></li>
            <li><Link className={C} to="/platforms/$kind" params={{ kind: "exchange" }}>صرافی‌های ارز دیجیتال</Link></li>
            <li><Link className={C} to="/platforms/$kind" params={{ kind: "prop" }}>پراپ‌فرم‌ها</Link></li></ul></div>
          <div><h3 className="font-bold">ابزارها</h3><ul className="mt-3 space-y-2 text-primary-foreground/70">
            <li><Link className={C} to="/compare">مقایسهٔ پلتفرم‌ها</Link></li><li><Link className={C} to="/finder">انتخاب هدایت‌شده</Link></li><li><Link className={C} to="/tools">ماشین‌حساب‌های مالی</Link></li><li><Link className={C} to="/markets">نبض بازار</Link></li><li><Link className={C} to="/terminal">ترمینال تحلیلی</Link></li><li><Link className={C} to="/check">استعلام پلتفرم</Link></li><li><Link className={C} to="/alerts">هشدارها و تغییرات</Link></li></ul></div>
          <div><h3 className="font-bold">آموزش</h3><ul className="mt-3 space-y-2 text-primary-foreground/70">
            <li><Link className={C} to="/learn">مرکز آموزش</Link></li><li><Link className={C} to="/blog">مجلهٔ نیک‌تراست</Link></li><li><Link className={C} to="/news">اخبار و تحلیل</Link></li><li><Link className={C} to="/glossary">واژه‌نامهٔ مالی</Link></li><li><Link className={C} to="/faq">پرسش‌های متداول</Link></li></ul></div>
          <div><h3 className="font-bold">نیک‌تراست</h3><ul className="mt-3 space-y-2 text-primary-foreground/70">
            <li><Link className={C} to="/about">دربارهٔ ما</Link></li><li><Link className={C} to="/methodology">روش ارزیابی</Link></li>
            <li><Link className={C} to="/contact">تماس با ما</Link></li>
            <li><Link className={C} to="/about/team">تیم و بررسی‌کنندگان</Link></li>
            <li><Link className={C} to="/editorial-policy">سیاست تحریریه</Link></li>
            <li><Link className={C} to="/corrections">سیاست اصلاحات</Link></li>
            <li><Link className={C} to="/how-we-make-money">مدل درآمد</Link></li>
            <li><Link className={C} to="/partners">برنامهٔ همکاری</Link></li>
            <li><Link className={C} to="/membership">عضویت</Link></li>
            <li><Link className={C} to="/account">حساب کاربری</Link></li>
            <li><Link className={C} to="/legal/$page" params={{ page: "disclosure" }}>افشای همکاری</Link></li>
            <li><Link className={C} to="/legal/$page" params={{ page: "terms" }}>قوانین استفاده</Link></li>
            <li><Link className={C} to="/legal/$page" params={{ page: "privacy" }}>حریم خصوصی</Link></li>
            <li><Link className={C} to="/legal/$page" params={{ page: "risk" }}>هشدار ریسک</Link></li></ul></div>
        </div>
        <p className="mt-10 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">© ۱۴۰۵ نیک‌تراست. همکاری تجاری بر امتیاز و ترتیب فهرست‌ها اثری ندارد.</p>
      </div>
    </footer>
  );
}
