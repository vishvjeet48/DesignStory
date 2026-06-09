import type { MoodboardItem } from '@/types'

const img = (id: string, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&h=${h}&q=80`

export const moodboardItems: MoodboardItem[] = [
  { id: 'm2', title: 'Linen Texture', image: img('photo-1586023492125-27b2c045efd7', 700), tag: 'Fabrics' },
  { id: 'm3', title: 'Calacatta Marble', image: img('photo-1615874959474-d609969a20ed', 500), tag: 'Marble' },
  { id: 'm4', title: 'White Oak', image: img('photo-1600585154340-be6161a56a0c', 600), tag: 'Wood Textures' },
  { id: 'm6', title: 'Sculptural Pendant', image: img('photo-1513506003901-1e6a229e2d15', 450), tag: 'Lighting' },
  { id: 'm7', title: 'Terracotta Accent', image: img('photo-1616486338812-3dadae4b4ace', 550), tag: 'Color Palettes' },
  { id: 'm8', title: 'Velvet Emerald', image: img('photo-1555041469-a586c61ea9bc', 650), tag: 'Fabrics' },
  { id: 'm9', title: 'Brass Details', image: img('photo-1600210492486-724fe5c67fb0', 500), tag: 'Lighting' },
  { id: 'm10', title: 'Minimal Staircase', image: img('photo-1600566753190-17f0baa2a6c3', 750), tag: 'Architecture' },
  { id: 'm11', title: 'Walnut Grain', image: img('photo-1600607687939-ce8a6c25118c', 480), tag: 'Wood Textures' },
  { id: 'm12', title: 'Sage & Cream', image: img('photo-1618221195710-dd6b41faaea6', 520), tag: 'Color Palettes' },
]
