// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Type Imports

// Util Imports

const PreviewActions = ({ onButtonClick }: { onButtonClick: () => void }) => {
  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-4'>
          <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
            Baixar
          </Button>
          <div className='flex items-center gap-4'>
            <Button fullWidth color='primary' variant='contained' className='capitalize' onClick={onButtonClick}>
              Imprimir
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default PreviewActions
