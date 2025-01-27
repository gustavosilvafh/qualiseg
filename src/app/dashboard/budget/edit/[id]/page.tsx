'use client'

import type { Dispatch, SetStateAction} from 'react';
import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector from '@mui/material/StepConnector'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { Box, CircularProgress } from '@mui/material'

import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import EditStepClient from './steps/EditStepClient'
import StepReview from './steps/StepReview'
import BudgetValues from './steps/BudgetValues'

// Vars
const steps = [
  {
    title: 'Informações Básicas',
    subtitle: 'Responsável/Empresa'
  },
  {
    title: 'Orçamento Interno',
    subtitle: 'Visualização interna do orçamento'
  },
  {
    title: 'Revisando orçamento',
    subtitle: 'Resumo do orçamento'
  }
]

export interface BudgetInfoProps {
  employeeAmount: number
  functionsAmount: number
  kmAmount: number
  riskFQB: boolean
  cnae: string
  ergonomicRisk: boolean
  riskDegree: number
  responsibleName: string
  responsiblePhone: string
  document: string
  companyName: string
  businessSize: string
}

export interface Parameters {
  id: string
  aboveTwenty: number
  baseValue: number
  discountBy: 'funcionario' | 'funcao'
  name: string
  perEmployee: number
  slug:
    | 'ltcat-sem-risco'
    | 'ltcat-com-risco'
    | 'pgr-sem-risco'
    | 'pgr-com-risco'
    | 'pcmso-com-risco'
    | 'pcmso-sem-risco'
    | 'esocial'
    | 'escritorio'
  upToFive: number
  upToTen: number
  upToTwenty: number
}

const getStepContent = (
  step: number,
  handleNext: () => void,
  handlePrev: () => void,
  budgetDetails: BudgetInfoProps,
  parameters: Parameters[],
  setBudgetDetails: Dispatch<SetStateAction<BudgetInfoProps | undefined>>
) => {
  const tagByStep = [EditStepClient, BudgetValues, StepReview]

  const Tag = tagByStep[step]

  return (
    <Tag
      activeStep={step}
      handleNext={handleNext}
      handlePrev={handlePrev}
      steps={steps}
      budgetDetails={budgetDetails}
      parameters={parameters}
      setBudgetDetails={setBudgetDetails}
    />
  )
}

// Styled Components
const ConnectorHeight = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    minHeight: 20
  }
}))

const EditBudget = ({ params }: { params: { id: string } }) => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [budgetDetails, setBudgetDetails] = useState<BudgetInfoProps>()
  const [parameters, setParameters] = useState<Parameters[]>([])

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

  const fetchBudgetInfos = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/invoice/${params.id}`)

      setBudgetDetails(data)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const getParameters = useCallback(async () => {
    const response = await axios.get('/api/parameters')

    setParameters(response.data)
  }, [])

  useEffect(() => {
    fetchBudgetInfos()
    getParameters()
  }, [])

  return (
    <Card className='flex flex-col lg:flex-row '>
      {!budgetDetails || !parameters ? (
        <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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

          <CardContent className='flex-1 !pbs-5'>
            {getStepContent(activeStep, handleNext, handlePrev, budgetDetails, parameters, setBudgetDetails)}
          </CardContent>
        </>
      )}
    </Card>
  )
}

export default EditBudget
