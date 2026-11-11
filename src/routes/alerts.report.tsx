import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {InquiryForm} from '@/components/site/InquiryForm';
export const Route=createFileRoute('/alerts/report')({head:()=>meta('گزارش تغییر یا مشکل پلتفرم','گزارش شواهد اطلاعات نادرست، مشکل دسترسی، واریز یا برداشت پلتفرم.'),component:()=> <Page title="گزارش تغییر یا مشکل پلتفرم" lead="گزارش کاربر یک ادعاست و تنها پس از بررسی شواهد می‌تواند منتشر شود."><InquiryForm/></Page>});
