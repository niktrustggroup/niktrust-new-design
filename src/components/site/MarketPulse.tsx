import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ExternalLink, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INSTRUMENTS, MARKET_CATEGORIES, instrumentBySlug } from '@/lib/markets';

export function TradingChart({ symbol, interval='D', style='1', study='', drawings=true, height=440 }: {symbol:string; interval?:string; style?:string; study?:string; drawings?:boolean; height?:number}) {
 const ref = useRef<HTMLDivElement>(null);
 const [status,setStatus] = useState('loading');
 useEffect(()=>{
  const host=ref.current; if(!host) return;
  host.replaceChildren(); setStatus('loading');
  const mount=document.createElement('div'); mount.className='tradingview-widget-container__widget'; host.append(mount);
  const script=document.createElement('script'); script.src='https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'; script.async=true;
  script.textContent=JSON.stringify({ autosize:true,symbol,interval,timezone:'Etc/UTC',theme:'light',style,locale:'en',allow_symbol_change:false,hide_side_toolbar:!drawings,withdateranges:true,studies:study?[study]:[],support_host:'https://www.tradingview.com' });
  script.onerror=()=>setStatus('error'); host.append(script);
  const observer=new MutationObserver(()=>{ const iframe=host.querySelector('iframe'); if(iframe) { iframe.title=`نمودار ${symbol}`; iframe.addEventListener('load',()=>setStatus('ready'),{once:true}); setStatus('ready'); } }); observer.observe(host,{childList:true,subtree:true});
  const timeout=window.setTimeout(()=>{if(!host.querySelector('iframe'))setStatus('error');},20000);
  return()=>{ observer.disconnect(); window.clearTimeout(timeout); host.replaceChildren(); };
 },[symbol,interval,style,study,drawings]);
 return <div className="relative w-full overflow-hidden border-y border-border bg-card" style={{height}}>
  <div ref={ref} className="tradingview-widget-container h-full w-full" />
  {status!=='ready' && <div className="absolute inset-0 grid place-items-center bg-card text-sm text-muted-foreground" role="status">{status==='loading'?'دریافت نمودار بازار…':<span className="text-center leading-7">نمودار در دسترس نیست.<br/><a className="text-primary underline" href={`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(symbol)}`} target="_blank" rel="noopener noreferrer">مشاهده در TradingView</a></span>}</div>}
 </div>;
}
export function MarketPulse() {
 const [category,setCategory]=useState('crypto'); const [slug,setSlug]=useState('btcusd');
 const instrument=instrumentBySlug(slug)??INSTRUMENTS[3];
 const choose=(cat:string)=>{setCategory(cat); const first=INSTRUMENTS.find(x=>x.category===cat); if(first)setSlug(first.slug);};
 if (!instrument) return null;
 return <div>
  <div className="mb-4 flex flex-wrap items-center justify-between gap-4"><div role="tablist" aria-label="بازار">{MARKET_CATEGORIES.filter(x=>x.id!=='all').map(c=><Button key={c.id} role="tab" aria-selected={category===c.id} variant={category===c.id?'default':'ghost'} onClick={()=>choose(c.id)}>{c.label}</Button>)}</div><label className="flex items-center gap-2 text-sm">نماد<select aria-label="نماد نمودار" value={slug} onChange={e=>{setSlug(e.target.value);setCategory(instrumentBySlug(e.target.value)?.category??'crypto');}} className="h-10 max-w-52 rounded-md border border-input bg-card px-3">{INSTRUMENTS.map(x=><option key={x.slug} value={x.slug}>{x.name}</option>)}</select></label></div>
  <TradingChart symbol={instrument.symbol}/><MarketAttribution />
 </div>;
}
export function MarketAttribution(){return <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-6 text-muted-foreground"><a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary">داده و نمودار: TradingView<ExternalLink className="size-3"/></a>داده‌ها ممکن است با تأخیر باشند؛ نرخ تومان نیست و توصیهٔ معاملاتی نیست.</p>;}

export function MarketDirectory({ category='all' }: {category?:string}){
 const [query,setQuery]=useState('');
 const items=INSTRUMENTS.filter(x=>(category==='all'||x.category===category)&&`${x.name} ${x.short} ${x.symbol}`.toLowerCase().includes(query.toLowerCase()));
 return <>
  <nav aria-label="دسته‌های بازار" className="flex flex-wrap gap-2">{MARKET_CATEGORIES.map(c=><Button key={c.id} asChild variant={category===c.id?'default':'outline'}><Link to={c.id==='all'?'/markets':'/markets/$slug'} params={{slug:c.id}}>{c.label}</Link></Button>)}<Button variant="outline" asChild><Link to="/terminal/$slug" params={{slug:'watchlist'}}><Star />واچ‌لیست این نشست</Link></Button></nav>
  <label className="mt-6 block max-w-lg text-sm font-medium">جستجوی ابزار مالی<input aria-label="جستجوی ابزار مالی" value={query} onChange={e=>setQuery(e.target.value)} placeholder="نام یا نماد" className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 outline-none focus:ring-2 focus:ring-ring" /></label>
  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(x=><article key={x.slug} className="rounded-lg border border-border bg-card p-5"><bdi className="num text-lg font-bold text-primary">{x.short}</bdi><h2 className="mt-2 font-semibold">{x.name}</h2><p className="mt-2 text-xs text-muted-foreground">قیمت و تغییر در نمودار تأمین‌کننده</p><div className="mt-4 flex flex-wrap gap-2"><Button asChild variant="outline" size="sm"><Link to="/markets/$slug" params={{slug:x.slug}}>جزئیات</Link></Button><Button asChild size="sm"><Link to="/terminal/$slug" params={{slug:x.slug}}>ترمینال</Link></Button></div></article>)}</div>
  {!items.length&&<p className="py-10 text-center text-muted-foreground">نمادی پیدا نشد.</p>}
 </>;
}

export function MarketTerminal({slug,watchlistOnly=false}:{slug:string;watchlistOnly?:boolean}){
 const [selected,setSelected]=useState(instrumentBySlug(slug)?.slug??'eurusd'); const [interval,setInterval]=useState('D'); const [style,setStyle]=useState('1'); const [study,setStudy]=useState(''); const [drawings,setDrawings]=useState(true); const [watchlist,setWatchlist]=useState<string[]>([]);
 const x=instrumentBySlug(selected)??INSTRUMENTS[0];
 if (!x) return null;
 const toggle=(s:string)=>setWatchlist(prev=>prev.includes(s)?prev.filter(k=>k!==s):[...prev,s]);
 return <>
  <div className="mb-6 flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/markets">مرکز بازار</Link></Button><Button variant="outline" onClick={()=>toggle(selected)}><Star className={watchlist.includes(selected)?'fill-primary text-primary':''}/>{watchlist.includes(selected)?'حذف از واچ‌لیست':'افزودن نماد فعلی'}</Button></div>
  <div className="flex flex-wrap items-end gap-3 border-y border-border bg-muted py-4">
   <label className="text-xs">نماد<select aria-label="نماد" value={selected} onChange={e=>setSelected(e.target.value)} className="mt-1 block h-10 rounded-md border border-input bg-card px-3">{INSTRUMENTS.map(i=><option key={i.slug} value={i.slug}>{i.name}</option>)}</select></label>
   <label className="text-xs">بازهٔ زمانی<select aria-label="بازهٔ زمانی" value={interval} onChange={e=>setInterval(e.target.value)} className="mt-1 block h-10 rounded-md border border-input bg-card px-3">{[['15','۱۵ دقیقه'],['60','۱ ساعت'],['240','۴ ساعت'],['D','روزانه'],['W','هفتگی']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
   <label className="text-xs">نوع نمودار<select aria-label="نوع نمودار" value={style} onChange={e=>setStyle(e.target.value)} className="mt-1 block h-10 rounded-md border border-input bg-card px-3">{[['1','کندل'],['3','خطی'],['0','میله‌ای']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
   <label className="text-xs">اندیکاتور<select aria-label="اندیکاتور" value={study} onChange={e=>setStudy(e.target.value)} className="mt-1 block h-10 rounded-md border border-input bg-card px-3">{[['','بدون اندیکاتور'],['RSI@tv-basicstudies','RSI'],['MACD@tv-basicstudies','MACD'],['MASimple@tv-basicstudies','میانگین متحرک']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
   <label className="flex h-10 items-center gap-2 text-xs"><input type="checkbox" checked={drawings} onChange={e=>setDrawings(e.target.checked)} className="accent-primary"/>ابزار ترسیم</label>
  </div>
  {!watchlistOnly&&<TradingChart symbol={x.symbol} interval={interval} style={style} study={study} drawings={drawings} height={600}/>}<MarketAttribution/>
  <div className="mt-8 grid gap-8 md:grid-cols-2"><section><h2 className="text-lg font-bold text-brand-deep">اطلاعات نماد</h2><dl className="mt-4 divide-y divide-border text-sm">{[['نام',x.name],['نماد',x.symbol],['دسته',MARKET_CATEGORIES.find(c=>c.id===x.category)?.label??''],['قیمت و تغییر','در نمودار تأمین‌کننده'],['زمان و وضعیت بازار','مستقل دریافت نشده؛ تأخیر احتمالی']].map(([k,v])=><div key={k} className="flex flex-wrap justify-between gap-3 py-3"><dt className="text-muted-foreground">{k}</dt><dd><bdi>{v}</bdi></dd></div>)}</dl></section><section><h2 className="text-lg font-bold text-brand-deep">واچ‌لیست این نشست</h2><p className="mt-2 text-xs text-muted-foreground">با خروج از این صفحه پاک می‌شود؛ ذخیرهٔ حساب فعال نیست.</p>{watchlist.length?<ul className="mt-3 divide-y divide-border">{watchlist.map(s=>{const i=instrumentBySlug(s);return <li key={s} className="flex items-center justify-between py-3"><Button variant="link" onClick={()=>setSelected(s)}>{i?.name}</Button><Button size="icon" variant="ghost" aria-label={`حذف ${i?.name}`} onClick={()=>toggle(s)}><X/></Button></li>})}</ul>:<p className="py-6 text-sm text-muted-foreground">نمادی انتخاب نشده است.</p>}</section></div>
 </>;
}
