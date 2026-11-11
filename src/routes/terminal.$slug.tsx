import {createFileRoute,notFound} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {MarketTerminal} from '@/components/site/MarketPulse';
import {instrumentBySlug} from '@/lib/markets';
export const Route=createFileRoute('/terminal/$slug')({loader:({params})=>{if(params.slug!=='watchlist'&&!instrumentBySlug(params.slug))throw notFound();return params.slug;},head:({loaderData:s})=>meta(s==='watchlist'?'واچ‌لیست بازار':`ترمینال ${instrumentBySlug(s??'')?.name??'بازار'}`,'ترمینال تحلیلی بازار و فهرست نمادهای این نشست.'),component:Terminal});
function Terminal(){const slug=Route.useLoaderData();return <Page title={slug==='watchlist'?'واچ‌لیست این نشست':`ترمینال تحلیلی · ${instrumentBySlug(slug)?.name}`} lead="نمودار عمومی TradingView؛ داده‌ها ممکن است با تأخیر باشند."><MarketTerminal key={slug} slug={slug} watchlistOnly={slug==='watchlist'}/></Page>}
