'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useThemeStore } from '@/store/themeStore'

const reviews = [
  { q: "Beyond our expectations. The team understood our taste and delivered pure magic.", name: "Meera Sethi", role: "Homeowner · Mumbai", stars: 5, init: "MS", featured: true },
  { q: "They turned our empty space into a home that feels like a reflection of who we are.", name: "Riya Mehta", role: "Homeowner · Pune", stars: 5, init: "RM", featured: true },
  { q: "Impeccable attention to detail and a seamless experience from start to finish.", name: "Karan Malhotra", role: "Business Owner", stars: 5, init: "KM", featured: true },
  { q: "Every corner speaks of thoughtful design and perfect execution.", name: "Neeraj Kapoor", role: "Entrepreneur", stars: 5, init: "NK" },
  { q: "Our office now truly reflects our brand identity. Thank you.", name: "Vikram Singh", role: "Founder", stars: 5, init: "VS" },
  { q: "Professional, creative and extremely supportive. Loved every moment.", name: "Anjali Desai", role: "Homeowner", stars: 5, init: "AD" },
  { q: "The balance of aesthetics and functionality is simply perfect.", name: "Dev Mehta", role: "Entrepreneur", stars: 5, init: "DM" },
  { q: "From concept to completion, everything was handled beautifully.", name: "Simran Chopra", role: "Homeowner", stars: 5, init: "SC" },
  { q: "Design that doesn't just look good but genuinely feels good to live in.", name: "Ayesha Khan", role: "Homeowner", stars: 5, init: "AK" },
  { q: "Our restaurant design is now our biggest competitive strength.", name: "Arjun Nair", role: "Restaurant Owner", stars: 5, init: "AN" },
  { q: "They made the entire process smooth and truly enjoyable.", name: "Rahul Verma", role: "Homeowner", stars: 5, init: "RV" },
  { q: "Highly recommend for anyone seeking premium, considered design.", name: "Ishita Sharma", role: "Homeowner", stars: 5, init: "IS" },
  { q: "You can feel the quality and passion woven into every detail.", name: "Nami T.", role: "Homeowner", stars: 4, init: "NT" },
  { q: "We loved how they brought every one of our ideas to life.", name: "Pooja Iyer", role: "Homeowner", stars: 5, init: "PI" },
  { q: "First-class experience. Best decision for our new home.", name: "Ridhi M.", role: "Homeowner", stars: 5, init: "RM2" },
  { q: "Exquisite craftsmanship. Will absolutely return for our next project.", name: "Sanya D.", role: "Homeowner", stars: 5, init: "SD" },
  { q: "They listen, they understand, and then they exceed every expectation.", name: "Misha R.", role: "Homeowner", stars: 5, init: "MR" },
  { q: "A truly great experience overall. Collaborative and stress-free.", name: "Anil P.", role: "Business Owner", stars: 5, init: "AP" },
  { q: "The studio has a rare gift — turning a brief into something magical.", name: "Prerna J.", role: "Architect", stars: 5, init: "PJ" },
  { q: "Our home finally feels like us. We couldn't be more grateful.", name: "Sunil & Reena", role: "Homeowners", stars: 5, init: "SR" },
  { q: "Elegant, functional, and deeply personal. Just brilliant.", name: "Tarun Bose", role: "Designer", stars: 5, init: "TB" },
  { q: "They transformed our space beyond what we imagined possible.", name: "Lata V.", role: "Homeowner", stars: 5, init: "LV" },
  { q: "The process was transparent and the result was extraordinary.", name: "Rajan M.", role: "Entrepreneur", stars: 4, init: "RJ" },
  { q: "Stunning work. Every guest asks who designed our home.", name: "Deepa K.", role: "Homeowner", stars: 5, init: "DK" },
  { q: "No detail was too small to be considered. Remarkable team.", name: "Farhan A.", role: "Business Owner", stars: 5, init: "FA" },
  { q: "A seamless journey from first meeting to the final styling day.", name: "Swati R.", role: "Homeowner", stars: 5, init: "SW" },
  { q: "The best investment we made in our home, without question.", name: "Nikhil T.", role: "Homeowner", stars: 5, init: "NT2" },
  { q: "Creative, thoughtful, and incredibly professional throughout.", name: "Gayatri P.", role: "Educator", stars: 5, init: "GP" },
  { q: "Our space now has a soul. That's the only way I can describe it.", name: "Kartik S.", role: "Filmmaker", stars: 5, init: "KS" },
  { q: "Simply world-class. The craftsmanship speaks for itself.", name: "Laleh M.", role: "Homeowner", stars: 5, init: "LM" },
]

const AVATAR_COLORS = [
  { bg: '#2a1f0e', text: '#c9933a' },
  { bg: '#0e1a2a', text: '#5b8dd9' },
  { bg: '#0e2a1a', text: '#4caf80' },
  { bg: '#2a0e1a', text: '#d9659a' },
  { bg: '#1a0e2a', text: '#9b6dd9' },
  { bg: '#1a1a0e', text: '#c9b93a' },
]

// 1.5× bigger widths vs previous version, very high base opacity
const LAYERS = [
  { z: 0, opBase: 0.55, blur: 2.5, count: 8,  zIndex: 1,  px: 0.008, py: 0.006, w: 285 },
  { z: 1, opBase: 0.70, blur: 1.2, count: 8,  zIndex: 2,  px: 0.013, py: 0.010, w: 330 },
  { z: 2, opBase: 0.85, blur: 0.4, count: 7,  zIndex: 3,  px: 0.020, py: 0.015, w: 385 },
  { z: 3, opBase: 0.97, blur: 0,   count: 7,  zIndex: 10, px: 0.028, py: 0.022, w: 445 },
]

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

interface CardData {
  review: (typeof reviews)[0]
  layer: (typeof LAYERS)[0]
  x: number
  y: number
  px: number
  py: number
  isFeatured: boolean
  colorIdx: number
}

/**
 * Grid-based balanced placement:
 * Divide the container into columns, assign cards round-robin across columns
 * with a small random jitter so it looks organic but stays spread out.
 */
function buildCards(containerW: number, containerH: number): CardData[] {
  const order = shuffleArray([...Array(reviews.length).keys()])
  const featuredSet = new Set(order.slice(0, 3))
  const cards: CardData[] = []
  let ri = 0

  LAYERS.forEach((layer) => {
    const w = layer.w
    const cols = Math.max(2, Math.floor(containerW / (w + 24)))
    const colW = containerW / cols

    for (let i = 0; i < layer.count; i++) {
      const rev = reviews[order[ri % reviews.length]]
      const col = i % cols
      const jitterX = (Math.random() - 0.5) * (colW - w - 16) * 0.7
      const x = Math.max(12, Math.min(containerW - w - 12, col * colW + (colW - w) / 2 + jitterX))
      const rowSlots = Math.ceil(layer.count / cols)
      const row = Math.floor(i / cols)
      const slotH = (containerH - 60) / rowSlots
      const jitterY = (Math.random() - 0.5) * slotH * 0.55
      const y = Math.max(10, Math.min(containerH - 200, 30 + row * slotH + jitterY))

      const isFeatured = layer.z === 3 && featuredSet.has(order[ri % reviews.length])

      cards.push({
        review: rev,
        layer,
        x, y,
        px: (Math.random() - 0.5) * layer.px * 2,
        py: (Math.random() - 0.5) * layer.py * 2,
        isFeatured,
        colorIdx: ri % AVATAR_COLORS.length,
      })
      ri++
    }
  })
  return cards
}

export function TestimonialsSection() {
  const { theme } = useThemeStore()
  const isLight = theme === 'light'
  const wallRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<CardData[]>([])
  const cardElsRef = useRef<HTMLDivElement[]>([])
  const mouseRef = useRef({ x: 0, y: 0, cx: 0, cy: 0 })
  const rafRef = useRef<number>()

  const buildAndRender = useCallback(() => {
    const wall = wallRef.current
    if (!wall) return
    wall.innerHTML = ''
    cardElsRef.current = []

    const W = wall.offsetWidth
    const H = 700
    const cards = buildCards(W, H)
    cardsRef.current = cards
    mouseRef.current = { x: W / 2, y: H / 2, cx: W / 2, cy: H / 2 }

    cards.forEach((card) => {
      const { review, layer, x, y, isFeatured, colorIdx } = card
      const ac = AVATAR_COLORS[colorIdx]
      const el = document.createElement('div')
      const w = layer.w

      // Font sizes — 1.5× bump
      const qFs  = isFeatured ? 17 : layer.z >= 2 ? 16 : layer.z === 1 ? 15 : 14
      const nameFs = isFeatured ? 15 : 14
      const roleFs = 12.5
      const quoteFs = isFeatured ? 36 : 28
      const pad  = isFeatured ? '28px 30px' : layer.z >= 2 ? '22px 24px' : '18px 20px'
      const avatarSize = isFeatured ? 40 : 32
      const avatarFs   = isFeatured ? 13 : 11

      // Backgrounds — theme-aware
      const bgStyle = isLight
        ? isFeatured
          ? 'background:rgba(255,255,255,.98);border:1px solid rgba(201,147,58,.22);box-shadow:0 0 56px rgba(201,147,58,.14),0 14px 40px rgba(0,0,0,.08);'
          : layer.z === 3
            ? 'background:rgba(255,255,255,.96);border:0.5px solid rgba(44,44,44,.08);box-shadow:0 8px 32px rgba(0,0,0,.08);'
            : layer.z === 2
              ? 'background:rgba(255,255,255,.92);border:0.5px solid rgba(44,44,44,.07);box-shadow:0 6px 22px rgba(0,0,0,.07);'
              : layer.z === 1
                ? 'background:rgba(255,255,255,.88);border:0.5px solid rgba(44,44,44,.06);box-shadow:0 4px 16px rgba(0,0,0,.06);'
                : 'background:rgba(255,255,255,.84);border:0.5px solid rgba(44,44,44,.05);'
        : isFeatured
          ? 'background:rgba(22,17,8,.97);border:1px solid rgba(201,147,58,.5);box-shadow:0 0 56px rgba(201,147,58,.18),0 14px 48px rgba(0,0,0,.75);'
          : layer.z === 3
            ? 'background:rgba(20,16,26,.95);border:0.5px solid rgba(255,255,255,.16);box-shadow:0 8px 32px rgba(0,0,0,.6);'
            : layer.z === 2
              ? 'background:rgba(18,15,24,.90);border:0.5px solid rgba(255,255,255,.12);box-shadow:0 6px 22px rgba(0,0,0,.5);'
              : layer.z === 1
                ? 'background:rgba(16,13,22,.84);border:0.5px solid rgba(255,255,255,.09);box-shadow:0 4px 16px rgba(0,0,0,.4);'
                : 'background:rgba(14,11,20,.78);border:0.5px solid rgba(255,255,255,.06);'

      el.className = 'testimonial-card'
      el.style.cssText = `
        position:absolute; width:${w}px; left:${x}px; top:${y}px;
        opacity:${layer.opBase}; z-index:${layer.zIndex};
        border-radius:18px; padding:${pad};
        font-family:'Cormorant Garamond',Georgia,serif;
        cursor:default;
        ${layer.blur > 0 ? `backdrop-filter:blur(${layer.blur}px);-webkit-backdrop-filter:blur(${layer.blur}px);` : ''}
        ${bgStyle}
      `

      const emptyStarColor = isLight ? 'rgba(44,44,44,.16)' : 'rgba(255,255,255,.12)'
      const starsHtml = [1,2,3,4,5].map(i =>
        `<span style="font-size:${isFeatured?'13px':'11px'};color:${i<=review.stars?'#c9933a':emptyStarColor}">★</span>`
      ).join('')

      el.innerHTML = `
        ${isFeatured ? `<div style="position:absolute;top:0;left:30px;right:30px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,147,58,.6),transparent)"></div>` : ''}
        <span style="display:block;font-size:${quoteFs}px;line-height:1;color:#c9933a;opacity:.8;margin-bottom:8px">"</span>
        <p style="font-style:italic;font-size:${qFs}px;line-height:1.72;color:${isLight ? 'rgba(34,34,34,.92)' : 'rgba(245,240,232,.97)'};margin-bottom:${isFeatured?'14px':'10px'}">${review.q}</p>
        <div style="display:flex;gap:3px;margin-bottom:12px">${starsHtml}</div>
        <div style="display:flex;align-items:center;gap:11px">
          <div style="width:${avatarSize}px;height:${avatarSize}px;border-radius:50%;background:${ac.bg};color:${ac.text};border:1px solid ${ac.text}55;display:flex;align-items:center;justify-content:center;font-size:${avatarFs}px;font-weight:600;font-family:Inter,sans-serif;flex-shrink:0;letter-spacing:.04em">${review.init}</div>
          <div>
            <div style="font-family:Inter,sans-serif;font-size:${nameFs}px;font-weight:500;color:${isLight ? '#1f1f1f' : '#f5f0e8'}">${review.name}</div>
            <div style="font-family:Inter,sans-serif;font-size:${roleFs}px;color:${isLight ? 'rgba(44,44,44,.55)' : 'rgba(255,255,255,.45)'};margin-top:2px">${review.role}</div>
          </div>
        </div>
      `

      // Hover: full reveal
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'opacity .2s ease, backdrop-filter .2s ease, -webkit-backdrop-filter .2s ease, box-shadow .2s ease'
        el.style.opacity = '1'
        el.style.backdropFilter = 'blur(0px)'
        ;(el.style as any).webkitBackdropFilter = 'blur(0px)'
        el.style.zIndex = '200'
        el.style.boxShadow = isLight
          ? isFeatured
            ? '0 0 70px rgba(201,147,58,.22), 0 20px 50px rgba(0,0,0,.12)'
            : '0 12px 50px rgba(0,0,0,.14), 0 0 0 1px rgba(201,147,58,.18)'
          : isFeatured
            ? '0 0 70px rgba(201,147,58,.28), 0 20px 60px rgba(0,0,0,.85)'
            : '0 12px 50px rgba(0,0,0,.75), 0 0 0 1px rgba(201,147,58,.22)'
      })
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'opacity .38s ease, backdrop-filter .38s ease, -webkit-backdrop-filter .38s ease, box-shadow .38s ease'
        el.style.opacity = String(layer.opBase)
        if (layer.blur > 0) {
          el.style.backdropFilter = `blur(${layer.blur}px)`
          ;(el.style as any).webkitBackdropFilter = `blur(${layer.blur}px)`
        }
        el.style.zIndex = String(layer.zIndex)
        el.style.boxShadow = ''
      })

        wall.appendChild(el)
      cardElsRef.current.push(el)
    })
  }, [theme])

  useEffect(() => {
    buildAndRender()

    const wall = wallRef.current
    if (!wall) return
    const W = wall.offsetWidth
    const H = 700

    const onMove = (e: MouseEvent) => {
      const r = wall.getBoundingClientRect()
      mouseRef.current.x = e.clientX - r.left
      mouseRef.current.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouseRef.current.x = W / 2
      mouseRef.current.y = H / 2
    }
    wall.addEventListener('mousemove', onMove)
    wall.addEventListener('mouseleave', onLeave)

    const tick = () => {
      const m = mouseRef.current
      m.cx += (m.x - m.cx) * 0.055
      m.cy += (m.y - m.cy) * 0.055
      const dx = m.cx - W / 2
      const dy = m.cy - H / 2
      cardElsRef.current.forEach((el, i) => {
        const c = cardsRef.current[i]
        if (!c) return
        const ox = (dx * c.px * (c.layer.z + 1)).toFixed(2)
        const oy = (dy * c.py * (c.layer.z + 1)).toFixed(2)
        el.style.transform = `translate(${ox}px,${oy}px)`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      wall.removeEventListener('mousemove', onMove)
      wall.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [buildAndRender])

  return (
    <section style={{ background: isLight ? '#faf8f4' : '#080810', padding: '60px 0 80px', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        .testimonial-card { will-change: transform, opacity; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px', position: 'relative', zIndex: 50 }}>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '.25em', textTransform: 'uppercase', color: '#a8863a', marginBottom: '12px' }}>
          Client voices
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '44px', fontWeight: 300, color: isLight ? '#1f1f1f' : '#f5f0e8', lineHeight: 1.15, marginBottom: '8px' }}>
          Words from<br />those we've served
        </h2>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '12px', color: isLight ? 'rgba(44,44,44,.65)' : 'rgba(255,255,255,.35)', letterSpacing: '.06em' }}>
          120+ homes · 98% client satisfaction
        </p>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg,transparent,#c9933a,transparent)', margin: '14px auto 0' }} />
      </div>

      {/* Wall */}
      <div ref={wallRef} style={{ position: 'relative', height: '700px', width: '100%', overflow: 'hidden' }}>
        <div style={{ position:'absolute', width:'400px', height:'400px', borderRadius:'50%', background:isLight ? 'rgba(165,120,30,.06)' : 'rgba(180,120,30,.07)', filter:'blur(90px)', top:'20%', left:'35%', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'absolute', width:'300px', height:'300px', borderRadius:'50%', background:isLight ? 'rgba(80,60,200,.03)' : 'rgba(80,60,200,.05)', filter:'blur(90px)', top:'50%', left:'8%', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'absolute', width:'260px', height:'260px', borderRadius:'50%', background:isLight ? 'rgba(165,120,30,.05)' : 'rgba(180,120,30,.06)', filter:'blur(90px)', top:'10%', left:'72%', pointerEvents:'none', zIndex:0 }} />
      </div>
    </section>
  )
}