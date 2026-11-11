import {createFileRoute,notFound} from '@tanstack/react-router';
import {meta} from '@/components/site/ui';
import {AccountPage,ACCOUNT_PAGES} from '@/components/site/AccountPage';
export const Route=createFileRoute('/account/$page')({loader:({params})=>{if(!ACCOUNT_PAGES[params.page])throw notFound();return params.page;},head:({loaderData:p})=>meta(ACCOUNT_PAGES[p??'']??'حساب کاربری','پیگیری شخصی نیک‌تراست؛ ذخیرهٔ دائمی و اعلان فعال نیست.'),component:Account});
function Account(){return <AccountPage page={Route.useLoaderData()}/>}
