import type { EmojiGroup, EmojiStatus, EmojiSubGroup } from './types/emoji'
import Fuse from 'fuse.js'
import semver from 'semver'
import { EMOJI } from './types/emoji'

const fuse = new Fuse(EMOJI, {
  keys: ['description'],
  threshold: 0.3,
})

/**
 * Get emoji list
 * @param filter keyword | { keyword?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component'
 * - group: Emoji group, e.g. 'Smileys & Emotion'
 * - subgroup: Emoji subgroup, e.g. 'face-smiling'
 * - skinTone: boolean, whether to include skin tone variations
 * @returns Emoji[]
 */
export function useEmoji(filter?: string | { keyword?: string, version?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
  const { keyword, version, status, group, subgroup, skinTone } = typeof filter === 'string' ? { keyword: filter } : filter || {}
  const emojis = keyword ? fuse.search(keyword).map(result => result.item) : EMOJI

  return version !== undefined || status !== undefined || group !== undefined || subgroup !== undefined || skinTone !== undefined
    ? emojis.filter(e => (version ? semver.satisfies(`${e.version}.0`, version) : true) && (status ? e.status.toLowerCase() === status.toLowerCase() : true) && (group ? e.group.toLowerCase() === group.toLowerCase() : true) && (subgroup ? e.subgroup.toLowerCase() === subgroup.toLowerCase() : true) && (skinTone !== undefined ? e.skinTone === skinTone : true))
    : emojis
}

/**
 * Get simple emoji list
 * @param filter keyword | { keyword?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component'
 * - group: Emoji group, e.g. 'Smileys & Emotion'
 * - subgroup: Emoji subgroup, e.g. 'face-smiling'
 * - skinTone: boolean, whether to include skin tone variations
 * @returns string[] (emoji characters)
 */
export function useSimpleEmoji(filter?: string | { keyword?: string, version?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
  const emojis = filter ? useEmoji(filter) : EMOJI
  return emojis.map(e => e.emoji)
}

/**
 * Get emoji grouped by group
 * @param filter keyword | { keyword?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component'
 * - group: Emoji group, e.g. 'Smileys & Emotion'
 * - subgroup: Emoji subgroup, e.g. 'face-smiling'
 * - skinTone: boolean, whether to include skin tone variations
 * @returns Record<string, Set<string>> (group -> set of emoji characters)
 */
export function useEmojiByGroup(filter?: string | { keyword?: string, version?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
  const emojis = filter ? useEmoji(filter) : EMOJI
  const grouped: Record<string, Set<string>> = {}
  for (const emoji of emojis) {
    if (!grouped[emoji.group])
      grouped[emoji.group] = new Set()
    grouped[emoji.group]!.add(emoji.emoji)
  }
  return grouped
}

/**
 * Get emoji grouped by subgroup within their groups
 * @param filter keyword | { keyword?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component'
 * - group: Emoji group, e.g. 'Smileys & Emotion'
 * - subgroup: Emoji subgroup, e.g. 'face-smiling'
 * - skinTone: boolean, whether to include skin tone variations
 * @returns Record<string, Record<string, Set<string>>> (group -> subgroup -> set of emoji characters)
 */
export function useEmojiBySubGroup(filter?: string | { keyword?: string, version?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
  const emojis = filter ? useEmoji(filter) : EMOJI
  const grouped: Record<string, Record<string, Set<string>>> = {}
  for (const emoji of emojis) {
    if (!grouped[emoji.group])
      grouped[emoji.group] = {}
    if (!grouped[emoji.group]![emoji.subgroup])
      grouped[emoji.group]![emoji.subgroup] = new Set()
    grouped[emoji.group]![emoji.subgroup]!.add(emoji.emoji)
  }
  return grouped
}
