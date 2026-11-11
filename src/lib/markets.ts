export const MARKET_CATEGORIES = [{ id: 'all', label: 'همه' }, { id: 'forex', label: 'فارکس' }, { id: 'crypto', label: 'رمزارز' }, { id: 'stocks', label: 'شاخص‌ها' }, { id: 'commodities', label: 'کالاها' }];
export const INSTRUMENTS = [
 { slug: 'eurusd', name: 'یورو / دلار', symbol: 'FX_IDC:EURUSD', category: 'forex', short: 'EUR/USD' },
 { slug: 'gbpusd', name: 'پوند / دلار', symbol: 'FX_IDC:GBPUSD', category: 'forex', short: 'GBP/USD' },
 { slug: 'usdjpy', name: 'دلار / ین', symbol: 'FX_IDC:USDJPY', category: 'forex', short: 'USD/JPY' },
 { slug: 'btcusd', name: 'بیت‌کوین / دلار', symbol: 'BITSTAMP:BTCUSD', category: 'crypto', short: 'BTC/USD' },
 { slug: 'ethusd', name: 'اتریوم / دلار', symbol: 'BITSTAMP:ETHUSD', category: 'crypto', short: 'ETH/USD' },
 { slug: 'nasdaq100', name: 'نزدک ۱۰۰', symbol: 'FOREXCOM:NSXUSD', category: 'stocks', short: 'NAS100' },
 { slug: 'sp500', name: 'اس‌اندپی ۵۰۰', symbol: 'FOREXCOM:SPXUSD', category: 'stocks', short: 'S&P 500' },
 { slug: 'xauusd', name: 'طلا / دلار', symbol: 'OANDA:XAUUSD', category: 'commodities', short: 'XAU/USD' },
];
export const instrumentBySlug = (slug: string) => INSTRUMENTS.find(x => x.slug === slug);
