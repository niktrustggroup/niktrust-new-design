import {Link} from '@tanstack/react-router';
import {Page} from '@/components/site/ui';
import {Button} from '@/components/ui/button';
import {INFO_PAGES} from '@/lib/content';
export function InfoPage({page}:{page:string}){const p=INFO_PAGES[page];if(!p)return null;return <Page title={p.title} lead={p.lead}><div className="max-w-3xl space-y-8">{p.sections.map(([title,body])=><section key={title}><h2 className="text-xl font-bold text-brand-deep">{title}</h2><p className="mt-3 text-base leading-8 text-muted-foreground">{body}</p></section>)}</div><div className="mt-8 flex flex-wrap gap-3"><Button variant="outline" asChild><Link to="/methodology">روش ارزیابی</Link></Button><Button variant="outline" asChild><Link to="/alerts/report">گزارش اطلاعات نادرست</Link></Button><Button variant="outline" asChild><Link to="/contact">تماس</Link></Button></div></Page>}
