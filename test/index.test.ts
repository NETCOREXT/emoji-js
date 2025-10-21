import { consola } from 'consola'
import { describe, expect, it } from 'vitest'
import { useEmoji, useEmojiByGroup, useEmojiBySubGroup, useSimpleEmoji } from '../src/index'
import { COMPONENT_COUNT, FULLY_QUALIFIED_COUNT, MINIMALLY_QUALIFIED_COUNT, UNQUALIFIED_COUNT } from '../src/types/emoji'

describe('emoji', () => {
  // Data validation tests
  describe('data validation', () => {
    it('check the count of entries with status fully-qualified', () => {
      const result = useEmoji({ status: 'fully-qualified' })
      consola.log('useEmoji fully-qualified count', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(FULLY_QUALIFIED_COUNT)
    })

    it('check the count of entries with status minimally-qualified', () => {
      const result = useEmoji({ status: 'minimally-qualified' })
      consola.log('useEmoji minimally-qualified count', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(MINIMALLY_QUALIFIED_COUNT)
    })

    it('check the count of entries with status unqualified', () => {
      const result = useEmoji({ status: 'unqualified' })
      consola.log('useEmoji unqualified count', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(UNQUALIFIED_COUNT)
    })

    it('check the count of entries with status component', () => {
      const result = useEmoji({ status: 'component' })
      consola.log('useEmoji component count', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(COMPONENT_COUNT)
    })
  })

  // useEmoji tests
  describe('useEmoji', () => {
    it('should return all emojis when no filter provided', () => {
      const result = useEmoji()
      consola.log('useEmoji all', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1000)
    })

    it('should filter by keyword', () => {
      const result = useEmoji('smile')
      consola.log('useEmoji filter keyword', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by single emoji', () => {
      const result = useEmoji({ emoji: '😄' })
      consola.log('useEmoji filter emoji', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(1)
    })

    it('should filter by multiple emojis', () => {
      const result = useEmoji({ emoji: ['😄', '❤️', '🎉'] })
      consola.log('useEmoji filter multiple emojis', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBe(3)
      expect(result.map(e => e.emoji)).toEqual(['😄', '❤️', '🎉'])
    })

    it('should filter by version', () => {
      const result = useEmoji({ version: '<17.0.0' })
      consola.log('useEmoji filter version', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by single status', () => {
      const result = useEmoji({ status: 'fully-qualified' })
      consola.log('useEmoji filter status', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by multiple statuses', () => {
      const result = useEmoji({ status: ['fully-qualified', 'minimally-qualified'] })
      consola.log('useEmoji filter multiple statuses', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(100)
    })

    it('should filter by single group', () => {
      const result = useEmoji({ group: 'Smileys & Emotion' })
      consola.log('useEmoji filter group', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by multiple groups', () => {
      const result = useEmoji({ group: ['Smileys & Emotion', 'Activities'] })
      consola.log('useEmoji filter multiple groups', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(10)
    })

    it('should filter by subgroup', () => {
      const result = useEmoji({ subgroup: 'face-smiling' })
      consola.log('useEmoji filter subgroup', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by skinTone', () => {
      const result = useEmoji({ skinTone: false })
      consola.log('useEmoji filter skinTone', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should handle empty array', () => {
      const result = useEmoji({ emoji: [] })
      consola.log('useEmoji empty array filtering', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBe(0)
    })

    it('should handle complex array filtering', () => {
      const result = useEmoji({
        group: ['Smileys & Emotion', 'People & Body'],
        status: ['fully-qualified', 'minimally-qualified'],
        skinTone: false,
      })
      consola.log('useEmoji complex array filtering', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(10)
    })

    it('should handle mixed single and array filtering', () => {
      const result = useEmoji({
        group: ['Smileys & Emotion'], // Array with single value
        status: 'fully-qualified', // Single value
        skinTone: false,
      })
      consola.log('useEmoji mixed single and array filtering', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1)
    })
  })

  // useSimpleEmoji tests
  describe('useSimpleEmoji', () => {
    it('should return all emoji characters when no filter provided', () => {
      const result = useSimpleEmoji()
      consola.log('useSimpleEmoji all', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1000)
    })

    it('should filter by keyword', () => {
      const result = useSimpleEmoji('smile')
      consola.log('useSimpleEmoji filter keyword', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1)
    })

    it('should filter by single emoji', () => {
      const result = useSimpleEmoji({ emoji: '😄' })
      consola.log('useSimpleEmoji filter emoji', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBe(1)
    })

    it('should filter by multiple emojis', () => {
      const result = useSimpleEmoji({ emoji: ['😄', '❤️', '🎉'] })
      consola.log('useSimpleEmoji filter multiple emojis', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBe(3)
      expect(result).toEqual(['😄', '❤️', '🎉'])
    })

    it('should filter by version', () => {
      const result = useSimpleEmoji({ version: '<17.0.0' })
      consola.log('useSimpleEmoji filter version', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1)
    })

    it('should filter by status', () => {
      const result = useSimpleEmoji({ status: 'fully-qualified' })
      consola.log('useSimpleEmoji filter status', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1)
    })

    it('should filter by group', () => {
      const result = useSimpleEmoji({ group: 'Smileys & Emotion' })
      consola.log('useSimpleEmoji filter group', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1)
    })

    it('should filter by subgroup', () => {
      const result = useSimpleEmoji({ subgroup: 'face-smiling' })
      consola.log('useSimpleEmoji filter subgroup', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1)
    })

    it('should filter by skinTone', () => {
      const result = useSimpleEmoji({ skinTone: false })
      consola.log('useSimpleEmoji filter skinTone', result.length)
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(1)
    })
  })

  // useEmojiByGroup tests
  describe('useEmojiByGroup', () => {
    it('should return all emojis grouped by group when no filter provided', () => {
      const result = useEmojiByGroup()
      consola.log('useEmojiByGroup all', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(10)
    })

    it('should filter by keyword', () => {
      const result = useEmojiByGroup('smile')
      consola.log('useEmojiByGroup filter keyword', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
    })

    it('should filter by single emoji', () => {
      const result = useEmojiByGroup({ emoji: '😄' })
      consola.log('useEmojiByGroup filter emoji', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(1)
    })

    it('should filter by multiple groups', () => {
      const result = useEmojiByGroup({ group: ['Smileys & Emotion', 'Activities'] })
      consola.log('useEmojiByGroup filter multiple groups', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(2)
      expect(result['Smileys & Emotion']).toBeDefined()
      expect(result.Activities).toBeDefined()
    })

    it('should filter by version', () => {
      const result = useEmojiByGroup({ version: '<17.0.0' })
      consola.log('useEmojiByGroup filter version', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by status', () => {
      const result = useEmojiByGroup({ status: 'fully-qualified' })
      consola.log('useEmojiByGroup filter status', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by group', () => {
      const result = useEmojiByGroup({ group: 'Smileys & Emotion' })
      consola.log('useEmojiByGroup filter group', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
    })

    it('should filter by subgroup', () => {
      const result = useEmojiByGroup({ subgroup: 'face-smiling' })
      consola.log('useEmojiByGroup filter subgroup', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
    })

    it('should filter by skinTone', () => {
      const result = useEmojiByGroup({ skinTone: false })
      consola.log('useEmojiByGroup filter skinTone', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })
  })

  // useEmojiBySubGroup tests
  describe('useEmojiBySubGroup', () => {
    it('should return all emojis grouped by subgroup when no filter provided', () => {
      const result = useEmojiBySubGroup()
      consola.log('useEmojiBySubGroup all', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(10)
    })

    it('should filter by keyword', () => {
      const result = useEmojiBySubGroup('smile')
      consola.log('useEmojiBySubGroup filter keyword', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
    })

    it('should filter by single emoji', () => {
      const result = useEmojiBySubGroup({ emoji: '😄' })
      consola.log('useEmojiBySubGroup filter emoji', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBe(1)
    })

    it('should filter by multiple subgroups', () => {
      const result = useEmojiBySubGroup({ subgroup: ['face-smiling', 'heart'] })
      consola.log('useEmojiBySubGroup filter multiple subgroups', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(0)
    })

    it('should filter by version', () => {
      const result = useEmojiBySubGroup({ version: '<17.0.0' })
      consola.log('useEmojiBySubGroup filter version', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by status', () => {
      const result = useEmojiBySubGroup({ status: 'fully-qualified' })
      consola.log('useEmojiBySubGroup filter status', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })

    it('should filter by group', () => {
      const result = useEmojiBySubGroup({ group: 'Smileys & Emotion' })
      consola.log('useEmojiBySubGroup filter group', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
    })

    it('should filter by subgroup', () => {
      const result = useEmojiBySubGroup({ subgroup: 'face-smiling' })
      consola.log('useEmojiBySubGroup filter subgroup', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThanOrEqual(1)
    })

    it('should filter by skinTone', () => {
      const result = useEmojiBySubGroup({ skinTone: false })
      consola.log('useEmojiBySubGroup filter skinTone', Object.keys(result).length)
      expect(result).toBeDefined()
      expect(Object.keys(result).length).toBeGreaterThan(1)
    })
  })
})
