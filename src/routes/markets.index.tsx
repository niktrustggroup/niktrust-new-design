import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {MarketDirectory,MarketPulse} from '@/components/site/MarketPulse';
export const Route=createFileRoute('/markets/')({head:()=>meta('نبض بازار','نمای بازارهای فارکس، رمزارز، شاخص‌ها و طلا با نمودار عمومی TradingView.'),component:()=> <Page title="نبض بازار" lead="فارکس، رمزارز، شاخص‌ها و طلا؛ نمودارهای عمومی با تأخیر احتمالی."><MarketDirectory/><section className="mt-10"><h2 className="mb-5 text-xl font-bold text-brand-deep">نمودار بازار</h2><MarketPulse/></section></Page>});
