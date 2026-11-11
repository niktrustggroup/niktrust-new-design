import {createFileRoute} from '@tanstack/react-router';
import {meta} from '@/components/site/ui';
import {AccountPage} from '@/components/site/AccountPage';
export const Route=createFileRoute('/account/')({head:()=>meta('حساب کاربری','پروفایل، فهرست‌های ذخیره‌شده و اعلان‌های نیک‌تراست؛ سرویس حساب هنوز فعال نیست.'),component:()=> <AccountPage/>});
