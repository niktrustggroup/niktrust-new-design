import { useState } from 'react';
import { RotateCcw, Calculator as CalcIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TOOLS, calculate, type ToolSlug } from '@/lib/calculators';

export function Calculator({ initial = 'position-size', compact = false }: { initial?: ToolSlug; compact?: boolean }) {
 const [slug, setSlug] = useState<ToolSlug>(initial);
 const tool = TOOLS.find(t => t.slug === slug) ?? TOOLS[0];
 const defaults = () => Object.fromEntries([...tool.fields.map(([key,,value]) => [key, String(value)]), ['direction', '1']]);
 const [values, setValues] = useState<Record<string, string>>(defaults);
 const switchTool = (next: ToolSlug) => { const t = TOOLS.find(x => x.slug === next); if (!t) return; setSlug(next); setValues(Object.fromEntries([...t.fields.map(([k,,v]) => [k,String(v)]), ['direction','1']])); };
 const nums = Object.fromEntries(Object.entries(values).map(([k,v]) => [k,v.trim() === '' ? NaN : Number(v)]));
 const result = calculate(slug, nums);
 return <div className="overflow-hidden rounded-lg border border-border bg-card">
  <div role="tablist" aria-label="نوع ماشین‌حساب" className="flex flex-wrap gap-1 border-b border-border p-3">{TOOLS.map(t => <Button key={t.slug} role="tab" aria-selected={slug===t.slug} variant={slug===t.slug?'default':'ghost'} onClick={()=>switchTool(t.slug)}>{t.label}</Button>)}</div>
  <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[1fr_20rem]">
   <div><div className="mb-5 flex items-center justify-between"><h3 className="flex items-center gap-2 font-bold text-brand-deep"><CalcIcon className="size-5 text-primary" />{tool.label}</h3><Button size="icon" variant="ghost" title="بازنشانی ورودی‌ها" aria-label="بازنشانی ورودی‌ها" onClick={()=>setValues(defaults())}><RotateCcw /></Button></div>
    {slug==='profit-loss' && <div role="group" aria-label="جهت معامله" className="mb-4 flex gap-2">{([['1','خرید'],['-1','فروش']] as const).map(([v,l])=><Button key={v} variant={values['direction']===v?'default':'outline'} onClick={()=>setValues({...values,direction:v})}>{l}</Button>)}</div>}
    <div className="grid gap-4 sm:grid-cols-2">{tool.fields.map(([key,label])=><label key={key} className="block text-sm font-medium">{label}<input type="number" step="any" min={key==='rate'?undefined:0} value={values[key]??''} onChange={e=>setValues({...values,[key]:e.target.value})} className="num mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-start outline-none focus:ring-2 focus:ring-ring" dir="ltr" /></label>)}</div>
   </div>
   <div className="border-t border-border pt-5 lg:border-t-0 lg:border-s lg:ps-6 lg:pt-0"><p className="text-sm text-muted-foreground">نتیجهٔ محاسبه</p><output aria-live="polite" className="num mt-3 block text-4xl font-extrabold text-primary">{result===null?'—':result.toLocaleString('fa-IR',{maximumFractionDigits:5})}</output><p className="mt-2 text-sm font-medium">{tool.unit}</p>{slug==='position-size' && result!==null && <p className="mt-4 text-sm text-muted-foreground">مبلغ ریسک: {((nums['balance']??0)*(nums['risk']??0)/100).toLocaleString('fa-IR')} ارز حساب</p>}
    {!compact && <div className="mt-6 border-t border-border pt-4 text-sm leading-7"><p className="font-semibold">فرمول</p><p className="mt-1 text-muted-foreground">{tool.formula}</p></div>}
    <p className="mt-5 text-xs leading-6 text-muted-foreground">{tool.note}</p>
   </div>
  </div><p className="border-t border-border bg-muted px-5 py-3 text-xs leading-6 text-muted-foreground">محاسبهٔ آموزشی با ورودی‌های شما؛ نرخ‌ها بر حسب ارز حساب هستند، نه الزاماً دلار. شرایط نهایی را نزد بروکر بررسی کنید.</p>
 </div>;
}
