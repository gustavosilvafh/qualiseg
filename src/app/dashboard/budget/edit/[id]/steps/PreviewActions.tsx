// React Imports
import { useState } from 'react'

// Next Imports

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { Dialog, DialogTitle } from '@mui/material'

// Type Imports

// Util Imports

const PreviewActions = ({ onButtonClick }: { onButtonClick: () => void }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleDialogClose = () => setOpen(false)

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-4'>
          <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
            Baixar
          </Button>
          <Button fullWidth color='secondary' variant='outlined' className='capitalize' onClick={handleClickOpen}>
            Visualizar informações
          </Button>
          <Dialog
            onClose={handleDialogClose}
            aria-labelledby='simple-dialog-title'
            open={open}
            closeAfterTransition={false}
          >
            <DialogTitle id='simple-dialog-title'>Resumo do orçamento</DialogTitle>
            teste
          </Dialog>
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
