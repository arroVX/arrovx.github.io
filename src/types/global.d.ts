declare global {
  interface Window {
    __LENIS__?: {
      scrollTo: (y: number, opts?: { duration?: number; immediate?: boolean }) => void
      on: (event: string, handler: () => void) => void
      off: (event: string, handler: () => void) => void
      raf: (time: number) => void
      destroy: () => void
      stop: () => void
      start: () => void
    }
  }

  interface ImportMeta {
    env: Readonly<Record<string, string | undefined>>
  }
}

export {}
