// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'Qualyseg',
  description: 'Qualyseg'
}

// Type Imports
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { ChildrenType } from '@core/types'
import ReactQueryProvider from '@core/providers/QueryClientProvider'

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <ClerkProvider>
      <html id='__next' lang='pt' dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <ReactQueryProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
