import { expect } from 'chai'
import { matchAndGroup } from '../src/matcher'
import { parseAndGroup } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { caseSensitiveFields: true }

describe('matchAndGroup', () => {
  it('should match if all fields are matched', () => {
    const field = parseAndGroup('a:there AND b:too', csOptions)
    const matched = matchAndGroup(field, { a: 'hello there', b: 'hello there too' })
    expect(matched).to.true
  })
  it('should not match if some field is not matched', () => {
    const field = parseAndGroup('a:there AND b:too', csOptions)
    const matched = matchAndGroup(field, { a: 'hello there', b: 'hello there again' })
    expect(matched).to.false
  })
  it('should match with NOT respect', () => {
    const field = parseAndGroup('a:there AND NOT b:too', csOptions)
    const matched = matchAndGroup(field, { a: 'hello there', b: 'hello there again' })
    expect(matched).to.true
  })
})
