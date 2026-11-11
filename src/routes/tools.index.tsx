import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {Calculator} from '@/components/site/Calculator';
export const Route=createFileRoute('/tools/')({head:()=>meta('ابزارها و ماشین‌حساب‌های مالی','محاسبهٔ حجم پوزیشن، ارزش پیپ، مارجین، سود و زیان، اهرم مؤثر و سواپ با فرمول‌های شفاف.'),component:()=> <Page title="ابزارها و ماشین‌حساب‌های مالی" lead="محاسبات معامله با ورودی‌های شما و فرض‌های روشن."><Calculator/></Page>});
