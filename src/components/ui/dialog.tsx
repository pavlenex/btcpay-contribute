import * as RadixDialog from '@radix-ui/react-dialog'
import type React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Dialog = RadixDialog.Root

export function DialogContent({
  children,
  className,
  slideFrom = 'bottom',
}: {
  children: React.ReactNode
  className?: string
  slideFrom?: 'left' | 'bottom' | 'right'
}) {
  const slideClasses = {
    left: [
      'data-[state=open]:slide-in-from-left-[60px]',
      'data-[state=closed]:slide-out-to-left-[60px]',
      'data-[state=open]:fade-in-0',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:zoom-in-95',
      'data-[state=closed]:zoom-out-95',
    ],
    right: [
      'data-[state=open]:slide-in-from-right-[60px]',
      'data-[state=closed]:slide-out-to-right-[60px]',
      'data-[state=open]:fade-in-0',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:zoom-in-95',
      'data-[state=closed]:zoom-out-95',
    ],
    bottom: [
      'data-[state=open]:slide-in-from-bottom-[60px]',
      'data-[state=closed]:slide-out-to-bottom-[60px]',
      'data-[state=open]:fade-in-0',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:zoom-in-95',
      'data-[state=closed]:zoom-out-95',
    ],
  }

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <RadixDialog.Content
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
        'glass rounded-2xl shadow-2xl p-6',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'duration-300',
        ...slideClasses[slideFrom],
        className,
      )}
    >
        {children}
        <RadixDialog.Close
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg p-1 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X size={16} />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}

export const DialogTitle = RadixDialog.Title
