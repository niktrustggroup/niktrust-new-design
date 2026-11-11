import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {PlatformFinder} from '@/components/site/PlatformFinder';
export const Route=createFileRoute('/finder')({head:()=>meta('پیدا کردن پلتفرم مناسب','انتخاب هدایت‌شده در شش مرحله بر اساس بازار، تجربه، سرمایه، پرداخت و اولویت‌های شما.'),component:()=> <Page title="پلتفرم مناسب خود را پیدا کنید" lead="بازار، تجربه و اولویت‌های شما؛ بدون توصیهٔ سرمایه‌گذاری یا رتبه‌بندی تجاری."><PlatformFinder/></Page>});
