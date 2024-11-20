// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Qualiseg',
  description:
    'Qualiseg'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <ClerkProvider>
      <html id='__next' lang='pt' dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
