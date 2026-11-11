import {createFileRoute,notFound} from '@tanstack/react-router';
import {TOOLS} from '@/lib/calculators';
import {Page,meta} from '@/components/site/ui';
import {Calculator} from '@/components/site/Calculator';
export const Route=createFileRoute('/tools/$slug')({loader:({params})=>{const t=TOOLS.find(x=>x.slug===params.slug);if(!t)throw notFound();return t;},head:({loaderData:t})=>meta(t?`ماشین‌حساب ${t.label}`:'ماشین‌حساب در دسترس نیست',t?.note??'ابزارهای مالی نیک‌تراست'),component:Tool});
function Tool(){const t=Route.useLoaderData();return <Page title={`ماشین‌حساب ${t.label}`} lead={t.note}><Calculator key={t.slug} initial={t.slug}/></Page>}
