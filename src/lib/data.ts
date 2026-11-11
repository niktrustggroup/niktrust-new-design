export type Kind = "broker" | "exchange" | "prop";
export const KINDS: { id: Kind; label: string; plural: string; intro: string }[] = [
  { id: "broker", label: "بروکر", plural: "بروکرهای فارکس", intro: "بروکرهای فارکس را بر اساس مجوز، هزینه و دسترسی از ایران مقایسه کنید." },
  { id: "exchange", label: "صرافی", plural: "صرافی‌های ارز دیجیتال", intro: "صرافی‌های ارز دیجیتال را بر اساس امنیت، کارمزد و نقدشوندگی ببینید." },
  { id: "prop", label: "پراپ‌فرم", plural: "پراپ‌فرم‌ها", intro: "پراپ‌فرم‌ها را بر اساس قوانین چالش، سابقهٔ پرداخت و هزینه مقایسه کنید." },
];
export const kindOf = (k: string) => KINDS.find((x) => x.id === k);

export type Platform = {
  slug: string; kind: Kind; fa: string; en: string; score: number;
  reg: string; iran: string; persianSupport: boolean; minDeposit: string; fee: string;
  founded: string; goodFor: string[]; caution: string[]; pros: string[]; cons: string[];
  updated: string;
};

const P = (slug: string, kind: Kind, fa: string, en: string, score: number, reg: string, iran: string, minDeposit: string, fee: string, founded: string, persianSupport = true): Platform => ({
  slug, kind, fa, en, score, reg, iran, persianSupport, minDeposit, fee, founded,
  goodFor: kind === "broker" ? ["معامله‌گران فعال فارکس", "کسانی که اسپرد پایین می‌خواهند"] : kind === "exchange" ? ["خرید و نگهداری رمزارز", "معامله اسپات"] : ["تریدرهای باتجربه با سرمایهٔ کم", "معامله‌گران منضبط"],
  caution: ["شرایط برداشت را پیش از واریز بخوانید", "دسترسی از ایران ممکن است تغییر کند"],
  pros: ["ساختار هزینهٔ شفاف", "پشتیبانی پاسخ‌گو", "پلتفرم معاملاتی پایدار"],
  cons: ["محدودیت در برخی روش‌های واریز", "آموزش فارسی محدود"],
  updated: "۲۰ آبان ۱۴۰۵",
});

// نمونه داده — تا اتصال پایگاه داده جایگزین می‌شود
export const PLATFORMS: Platform[] = [
  P("alpha-markets", "broker", "آلفا مارکتس", "Alpha Markets", 8.9, "دارای مجوز", "اعلام نشده", "۱۰۰ دلار", "اسپرد از ۰٫۱ پیپ", "۱۳۹۰"),
  P("nova-fx", "broker", "نوا اف‌اکس", "Nova FX", 8.6, "دارای مجوز", "دسترسی محدود", "۵۰ دلار", "اسپرد از ۰٫۴ پیپ", "۱۳۹۲"),
  P("meridian", "broker", "مریدین", "Meridian", 8.2, "دارای مجوز", "اعلام نشده", "۲۰۰ دلار", "کمیسیون ۳٫۵ دلار", "۱۳۸۸", false),
  P("atlas-trade", "broker", "اطلس ترید", "Atlas Trade", 7.9, "مجوز فراساحلی", "دسترسی دارد", "۱۰ دلار", "اسپرد از ۱ پیپ", "۱۳۹۵"),
  P("quanta", "broker", "کوانتا", "Quanta", 7.5, "مجوز فراساحلی", "اعلام نشده", "۲۵ دلار", "اعلام نشده", "۱۳۹۷"),
  P("bitpal", "exchange", "بیت‌پل", "BitPal", 8.7, "ثبت‌شده", "دسترسی دارد", "۱ دلار", "کارمزد ۰٫۱٪", "۱۳۹۶"),
  P("coingate", "exchange", "کوین‌گیت", "CoinGate", 8.3, "ثبت‌شده", "اعلام نشده", "۱۰ دلار", "کارمزد ۰٫۲٪", "۱۳۹۴", false),
  P("arzin", "exchange", "ارزین", "Arzin", 8.0, "اعلام نشده", "دسترسی دارد", "۵۰۰ هزار تومان", "کارمزد ۰٫۳۵٪", "۱۳۹۸"),
  P("tokenia", "exchange", "توکنیا", "Tokenia", 7.6, "ثبت‌شده", "دسترسی محدود", "۵ دلار", "کارمزد ۰٫۱۵٪", "۱۳۹۹"),
  P("satoshiland", "exchange", "ساتوشی‌لند", "Satoshiland", 7.2, "اعلام نشده", "اعلام نشده", "اعلام نشده", "کارمزد ۰٫۴٪", "۱۴۰۰"),
  P("funded-pro", "prop", "فاندد پرو", "Funded Pro", 8.5, "سابقه پرداخت شفاف", "دسترسی دارد", "چالش از ۹۹ دلار", "تقسیم سود ۸۰٪", "۱۳۹۹"),
  P("trader-capital", "prop", "تریدر کپیتال", "Trader Capital", 8.1, "سابقه پرداخت شفاف", "اعلام نشده", "چالش از ۱۴۹ دلار", "تقسیم سود ۸۵٪", "۱۴۰۰", false),
  P("skillfund", "prop", "اسکیل‌فاند", "SkillFund", 7.8, "اعلام نشده", "دسترسی محدود", "چالش از ۷۹ دلار", "تقسیم سود ۷۵٪", "۱۴۰۱"),
  P("challengeplus", "prop", "چلنج‌پلاس", "ChallengePlus", 7.4, "اعلام نشده", "اعلام نشده", "چالش از ۵۹ دلار", "تقسیم سود ۷۰٪", "۱۴۰۱"),
  P("propone", "prop", "پراپ‌وان", "PropOne", 7.0, "اعلام نشده", "اعلام نشده", "چالش از ۴۹ دلار", "تقسیم سود ۸۰٪", "۱۴۰۲"),
];
export const byKind = (k: Kind) => PLATFORMS.filter((p) => p.kind === k).sort((a, b) => b.score - a.score);
export const bySlug = (s: string) => PLATFORMS.find((p) => p.slug === s);
export const fa = (n: number | string) => (typeof n === "number" ? n.toLocaleString("fa-IR") : n.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d] ?? d));

export const ARTICLES = [
  { slug: "what-is-spread", cat: "مبتدی", title: "اسپرد چیست و چرا مهم است؟", min: "۶", excerpt: "اسپرد تفاوت قیمت خرید و فروش است و مستقیماً هزینهٔ هر معامله را تعیین می‌کند." },
  { slug: "check-broker-license", cat: "امنیت", title: "چطور مجوز یک بروکر را استعلام کنیم؟", min: "۸", excerpt: "گام‌به‌گام تا استعلام شمارهٔ مجوز در سایت نهاد ناظر." },
  { slug: "prop-challenge-rules", cat: "پراپ", title: "قوانین چالش پراپ‌فرم‌ها به زبان ساده", min: "۷", excerpt: "حد ضرر روزانه، حد ضرر کل و هدف سود را بشناسید." },
  { slug: "exchange-security", cat: "امنیت", title: "امنیت حساب صرافی: ۷ کار ضروری", min: "۵", excerpt: "از تأیید دومرحله‌ای تا لیست سفید آدرس برداشت." },
  { slug: "ecn-vs-standard", cat: "حرفه‌ای", title: "حساب ECN یا استاندارد؟", min: "۹", excerpt: "مقایسهٔ ساختار هزینه و اجرای سفارش در دو نوع حساب." },
  { slug: "first-deposit", cat: "مبتدی", title: "پیش از اولین واریز چه بدانیم؟", min: "۴", excerpt: "با مبلغ کم شروع کنید و برداشت آزمایشی انجام دهید." },
];
export const GLOSSARY = [
  ["اسپرد", "تفاوت قیمت خرید و فروش یک دارایی."],
  ["لوریج (اهرم)", "امکان معامله با حجمی بیشتر از سرمایهٔ واقعی."],
  ["رگولاتوری", "نهاد ناظری که به پلتفرم مجوز فعالیت می‌دهد."],
  ["اسلیپیج", "تفاوت قیمت درخواستی با قیمت اجراشدهٔ سفارش."],
  ["تقسیم سود", "سهم تریدر از سود در حساب پراپ‌فرم."],
];
