import {createFileRoute,notFound,Link} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
const names:Record<string,string>={plans:'طرح‌های عضویت',checkout:'بررسی پرداخت',terms:'شرایط عضویت'};
export const Route=createFileRoute('/membership_/$page')({loader:({params})=>{const title=names[params.page];if(!title)throw notFound();return title;},head:({loaderData:t})=>meta(t??'عضویت','قیمت و شرایط اشتراک در انتظار تأیید است؛ پرداخت واقعی فعال نیست.'),component:Membership});
function Membership(){const title=Route.useLoaderData();return <Page title={title} lead="قیمت، مزایا و شرایط نهایی ارائه نشده است."><p className="text-sm text-muted-foreground">خرید، پرداخت و تمدید فعال نیست؛ هیچ مبلغی از شما دریافت نمی‌شود.</p><Link to="/membership" className="mt-6 inline-block text-sm text-primary">بازگشت به مقایسهٔ عضویت ←</Link></Page>}
