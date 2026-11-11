import {createFileRoute} from '@tanstack/react-router';
import {meta} from '@/components/site/ui';
import {InfoPage} from '@/components/site/InfoPage';
import {INFO_PAGES} from '@/lib/content';
export const Route=createFileRoute('/editorial-policy')({head:()=>meta(INFO_PAGES['editorial-policy'].title,INFO_PAGES['editorial-policy'].lead),component:()=> <InfoPage page="editorial-policy"/>});
