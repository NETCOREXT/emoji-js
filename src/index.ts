import type { EmojiGroup, EmojiStatus, EmojiSubGroup } from './types/emoji'
import Fuse from 'fuse.js'
import { EMOJI } from './types/emoji'

const fuse = new Fuse(EMOJI, {
  keys: ['description'],
  threshold: 0.3,
})

export function useEmoji(filter?: string | { keyword?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
  const { keyword, status, group, subgroup, skinTone } = typeof filter === 'string' ? { keyword: filter } : filter || {}
  const emojis = keyword ? fuse.search(keyword).map(result => result.item) : EMOJI

  return status !== undefined || group !== undefined || subgroup !== undefined || skinTone !== undefined
    ? emojis.filter(e => (status ? e.status.toLowerCase() === status.toLowerCase() : true) && (group ? e.group.toLowerCase() === group.toLowerCase() : true) && (subgroup ? e.subgroup.toLowerCase() === subgroup.toLowerCase() : true) && (skinTone !== undefined ? e.skinTone === skinTone : true))
    : emojis
}

export function useSimpleEmoji(filter?: string | { keyword?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
  const emojis = filter ? useEmoji(filter) : EMOJI
  return emojis.map(e => e.emoji)
}

export function useEmojiByGroup(filter?: string | { keyword?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
  const emojis = filter ? useEmoji(filter) : EMOJI
  const grouped: Record<string, Set<string>> = {}
  for (const emoji of emojis) {
    if (!grouped[emoji.group])
      grouped[emoji.group] = new Set()
    grouped[emoji.group]!.add(emoji.emoji)
  }
  return grouped
}

export function useEmojiBySubGroup(filter?: string | { keyword?: string, status?: EmojiStatus, group?: EmojiGroup, subgroup?: EmojiSubGroup, skinTone?: boolean }) {
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
