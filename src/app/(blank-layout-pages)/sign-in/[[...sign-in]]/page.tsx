// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Entre em sua conta'
}

const SignInPage = () => {
  // Vars
  const mode = getServerMode()

  return <Login mode={mode} type={'sign-in'} />
}

export default SignInPage
