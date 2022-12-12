import { reverse } from '../utils';

describe('test reverse string algorithms', () => {
  it('reverse string with odd', () => {
    const str = '16781';

    const result = reverse(str);

    expect(result).toBe('18761')
  })

  it('reverse string with even', () => {
    const str = '1678';

    const result = reverse(str);

    expect(result).toBe('8761')
  })

  it('reverse string with one symbol', () => {
    const str = '9';

    const result = reverse(str);

    expect(result).toBe('9')
  })

  it('reverse string empty', () => {
    const str = '';

    const result = reverse(str);

    expect(result).toBe('')
  })
})