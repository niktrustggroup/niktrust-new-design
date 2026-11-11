export const TOOLS = [
  { slug: 'position-size', label: 'حجم پوزیشن', unit: 'لات', fields: [ ['balance','موجودی حساب',10000], ['risk','ریسک هر معامله (٪)',1], ['stop','فاصلهٔ حد ضرر (پیپ)',50], ['pipValue','ارزش هر پیپ برای یک لات',10] ], formula: 'حجم = (موجودی × درصد ریسک ÷ ۱۰۰) ÷ (حد ضرر × ارزش پیپ هر لات)', note: 'ارزش پیپ بر حسب ارز حساب است. کارمزد، اسپرد و لغزش قیمت لحاظ نمی‌شود.' },
  { slug: 'pip-value', label: 'ارزش پیپ', unit: 'ارز حساب', fields: [ ['lots','حجم (لات)',1], ['contract','اندازهٔ قرارداد',100000], ['pip','اندازهٔ پیپ',0.0001], ['conversion','نرخ تبدیل ارز دوم به ارز حساب',1] ], formula: 'ارزش پیپ = حجم × اندازهٔ قرارداد × اندازهٔ پیپ × نرخ تبدیل', note: 'برای جفت‌های ین معمولاً اندازهٔ پیپ ۰٫۰۱ است؛ اندازهٔ قرارداد را از مشخصات نماد بررسی کنید.' },
  { slug: 'margin', label: 'مارجین موردنیاز', unit: 'ارز حساب', fields: [ ['lots','حجم (لات)',1], ['contract','اندازهٔ قرارداد',100000], ['price','قیمت',1.1], ['leverage','اهرم (۱ به X)',100], ['conversion','نرخ تبدیل به ارز حساب',1] ], formula: 'مارجین = حجم × اندازهٔ قرارداد × قیمت × نرخ تبدیل ÷ اهرم', note: 'قواعد مارجین نزد هر بروکر و برای هر نماد متفاوت است؛ مارجین پلکانی لحاظ نمی‌شود.' },
  { slug: 'profit-loss', label: 'سود و زیان', unit: 'ارز حساب', fields: [ ['entry','قیمت ورود',1.1], ['exit','قیمت خروج',1.105], ['lots','حجم (لات)',1], ['contract','اندازهٔ قرارداد',100000], ['conversion','نرخ تبدیل به ارز حساب',1] ], formula: 'سود و زیان = (خروج − ورود) × جهت × حجم × قرارداد × نرخ تبدیل', note: 'جهت خرید ۱ و فروش ۱− است. کارمزد، اسپرد، سواپ و لغزش لحاظ نمی‌شود.' },
  { slug: 'leverage', label: 'اهرم مؤثر', unit: 'برابر', fields: [ ['lots','حجم (لات)',1], ['contract','اندازهٔ قرارداد',100000], ['price','قیمت',1.1], ['conversion','نرخ تبدیل به ارز حساب',1], ['equity','موجودی خالص حساب (اکوئیتی)',11000] ], formula: 'اهرم مؤثر = ارزش اسمی پوزیشن ÷ موجودی خالص حساب', note: 'این اهرم واقعی پوزیشن نسبت به موجودی خالص است، نه سقف اهرمی که بروکر اعلام می‌کند.' },
  { slug: 'swap', label: 'سواپ (شب‌مانی)', unit: 'ارز حساب', fields: [ ['lots','حجم (لات)',1], ['rate','نرخ سواپ هر لات در هر شب',-5], ['nights','تعداد شب‌ها',3] ], formula: 'سواپ = حجم × نرخ سواپ هر لات در هر شب × تعداد شب‌ها', note: 'نرخ را بر حسب ارز حساب از بروکر بگیرید. شب سه‌برابر را سه شب بشمارید؛ عدد منفی هزینه است.' },
] as const;
export type ToolSlug = (typeof TOOLS)[number]['slug'];
export function calculate(slug: ToolSlug, v: Record<string, number>): number | null {
  if (Object.values(v).some(x => !Number.isFinite(x))) return null;
  const required = TOOLS.find(t => t.slug === slug)?.fields ?? [];
  if (required.some(([key]) => typeof v[key] !== 'number' || (key !== 'rate' && v[key] <= 0))) return null;
  switch (slug) {
    case 'position-size': return v.risk > 100 ? null : v.balance * v.risk / 100 / (v.stop * v.pipValue);
    case 'pip-value': return v.lots * v.contract * v.pip * v.conversion;
    case 'margin': return v.lots * v.contract * v.price * v.conversion / v.leverage;
    case 'profit-loss': return (v.exit - v.entry) * (v.direction === -1 ? -1 : 1) * v.lots * v.contract * v.conversion;
    case 'leverage': return v.lots * v.contract * v.price * v.conversion / v.equity;
    case 'swap': return v.lots * v.rate * v.nights;
  }
}
