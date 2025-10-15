import { describe, expect, it } from 'vitest'
import { useEmoji, useEmojiByGroup, useEmojiBySubGroup, useSimpleEmoji } from '../src/index'

describe('emoji', () => {
  it('useEmoji', () => {
    const result = useEmoji()
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThan(1000)
  })
  it('useEmoji filter keyword', () => {
    const result = useEmoji('smile')
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThan(1)
  })
  it('useEmoji filter group', () => {
    const result = useEmoji({ group: 'Smileys & Emotion' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThan(1)
  })
  it('useEmoji filter subgroup', () => {
    const result = useEmoji({ subgroup: 'face-smiling' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThan(1)
  })
  it('useSimpleEmoji', () => {
    const result = useSimpleEmoji()
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(1000)
  })
  it('useSimpleEmoji filter keyword', () => {
    const result = useSimpleEmoji('smile')
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(1)
  })
  it('useSimpleEmoji filter group', () => {
    const result = useSimpleEmoji({ group: 'Smileys & Emotion' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThan(1)
  })
  it('useSimpleEmoji filter subgroup', () => {
    const result = useSimpleEmoji({ subgroup: 'face-smiling' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThan(1)
  })
  it('useEmojiByGroup', () => {
    const result = useEmojiByGroup()
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(10)
  })
  it('useEmojiByGroup filter keyword', () => {
    const result = useEmojiByGroup('smile')
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
  })
  it('useEmojiByGroup filter group', () => {
    const result = useEmojiByGroup({ group: 'Smileys & Emotion' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
  })
  it('useEmojiByGroup filter subgroup', () => {
    const result = useEmojiByGroup({ subgroup: 'face-smiling' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
  })
  it('useEmojiBySubGroup', () => {
    const result = useEmojiBySubGroup()
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(10)
  })
  it('useEmojiBySubGroup filter keyword', () => {
    const result = useEmojiBySubGroup('smile')
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
  })
  it('useEmojiBySubGroup filter group', () => {
    const result = useEmojiBySubGroup({ group: 'Smileys & Emotion' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
  })
  it('useEmojiBySubGroup filter subgroup', () => {
    const result = useEmojiBySubGroup({ subgroup: 'face-smiling' })
    expect(result).toBeDefined()
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
  })
})
