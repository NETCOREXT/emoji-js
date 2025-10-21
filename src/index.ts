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
 * @param filter keyword | { keyword?, emoji?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - emoji: exact match by emoji character or array of emoji characters
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component' or array of status values
 * - group: Emoji group, e.g. 'Smileys & Emotion' or array of groups
 * - subgroup: Emoji subgroup, e.g. 'face-smiling' or array of subgroups
 * - skinTone: boolean, whether to include skin tone variations
 * @returns Emoji[]
 */
export function useEmoji(filter?: string | { keyword?: string, emoji?: string | string[], version?: string, status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }) {
  const { keyword, emoji, version, status, group, subgroup, skinTone } = typeof filter === 'string' ? { keyword: filter } : filter || {}
  const emojis = keyword ? fuse.search(keyword).map(result => result.item) : EMOJI

  return emoji !== undefined || version !== undefined || status !== undefined || group !== undefined || subgroup !== undefined || skinTone !== undefined
    ? emojis.filter((e) => {
        return (emoji ? (Array.isArray(emoji) ? emoji.includes(e.emoji) : e.emoji === emoji) : true)
          && (version ? semver.satisfies(`${e.version}.0`, version) : true)
          && (status ? (Array.isArray(status) ? status.includes(e.status as EmojiStatus) : e.status === status) : true)
          && (group ? (Array.isArray(group) ? group.includes(e.group as EmojiGroup) : e.group === group) : true)
          && (subgroup ? (Array.isArray(subgroup) ? subgroup.includes(e.subgroup as EmojiSubGroup) : e.subgroup === subgroup) : true)
          && (skinTone !== undefined ? e.skinTone === skinTone : true)
      })
    : emojis
}

/**
 * Get simple emoji list
 * @param filter keyword | { keyword?, emoji?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - emoji: exact match by emoji character or array of emoji characters
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component' or array of status values
 * - group: Emoji group, e.g. 'Smileys & Emotion' or array of groups
 * - subgroup: Emoji subgroup, e.g. 'face-smiling' or array of subgroups
 * - skinTone: boolean, whether to include skin tone variations
 * @returns string[] (emoji characters)
 */
export function useSimpleEmoji(filter?: string | { keyword?: string, emoji?: string | string[], version?: string, status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }) {
  const emojis = filter ? useEmoji(filter) : EMOJI
  return emojis.map(e => e.emoji)
}

/**
 * Get emoji grouped by group
 * @param filter keyword | { keyword?, emoji?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - emoji: exact match by emoji character or array of emoji characters
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component' or array of status values
 * - group: Emoji group, e.g. 'Smileys & Emotion' or array of groups
 * - subgroup: Emoji subgroup, e.g. 'face-smiling' or array of subgroups
 * - skinTone: boolean, whether to include skin tone variations
 * @returns Record<string, Set<string>> (group -> set of emoji characters)
 */
export function useEmojiByGroup(filter?: string | { keyword?: string, emoji?: string | string[], version?: string, status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }) {
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
 * @param filter keyword | { keyword?, emoji?, version?, status?, group?, subgroup?, skinTone? }
 * - keyword: fuzzy search by description
 * - emoji: exact match by emoji character or array of emoji characters
 * - version: semver version, e.g. '>=13.0.0', '<14.0.0'
 * - status: 'fully-qualified' | 'minimally-qualified' | 'unqualified' | 'component' or array of status values
 * - group: Emoji group, e.g. 'Smileys & Emotion' or array of groups
 * - subgroup: Emoji subgroup, e.g. 'face-smiling' or array of subgroups
 * - skinTone: boolean, whether to include skin tone variations
 * @returns Record<string, Record<string, Set<string>>> (group -> subgroup -> set of emoji characters)
 */
export function useEmojiBySubGroup(filter?: string | { keyword?: string, emoji?: string | string[], version?: string, status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }) {
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
