'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Third-party Imports
import classnames from 'classnames'

import type { Mode } from '@core/types'

import Illustrations from '@components/Illustrations'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { SignIn } from '@clerk/nextjs'

const LoginV2 = ({ mode }: { mode: Mode }) => {
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )


  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={{ src: '/images/illustrations/objects/tree-2.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <SignIn />
      </div>
    </div>
  )
}

export default LoginV2
