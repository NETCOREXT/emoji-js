# @netcorext/emoji-js

[![npm version](https://badge.fury.io/js/@netcorext%2Femoji-js.svg)](https://badge.fury.io/js/@netcorext%2Femoji-js)
[![License](https://img.shields.io/npm/l/@netcorext/emoji-js)](https://github.com/netcorext/emoji-js/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A modern emoji library based on the official Unicode 17.0 emoji test file, providing a clean API for searching and categorizing emojis.

## ✨ Features

- 📱 **Latest Unicode 17.0**: All official Unicode 17.0 emojis included
  ref: https://www.unicode.org/Public/17.0.0/emoji/emoji-test.txt
- 🔍 **Smart Search**: Fuzzy search powered by Fuse.js
- 🎯 **Exact Match**: Find emoji by exact character match
- 📅 **Flexible Filtering**: Support both single values and arrays for all filter parameters (emoji, version, status, group, subgroup)
- 🏷️ **Organized**: Group and subgroup classification
- 📊 **Status Filtering**: Filter by emoji status (fully-qualified, unqualified, etc.)
- 🎨 **Skin Tone Support**: Filter emojis with or without skin tone variations
- 📅 **Version Filtering**: Filter by Unicode version using semver (e.g., '>=13.0.0', '<17.0.0')
- 📦 **Zero Config**: Works out of the box
- 🔧 **TypeScript**: Full type support
- 🚀 **Modern**: ESM and CommonJS dual support

## 📦 Installation

```bash
# npm
npm install @netcorext/emoji-js

# yarn
yarn add @netcorext/emoji-js

# pnpm
pnpm add @netcorext/emoji-js
```

## 🚀 Quick Start

```typescript
import { useEmoji, useSimpleEmoji } from '@netcorext/emoji-js'

// Get all emojis
const allEmojis = useEmoji()

// Search for emojis containing "smile"
const smileEmojis = useEmoji('smile')

// Get detailed information about a specific emoji
const heartInfo = useEmoji({ emoji: '❤️' })
console.log(heartInfo[0]) // { code: ['2764', 'FE0F'], emoji: '❤️', description: 'red heart', ... }

// Get multiple emojis at once
const partyEmojis = useEmoji({ emoji: ['🎉', '🎊', '🥳'] })
console.log(partyEmojis.map(e => e.emoji)) // ['🎉', '🎊', '🥳']

// Get simple emoji string array
const simpleEmojis = useSimpleEmoji('heart')
console.log(simpleEmojis) // ['❤️', '💛', '💚', ...]
```

## 📖 API Documentation

### `useEmoji(filter?)`

Get an array of complete emoji objects.

**Parameters:**

- `filter` (optional): `string | { keyword?: string, emoji?: string | string[], version?: string | string[], status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }`
  - All filter parameters (except `keyword` and `skinTone`) support both single values and arrays

**Returns:** `Emoji[]`

```typescript
// Get all emojis
const allEmojis = useEmoji()

// Keyword search
const searchResult = useEmoji('cat')

// Exact emoji match
const exactMatch = useEmoji({ emoji: '😀' })
const heartInfo = useEmoji({ emoji: '❤️' })

// Multiple emoji match
const multipleEmojis = useEmoji({ emoji: ['😀', '😁', '❤️'] })

// Filter by group
const smileysEmojis = useEmoji({ group: 'Smileys & Emotion' })

// Filter by multiple groups
const multipleGroups = useEmoji({ group: ['Smileys & Emotion', 'People & Body'] })

// Filter by subgroup
const faceSmilingEmojis = useEmoji({ subgroup: 'face-smiling' })

// Filter by Unicode version
const olderEmojis = useEmoji({ version: '<17.0.0' })
const recentEmojis = useEmoji({ version: '>=15.0.0' })

// Filter by status
const fullyQualifiedEmojis = useEmoji({ status: 'fully-qualified' })

// Filter emojis with skin tone variations
const skinToneEmojis = useEmoji({ skinTone: true })

// Filter emojis without skin tone variations
const noSkinToneEmojis = useEmoji({ skinTone: false })

// Combined filtering
const result = useEmoji({
  keyword: 'smile',
  group: 'Smileys & Emotion',
  version: '>=13.0.0',
  status: 'fully-qualified'
})

// Advanced array filtering
const advancedResult = useEmoji({
  group: ['Smileys & Emotion', 'People & Body'],
  status: ['fully-qualified', 'minimally-qualified'],
  version: ['>=13.0.0', '<17.0.0']
})
```

### `useSimpleEmoji(filter?)`

Get a simplified array of emoji strings.

**Parameters:**

- `filter` (optional): `string | { keyword?: string, emoji?: string | string[], version?: string | string[], status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }`

**Returns:** `string[]`

```typescript
// Get all emoji strings
const emojis = useSimpleEmoji()
console.log(emojis) // ['😀', '😃', '😄', ...]

// Search related emojis
const heartEmojis = useSimpleEmoji('heart')
console.log(heartEmojis) // ['❤️', '💛', '💚', ...]

// Check if a specific emoji exists (returns array with the emoji or empty array)
const checkEmoji = useSimpleEmoji({ emoji: '🎉' })
console.log(checkEmoji) // ['🎉'] or []

// Get multiple specific emojis
const multipleEmojis = useSimpleEmoji({ emoji: ['🎉', '🎊', '🥳'] })
console.log(multipleEmojis) // ['🎉', '🎊', '🥳']

// Get emojis from multiple groups
const multipleGroupEmojis = useSimpleEmoji({ group: ['Activities', 'Objects'] })

// Get only fully-qualified emojis
const qualifiedEmojis = useSimpleEmoji({ status: 'fully-qualified' })

// Get emojis from specific Unicode version
const legacyEmojis = useSimpleEmoji({ version: '<15.0.0' })

// Get emojis with skin tone variations
const diverseEmojis = useSimpleEmoji({ skinTone: true })
```

### `useEmojiByGroup(filter?)`

Organize emojis by groups.

**Parameters:**

- `filter` (optional): `string | { keyword?: string, emoji?: string | string[], version?: string | string[], status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }`

**Returns:** `Record<string, Set<string>>`

```typescript
const groupedEmojis = useEmojiByGroup()
console.log(groupedEmojis)
/*
{
  "Smileys & Emotion": Set(['😀', '😃', '😄', ...]),
  "People & Body": Set(['👋', '🤚', '🖐️', ...]),
  "Animals & Nature": Set(['🐶', '🐱', '🐭', ...]),
  ...
}
*/

// Search with specific keywords and group
const searchGrouped = useEmojiByGroup('animal')

// Group only fully-qualified emojis
const qualifiedGrouped = useEmojiByGroup({ status: 'fully-qualified' })

// Group emojis from specific version range
const versionGrouped = useEmojiByGroup({ version: '>=14.0.0 <17.0.0' })
```

### `useEmojiBySubGroup(filter?)`

Organize emojis by groups and subgroups.

**Parameters:**

- `filter` (optional): `string | { keyword?: string, emoji?: string | string[], version?: string | string[], status?: EmojiStatus | EmojiStatus[], group?: EmojiGroup | EmojiGroup[], subgroup?: EmojiSubGroup | EmojiSubGroup[], skinTone?: boolean }`

**Returns:** `Record<string, Record<string, Set<string>>>`

```typescript
const subGroupedEmojis = useEmojiBySubGroup()
console.log(subGroupedEmojis)
/*
{
  "Smileys & Emotion": {
    "face-smiling": Set(['😀', '😃', '😄', ...]),
    "face-affection": Set(['😍', '🥰', '😘', ...]),
    ...
  },
  "People & Body": {
    "hand-fingers-open": Set(['👋', '🤚', '🖐️', ...]),
    ...
  },
  ...
}
*/

// Filter by specific criteria
const filteredSubGroups = useEmojiBySubGroup({
  group: 'People & Body',
  version: '>=13.0.0',
  skinTone: false
})
```

## 🏷️ Type Definitions

```typescript
interface Emoji {
  code: string[] // Unicode codes
  status: string // status (fully-qualified, minimally-qualified, etc.)
  emoji: string // emoji character
  version: string // Unicode version
  description: string // description
  group: string // group name
  subgroup: string // subgroup name
  skinTone: boolean // has skin tone variations
}

type EmojiStatus = 'fully-qualified' | 'unqualified' | 'minimally-qualified' | 'component'

type EmojiGroup = 'Smileys & Emotion' | 'People & Body' | 'Component' | 'Animals & Nature' | 'Food & Drink' | 'Travel & Places' | 'Activities' | 'Objects' | 'Symbols' | 'Flags'

type EmojiSubGroup = 'face-smiling' | 'face-affection' | 'face-tongue' | 'face-hand' | 'face-neutral-skeptical' | 'face-sleepy' | 'face-unwell' | 'face-hat' | 'face-glasses' | 'face-concerned' | 'face-negative' | 'face-costume' | 'cat-face' | 'monkey-face' | 'heart' | 'emotion' | ... // and more
```

## 🎯 Use Cases

### 1. Search Functionality

```typescript
import { useSimpleEmoji } from '@netcorext/emoji-js'

function searchEmojis(query: string) {
  return useSimpleEmoji(query).slice(0, 10) // Limit results
}

// Usage example
const results = searchEmojis('happy')
console.log(results) // ['😊', '😄', '😃', ...]
```

### 2. Emotion Analysis

```typescript
import { useEmoji } from '@netcorext/emoji-js'

function analyzeEmotions(text: string) {
  const emotionEmojis = useEmoji({ group: 'Smileys & Emotion' })
  const found = emotionEmojis.filter(emoji =>
    text.includes(emoji.emoji)
  )
  return found.map(emoji => ({
    emoji: emoji.emoji,
    emotion: emoji.description
  }))
}
```

### 3. Status-based Filtering

```typescript
import { useEmoji } from '@netcorext/emoji-js'

// Get only fully-qualified emojis for production use
function getProductionEmojis() {
  return useEmoji({ status: 'fully-qualified' })
}

// Get component emojis for advanced use cases
function getComponentEmojis() {
  return useEmoji({ status: 'component' })
}
```

### 4. Skin Tone Management

```typescript
import { useEmoji } from '@netcorext/emoji-js'

// Get emojis that support skin tone variations
function getDiverseEmojis() {
  return useEmoji({ skinTone: true })
}

// Get emojis without skin tone variations for consistency
function getUniformEmojis() {
  return useEmoji({ skinTone: false })
}

// Filter people emojis with skin tone support
function getPeopleWithSkinTones() {
  return useEmoji({
    group: 'People & Body',
    skinTone: true,
    status: 'fully-qualified'
  })
}
```

### 5. Exact Emoji Matching

```typescript
import { useEmoji } from '@netcorext/emoji-js'

// Get detailed information about a specific emoji
function getEmojiInfo(emojiChar: string) {
  const result = useEmoji({ emoji: emojiChar })
  return result[0] // Returns the emoji object with full details
}

// Validate if an emoji exists in the dataset
function isValidEmoji(emojiChar: string) {
  const result = useEmoji({ emoji: emojiChar })
  return result.length > 0
}

// Get multiple emoji information at once
function getMultipleEmojiInfo(emojiChars: string[]) {
  return emojiChars.map(emoji => ({
    emoji,
    info: useEmoji({ emoji })[0] || null
  }))
}

// Find emoji variants or related emojis
function findEmojiVariants(emojiChar: string) {
  const originalEmoji = useEmoji({ emoji: emojiChar })[0]
  if (!originalEmoji) return []

  // Find other emojis in the same subgroup
  return useEmoji({
    subgroup: originalEmoji.subgroup,
    status: 'fully-qualified'
  })
}

// Example usage
const heartInfo = getEmojiInfo('❤️')
console.log(heartInfo)
/*
{
  code: ['2764', 'FE0F'],
  status: 'fully-qualified',
  emoji: '❤️',
  version: '1.1',
  description: 'red heart',
  group: 'Smileys & Emotion',
  subgroup: 'heart',
  skinTone: false
}
*/
```

### 6. Version-based Filtering

```typescript
import { useEmoji, useSimpleEmoji } from '@netcorext/emoji-js'

// Get older emojis for legacy support
function getLegacyEmojis() {
  return useEmoji({ version: '<15.0.0' })
}

// Get recently added emojis
function getLatestEmojis() {
  return useEmoji({ version: '>=16.0.0' })
}

// Get emojis from a specific version range
function getVersionRangeEmojis(minVersion: string, maxVersion: string) {
  return useEmoji({ version: `>=${minVersion} <${maxVersion}` })
}

// Combine version filtering with other criteria
function getRecentAnimalEmojis() {
  return useSimpleEmoji({
    group: 'Animals & Nature',
    version: '>=15.0.0',
    status: 'fully-qualified'
  })
}

// Check compatibility for specific Unicode versions
function isEmojiSupportedInVersion(emoji: string, targetVersion: string) {
  const emojis = useEmoji({ version: `<=${targetVersion}` })
  return emojis.some(e => e.emoji === emoji)
}
```

### 7. Advanced Array-based Filtering

**All filter parameters support arrays for multiple value matching**

```typescript
import { useEmoji, useSimpleEmoji } from '@netcorext/emoji-js'

// Get multiple specific emojis at once
function getMultipleEmojis(emojiList: string[]) {
  return useEmoji({ emoji: emojiList })
}

// Filter by multiple groups
function getEmojisFromCategories(categories: string[]) {
  return useSimpleEmoji({ group: categories as any[] })
}

// Filter by multiple statuses
function getEmojisByStatuses(statuses: ('fully-qualified' | 'minimally-qualified')[]) {
  return useEmoji({ status: statuses })
}

// Complex array filtering
function getFilteredEmojis() {
  return useEmoji({
    group: ['Smileys & Emotion', 'People & Body', 'Animals & Nature'],
    status: ['fully-qualified', 'minimally-qualified'],
    version: ['>=13.0.0', '<17.0.0'],
    skinTone: false
  })
}

// Get emojis from multiple subgroups
function getFaceEmojis() {
  return useSimpleEmoji({
    subgroup: ['face-smiling', 'face-affection', 'face-tongue'] as any[]
  })
}

// Batch emoji validation
function validateMultipleEmojis(emojiList: string[]) {
  const found = useEmoji({ emoji: emojiList })
  return emojiList.map(emoji => ({
    emoji,
    isValid: found.some(e => e.emoji === emoji),
    info: found.find(e => e.emoji === emoji) || null
  }))
}

// Example usage
const partyEmojis = getMultipleEmojis(['🎉', '🎊', '🥳', '🎈'])
const expressionEmojis = getFaceEmojis()
const validationResults = validateMultipleEmojis(['😀', '❤️', '🦄', '🌟'])

console.log('Party emojis:', partyEmojis.map(e => e.emoji))
console.log('Expression emojis:', expressionEmojis.slice(0, 10))
console.log('Validation:', validationResults)
```

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/netcorext/emoji-js.git
cd emoji-js

# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build
pnpm build

# Test
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## 📄 License

[MIT](LICENSE) © 2024 Netcorext

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Unicode Consortium](https://unicode.org/) - For providing official emoji data
- [Fuse.js](https://fusejs.io/) - For providing fuzzy search functionality

---

**🎉 Happy coding! If this library helps you, please give us a ⭐️**
