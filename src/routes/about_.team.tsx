import {createFileRoute} from '@tanstack/react-router';
import {meta} from '@/components/site/ui';
import {InfoPage} from '@/components/site/InfoPage';
export const Route=createFileRoute('/about_/team')({head:()=>meta('تیم و بررسی‌کنندگان','اطلاعات نویسندگان و بررسی‌کنندگان نیک‌تراست؛ بدون سابقه یا نام ساختگی.'),component:()=> <InfoPage page="team"/>});
