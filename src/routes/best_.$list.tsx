import {createFileRoute,notFound,Link} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {Button} from '@/components/ui/button';
import {SPECIAL_LISTS} from '@/lib/special-lists';
export const Route=createFileRoute('/best_/$list')({loader:({params})=>{const list=SPECIAL_LISTS.find(x=>x.slug===params.list);if(!list)throw notFound();return list;},head:({loaderData:l})=>meta(l?.title??'فهرست تخصصی','فهرست بر اساس معیارهای مشخص؛ بدون پیشنهاد بر پایهٔ دادهٔ ساختگی.'),component:List});
function List(){const list=Route.useLoaderData();return <Page title={list.title} lead="انتخاب بر اساس معیارهای شفاف، مستقل از همکاری تجاری."><h2 className="text-xl font-bold text-brand-deep">معیارهای این فهرست</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{list.criteria.map(c=><li key={c} className="border-s-2 border-primary bg-muted p-4 text-sm">{c}</li>)}</ul><p className="mt-8 text-sm leading-8 text-muted-foreground">پروفایل منبع‌دار و تأییدشده‌ای برای این فهرست منتشر نشده است. داده‌های نمونه برای معرفی گزینهٔ برتر استفاده نمی‌شوند.</p><Button asChild variant="outline" className="mt-6"><Link to="/methodology">روش ارزیابی</Link></Button></Page>}
