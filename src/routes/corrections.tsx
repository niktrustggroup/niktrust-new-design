import {createFileRoute} from '@tanstack/react-router';
import {meta} from '@/components/site/ui';
import {InfoPage} from '@/components/site/InfoPage';
import {INFO_PAGES} from '@/lib/content';
export const Route=createFileRoute('/corrections')({head:()=>meta(INFO_PAGES['corrections']?.title??'شفافیت نیک‌تراست',INFO_PAGES['corrections']?.lead??'اطلاعات شفاف نیک‌تراست'),component:()=> <InfoPage page="corrections"/>});
