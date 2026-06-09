import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/constants/routes'
import { WHATSAPP_URL } from '@/constants/social'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { hidden, scrolled } = useScrollDirection()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const transparentHero = onHome && !scrolled

  return (
    <>
      <motion.header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          hidden && '-translate-y-full',
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-5',
          transparentHero && 'mix-blend-difference'
        )}
        initial={false}
      >
        <nav className="container-wide flex items-center justify-between px-6 md:px-10 lg:px-16">
          <Link
            to="/"
            className={cn(
              'font-display text-xl font-medium tracking-tight md:text-2xl',
              transparentHero ? 'text-white' : 'text-charcoal dark:text-mist'
            )}
            data-cursor="hover"
          >
            The Design Story
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'link-underline text-sm tracking-wide transition-colors',
                      transparentHero && 'text-white/90 hover:text-white',
                      !transparentHero &&
                        (isActive
                          ? 'text-brown dark:text-brown-light'
                          : 'text-charcoal/80 hover:text-charcoal dark:text-mist/80')
                    )
                  }
                  data-cursor="hover"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={cn('flex items-center gap-2', transparentHero && '[&_button]:text-white')}>
            <ThemeToggle />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full p-2.5 transition-colors hover:bg-white/10 sm:flex"
              aria-label="WhatsApp"
              data-cursor="hover"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
            </a>
            <button
              type="button"
              className={cn('rounded-full p-2.5 lg:hidden', transparentHero && 'text-white')}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-[#0a0a0a] lg:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-mist/10 p-6">
              <span className="font-display text-xl text-mist">Menu</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-mist">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-2 px-6 py-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="block border-b border-mist/5 py-4 font-display text-4xl text-mist"
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
