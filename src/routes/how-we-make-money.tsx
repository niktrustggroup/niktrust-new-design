import {createFileRoute} from '@tanstack/react-router';
import {meta} from '@/components/site/ui';
import {InfoPage} from '@/components/site/InfoPage';
import {INFO_PAGES} from '@/lib/content';
export const Route=createFileRoute('/how-we-make-money')({head:()=>meta(INFO_PAGES['how-we-make-money'].title,INFO_PAGES['how-we-make-money'].lead),component:()=> <InfoPage page="how-we-make-money"/>});
