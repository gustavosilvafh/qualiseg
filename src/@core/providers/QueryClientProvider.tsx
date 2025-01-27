'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
