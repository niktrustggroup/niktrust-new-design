import {createFileRoute,notFound} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {MarketDirectory,MarketTerminal} from '@/components/site/MarketPulse';
import {MARKET_CATEGORIES,instrumentBySlug} from '@/lib/markets';
export const Route=createFileRoute('/markets/$slug')({loader:({params})=>{const category=MARKET_CATEGORIES.find(c=>c.id===params.slug); const instrument=instrumentBySlug(params.slug);if(!category&&!instrument)throw notFound();return {category,instrument,slug:params.slug};},head:({loaderData:d})=>meta(d?.instrument?.name??`بازار ${d?.category?.label??'مالی'}`,'نمودار، اطلاعات نماد و ابزار تحلیل عمومی؛ بدون اجرای معامله.'),component:Market});
function Market(){const {category,instrument,slug}=Route.useLoaderData();return <Page title={instrument?.name??`بازار ${category?.label}`} lead="نمودار و اطلاعات تأمین‌کننده؛ بدون سفارش یا توصیهٔ معاملاتی.">{category?<MarketDirectory key={slug} category={slug}/>:<MarketTerminal key={slug} slug={slug}/>}</Page>}
