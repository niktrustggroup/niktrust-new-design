import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Menu, X, ChevronLeft, ChevronDown } from "lucide-react";
import logo from "@/assets/niktrust-logotype.svg.asset.json";
import { Button } from "@/components/ui/button";

type L = { label: string; to: string; params?: Record<string, string> };
const MENUS: { title: string; intro: string; links: L[] }[] = [
  { title: "پلتفرم‌ها", intro: "بروکر، صرافی و پراپ‌فرم را با معیارهای منتشرشده ببینید.", links: [
    { label: "بروکرهای فارکس", to: "/platforms/$kind", params: { kind: "broker" } },
    { label: "صرافی‌های ارز دیجیتال", to: "/platforms/$kind", params: { kind: "exchange" } },
     { label: "پراپ‌فرم‌ها", to: "/platforms/$kind", params: { kind: "prop" } }, { label: "استعلام پلتفرم", to: "/check" }, { label: "هشدارها و تغییرات", to: "/alerts" }, { label: "گزارش مشکل", to: "/alerts/report" } ] },
  { title: "بهترین‌ها", intro: "امتیاز بالاتر به معنای مناسب بودن برای همه نیست.", links: [{ label: "همهٔ فهرست‌های برتر", to: "/best" }] },
   { title: "مقایسه و ابزارها", intro: "مقایسه، محاسبه و تحلیل با معیارهای شفاف.", links: [{ label: "مقایسهٔ پلتفرم‌ها", to: "/compare" }, { label: "انتخاب هدایت‌شده", to: "/finder" }, { label: "ماشین‌حساب‌های مالی", to: "/tools" }, { label: "نبض بازار", to: "/markets" }, { label: "ترمینال تحلیلی", to: "/terminal" }, { label: "جستجو", to: "/search" }] },
   { title: "آموزش و اخبار", intro: "از مفاهیم پایه تا نکات حرفه‌ای.", links: [{ label: "مرکز آموزش", to: "/learn" }, { label: "مجلهٔ نیک‌تراست", to: "/blog" }, { label: "اخبار و تحلیل", to: "/news" }, { label: "واژه‌نامهٔ مالی", to: "/glossary" }, { label: "پرسش‌های متداول", to: "/faq" }] },
  { title: "دربارهٔ نیک‌تراست", intro: "چه کسی هستیم و چگونه ارزیابی می‌کنیم.", links: [
    { label: "دربارهٔ ما", to: "/about" }, { label: "روش ارزیابی", to: "/methodology" },
     { label: "افشای همکاری", to: "/legal/$page", params: { page: "disclosure" } }, { label: "سیاست تحریریه", to: "/editorial-policy" }, { label: "سیاست اصلاحات", to: "/corrections" }, { label: "مدل درآمد", to: "/how-we-make-money" }, { label: "تیم و بررسی‌کنندگان", to: "/about/team" }, { label: "برنامهٔ همکاری", to: "/partners" }, { label: "عضویت", to: "/membership" }, { label: "حساب کاربری", to: "/account" }, { label: "تماس", to: "/contact" } ] },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const active = menu === null ? undefined : MENUS[menu];
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card" onMouseLeave={() => setMenu(null)}>
      <div className="relative mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-4">
        <Link to="/" aria-label="نیک‌تراست"><img src={logo.url} alt="نیک‌تراست" className="h-8 w-auto" /></Link>
        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {MENUS.map((m, i) => (
             <Button variant="ghost" key={m.title} aria-expanded={menu === i} onMouseEnter={() => setMenu(i)} onClick={() => setMenu(menu === i ? null : i)}
               className="gap-1 px-3 text-[15px] font-medium">{m.title}<ChevronDown className="size-3.5 text-muted-foreground" /></Button>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <Link to="/search" aria-label="جستجو" className="rounded-lg p-2 text-muted-foreground hover:bg-accent"><Search className="size-5" /></Link>
           <Button asChild className="hidden sm:inline-flex"><Link to="/finder">پیدا کردن پلتفرم مناسب</Link></Button>
           <Button variant="ghost" size="icon" aria-label="منو" aria-expanded={open} onClick={() => setOpen(!open)} className="lg:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
        </div>
        {active && (
          <div className="absolute inset-x-4 top-full mt-2 hidden grid-cols-12 overflow-hidden rounded-xl border border-border bg-card animate-in fade-in slide-in-from-top-1 lg:grid">
            <div className="col-span-4 bg-tint p-6"><p className="font-bold text-brand-deep">{active.title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{active.intro}</p></div>
            <div className="col-span-8 grid grid-cols-2 gap-1 p-6">
              {active.links.map((l) => (
                <Link key={l.label} to={l.to as never} params={l.params as never} onClick={() => setMenu(null)} className="rounded-lg px-3 py-2 text-[15px] hover:bg-accent">{l.label}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-card px-4 pb-4 lg:hidden">
           <Button asChild className="my-3 flex h-12"><Link to="/finder" onClick={() => setOpen(false)}>پیدا کردن پلتفرم مناسب</Link></Button>
          {MENUS.map((m) => (
            <details key={m.title} className="border-b border-border">
              <summary className="flex h-[52px] cursor-pointer list-none items-center justify-between font-medium">{m.title}<ChevronLeft className="size-4 text-muted-foreground" /></summary>
              <div className="pb-3">{m.links.map((l) => <Link key={l.label} to={l.to as never} params={l.params as never} onClick={() => setOpen(false)} className="block py-2 ps-3 text-sm text-muted-foreground">{l.label}</Link>)}</div>
            </details>
          ))}
        </div>
      )}
    </header>
  );
}
