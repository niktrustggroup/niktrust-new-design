import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {MarketTerminal} from '@/components/site/MarketPulse';
export const Route=createFileRoute('/terminal/')({head:()=>meta('ترمینال تحلیلی','نمودار بازار با انتخاب نماد، بازهٔ زمانی، نوع نمودار و اندیکاتور.'),component:()=> <Page title="ترمینال تحلیلی" lead="نمایش و تحلیل بازار؛ بدون معامله، سفارش یا سیگنال."><MarketTerminal slug="eurusd"/></Page>});
