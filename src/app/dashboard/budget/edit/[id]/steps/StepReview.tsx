'use client'

// MUI Imports

import Grid from '@mui/material/Grid'

// Type Imports
import Button from '@mui/material/Button'

import DirectionalIcon from '@components/DirectionalIcon'
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import { BudgetInfoProps, Parameters } from '../page'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
  budgetDetails: BudgetInfoProps
  parameters: Parameters[]
}

const StepReview = ({ activeStep, handleNext, handlePrev, steps, budgetDetails, parameters }: Props) => {
  // Handle Print Button Click
  const handleButtonClick = () => {
    window.print()
  }

  const now = new Date()
  const currentMonth = now.toLocaleString('default', { month: 'short' })

  const invoiceData = {
    id: '4987',
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    country: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: `23 ${currentMonth} ${now.getFullYear()}`,
    budgetDetails
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <PreviewCard
          invoiceData={invoiceData}
          id={invoiceData.id}
          budgetDetails={budgetDetails}
          parameters={parameters}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <PreviewActions onButtonClick={handleButtonClick} />
      </Grid>
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='outlined'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
          >
            Anterior
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='ri-check-line' />
              ) : (
                <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepReview
