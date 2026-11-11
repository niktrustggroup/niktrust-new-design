import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {ContentHub} from '@/components/site/ContentHub';
export const Route=createFileRoute('/news')({head:()=>meta('اخبار پلتفرم و رگولاتوری','رویدادهای منبع‌دار؛ خبری تا تأیید تحریریه منتشر نمی‌شود.'),component:()=> <Page title="اخبار پلتفرم و رگولاتوری" lead="رویدادهای منبع‌دار؛ خبری تا تأیید تحریریه منتشر نمی‌شود."><ContentHub news={true}/></Page>});
