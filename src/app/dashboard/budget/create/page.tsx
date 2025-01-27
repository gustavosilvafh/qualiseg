'use client'

import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector from '@mui/material/StepConnector'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import StepClient from '@/app/dashboard/budget/create/steps/StepClient'

// Vars
const steps = [
  {
    title: 'Informações Básicas',
    subtitle: 'Responsável/Empresa'
  }
]

export interface BudgetInfoProps {
  employeeAmount: number
  id?: string
  functionsAmount: number
  kmAmount: number
  riskFQB: boolean
  cnae: string
  ergonomicRisk: boolean
  riskDegree: number
  responsibleName: string
  document: string
  companyName: string
  businessSize: string
  responsiblePhone: string
}

const getStepContent = (step: number, handleNext: () => void, handlePrev: () => void) => {
  const tagByStep = [StepClient]

  const Tag = tagByStep[step]

  return <Tag activeStep={step} handleNext={handleNext} handlePrev={handlePrev} steps={steps} />
}

// Styled Components
const ConnectorHeight = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    minHeight: 20
  }
}))

const CreateBudget = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      alert('Submitted..!!')
    }
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <Card className='flex flex-col lg:flex-row'>
      <CardContent className='max-lg:border-be lg:border-ie lg:min-is-[300px]'>
        <StepperWrapper className='bs-full'>
          <Stepper activeStep={activeStep} connector={<ConnectorHeight />} orientation='vertical'>
            {steps.map((step, index) => {
              return (
                <Step key={index} onClick={() => setActiveStep(index)}>
                  <StepLabel className='p-0' StepIconComponent={StepperCustomDot}>
                    <div className='step-label cursor-pointer'>
                      <Typography className='step-number' color='text.primary'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title' color='text.primary'>
                          {step.title}
                        </Typography>
                        <Typography className='step-subtitle' color='text.primary'>
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <CardContent className='flex-1 !pbs-5'>{getStepContent(activeStep, handleNext, handlePrev)}</CardContent>
    </Card>
  )
}

export default CreateBudget
