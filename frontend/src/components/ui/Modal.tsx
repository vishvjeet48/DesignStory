import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm dark:bg-night/80"
            onClick={onClose}
            aria-label="Close modal"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              'relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm bg-cream p-8 shadow-luxury-lg dark:bg-surface',
              className
            )}
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-sand/50 dark:hover:bg-dark"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {title && (
              <h2 className="mb-6 font-display text-2xl font-medium">{title}</h2>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
