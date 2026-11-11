import {createFileRoute,notFound} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {InquiryForm} from '@/components/site/InquiryForm';
const titles:Record<string,string>={apply:'درخواست همکاری',dashboard:'پنل همکار',terms:'شرایط همکاری'};
export const Route=createFileRoute('/partners_/$page')({loader:({params})=>{const title=titles[params.page];if(!title)throw notFound();return {page:params.page,title};},head:({loaderData:d})=>meta(d?.title??'همکاری','برنامهٔ همکاری نیک‌تراست؛ دریافت درخواست و تسویهٔ واقعی فعال نیست.'),component:Partner});
function Partner(){const d=Route.useLoaderData();return <Page title={d.title} lead="قرارداد، دریافت درخواست و ارجاع واقعی فعال نیست.">{d.page==='apply'?<InquiryForm partner/>:<p className="text-sm leading-8 text-muted-foreground">اطلاعات عملیاتی، نرخ کمیسیون و شرایط نهایی هنوز ارائه نشده است؛ درآمد یا حساب ساختگی نمایش داده نمی‌شود.</p>}</Page>}
