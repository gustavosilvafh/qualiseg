'use client'

// React Imports
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector from '@mui/material/StepConnector'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { useUser } from '@clerk/nextjs'

import type { FormikProps } from 'formik'
import { FormikState, useFormik } from 'formik'

import * as yup from 'yup'

import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import StepClient from '@/app/dashboard/budget/create/steps/StepClient'
import StepReview from '@/app/dashboard/budget/create/steps/StepReview'

// Vars
const steps = [
  {
    title: 'Informações Básicas',
    subtitle: 'Responsável/Empresa'
  },

  {
    title: 'Resumo',
    subtitle: 'Revisão do orçamento'
  }

  // {
  //   title: 'Property Features',
  //   subtitle: 'Bedrooms/Floor No'
  // },
  // {
  //   title: 'Property Area',
  //   subtitle: 'Covered Area'
  // },
  // {
  //   title: 'Price Details',
  //   subtitle: 'Expected Price'
  // }
]

export interface BudgetInfoProps {
  employeeAmount: number
  functionsAmount: number
  kmDistance: number
  riskFQB: boolean
  cnae: string
  ergonomicRisk: boolean
  riskDegree: number
  responsible: string
  contactInfo: string
  client: {
    document: string
    name: string
  }
}

const getStepContent = (
  step: number,
  handleNext: () => void,
  handlePrev: () => void,
  formik: FormikProps<BudgetInfoProps>
) => {
  const tagByStep = [StepClient, StepReview]

  const Tag = tagByStep[step]

  return <Tag activeStep={step} handleNext={handleNext} handlePrev={handlePrev} steps={steps} formik={formik} />
}

// Styled Components
const ConnectorHeight = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    minHeight: 20
  }
}))

const validationSchema = yup.object({
  employeeAmount: yup.number().required().min(1, 'Mínimo de um funcionário'),
  functionsAmount: yup.number().required().min(1, 'Mínimo de uma função'),
  kmDistance: yup.number().required().min(1, 'Mínimo de um funcionário'),
  riskFQB: yup.boolean().required(),
  cnae: yup.string().required('CNAE é obrigatório'),
  ergonomicRisk: yup.boolean().required(),
  riskDegree: yup.boolean().required('Risco obrigatório baseado no CNAE'),
  contactInfo: yup.string().length(14, 'Número inválido'),
  responsible: yup.string().min(3, 'Nome inválido'),
  client: yup
    .object({
      document: yup.string().length(18),
      name: yup.string().required()
    })
    .required()
})

const CreateBudget = () => {
  const formik = useFormik<BudgetInfoProps>({
    initialValues: {
      employeeAmount: 0,
      functionsAmount: 0,
      kmDistance: 0,
      riskFQB: false,
      cnae: '',
      ergonomicRisk: false,
      riskDegree: 0,
      contactInfo: '',
      responsible: '',
      client: {
        document: '',
        name: ''
      }
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      formik.setValues(prevState => ({ ...prevState, responsible: user.fullName ?? '' }))
    }
  }, [user, isLoaded])

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

      <CardContent className='flex-1 !pbs-5'>{getStepContent(activeStep, handleNext, handlePrev, formik)}</CardContent>
    </Card>
  )
}

export default CreateBudget
