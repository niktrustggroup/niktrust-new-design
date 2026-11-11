import { describe, it, expect } from 'vitest';
import { calculate } from '@/lib/calculators';
describe('Financial calculator reference formulas', () => {
 it('risks 1% of 10000 with 50 pips and 10 per pip: 0.2 lots', () => expect(calculate('position-size', { balance:10000, risk:1, stop:50, pipValue:10 })).toBe(0.2));
 it('values a standard EURUSD pip at 10 account units', () => expect(calculate('pip-value', { lots:1, contract:100000, pip:0.0001, conversion:1 })).toBe(10));
 it('requires 1100 margin for 1 lot at 1.1 and 1:100', () => expect(calculate('margin', { lots:1, contract:100000, price:1.1, conversion:1, leverage:100 })).toBeCloseTo(1100));
 it('computes 500 profit on a 1-lot buy from 1.1 to 1.105', () => expect(calculate('profit-loss', { lots:1, contract:100000, entry:1.1, exit:1.105, conversion:1, direction:1 })).toBeCloseTo(500));
 it('reverses profit for a sell trade', () => expect(calculate('profit-loss', { lots:1, contract:100000, entry:1.1, exit:1.105, conversion:1, direction:-1 })).toBeCloseTo(-500));
 it('computes effective leverage of 10 on equity 11000', () => expect(calculate('leverage', { lots:1, contract:100000, price:1.1, conversion:1, equity:11000 })).toBeCloseTo(10));
 it('computes -15 swap for 1 lot at -5 for 3 nights', () => expect(calculate('swap', { lots:1, rate:-5, nights:3 })).toBe(-15));
 it('rejects a zero stop distance instead of dividing by zero', () => expect(calculate('position-size', { balance:10000, risk:1, stop:0, pipValue:10 })).toBeNull());
});
