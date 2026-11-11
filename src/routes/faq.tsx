import {createFileRoute} from '@tanstack/react-router';
import {Page,meta} from '@/components/site/ui';
import {FAQ} from '@/lib/content';
export const Route=createFileRoute('/faq')({head:()=>meta('پرسش‌های متداول','پاسخ پرسش‌های رایج دربارهٔ نیک‌تراست، ارزیابی پلتفرم‌ها و قابلیت‌های مالی.'),component:()=> <Page title="پرسش‌های متداول"><div className="max-w-3xl divide-y divide-border">{FAQ.map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-sm leading-8 text-muted-foreground">{a}</p></details>)}</div></Page>});
