import getFullDate from './getFullDate';

describe('getFullDate()', () => {
  it('correctly fomats dates', () => {
    expect(getFullDate(new Date('1/2/00'))).toBe('2000-01-02');
    expect(getFullDate(new Date('12/31/2000'))).toBe('2000-12-31');
  });
});
