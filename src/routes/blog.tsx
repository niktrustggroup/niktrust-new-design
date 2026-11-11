import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {ContentHub} from '@/components/site/ContentHub';
export const Route=createFileRoute('/blog')({head:()=>meta('مجلهٔ نیک‌تراست','آموزش و پژوهش مالی؛ مطالب فعلی نمونه‌اند.'),component:()=> <Page title="مجلهٔ نیک‌تراست" lead="آموزش و پژوهش مالی؛ مطالب فعلی نمونه‌اند."><ContentHub news={false}/></Page>});
