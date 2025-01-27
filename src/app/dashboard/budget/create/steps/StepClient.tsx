// React Imports
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { cnpj } from 'cpf-cnpj-validator'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { FormControl, InputLabel, Select } from '@mui/material'

import axios from 'axios'

import MenuItem from '@mui/material/MenuItem'

import { useFormik } from 'formik'

import { useUser } from '@clerk/nextjs'

import * as yup from 'yup'

import Box from '@mui/material/Box'

import { toast } from 'react-toastify'

import DirectionalIcon from '@components/DirectionalIcon'

import { riskDegree } from '@/app/dashboard/budget/create/steps/riskDegree'
import type { BudgetInfoProps } from '@/app/dashboard/budget/create/page'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const StepClient = ({ activeStep, handlePrev, steps }: Props) => {
  const [activities, setActivities] = useState<any[]>([])

  const router = useRouter()

  const validationSchema = yup.object({
    employeeAmount: yup.number().required().min(1, 'Mínimo de um funcionário'),
    functionsAmount: yup.number().required().min(1, 'Mínimo de uma função'),
    kmAmount: yup.number().required().min(0, 'Distância precisa ser 0 ou maior'),
    riskFQB: yup.boolean().required(),
    cnae: yup.string().required('CNAE é obrigatório'),
    ergonomicRisk: yup.boolean().required(),
    riskDegree: yup.number().required('Risco obrigatório baseado no CNAE'),
    responsiblePhone: yup.string().length(11, 'Número inválido. Ex: 15987654321').required('Telefone é obrigatório'),
    responsibleName: yup.string().min(3, 'Nome inválido. '),
    document: yup
      .string()
      .length(14, 'CNPJ precisa ter exatamente 14 caracteres')
      .test('isValidCnpj', (value, ctx) => {
        if (!cnpj.isValid(value as string)) {
          return ctx.createError({ message: 'CNPJ Inválido' })
        }

        return true
      }),
    companyName: yup.string().required('Preencher CNPJ e buscar informações da empresa'),
    businessSize: yup.string().required()
  })

  const formik = useFormik<BudgetInfoProps>({
    initialValues: {
      employeeAmount: 0,
      functionsAmount: 0,
      kmAmount: 0,
      riskFQB: false,
      cnae: '',
      ergonomicRisk: false,
      riskDegree: 0,
      responsibleName: '',
      document: '',
      companyName: '',
      businessSize: 'MEI',
      responsiblePhone: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const { data } = await axios.post('/api/invoice', values)

        toast('Orçamento criado, indo para edição', { type: 'success' })
        router.push(`/dashboard/budget/edit/${data.id}`)
      } catch (e) {
        console.error(e)
      }
    }
  })

  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      formik.setValues(prevState => ({ ...prevState, responsibleName: user.fullName ?? '' }))
    }
  }, [user, isLoaded])

  const fetchCnpj = async () => {
    const response = (await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${formik.values.document}`)) as any

    const companyName = response.data.razao_social

    await formik.setFieldValue('companyName', companyName)

    setActivities([
      { id: response.data.cnae_fiscal, text: response.data.cnae_fiscal_descricao },
      ...response.data.cnaes_secundarios.map((el: any) => ({ id: el.codigo, text: el.descricao }))
    ])
    await formik.setFieldValue('cnae', String(response.data.cnae_fiscal))
    await formik.setFieldValue(
      'riskDegree',
      riskDegree.find(riskD => riskD.code === String(response.data.cnae_fiscal).slice(0, 5))?.risk
    )
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <InputLabel>Responsável do orçamento</InputLabel>
        <TextField fullWidth disabled value={formik.values.responsibleName} />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputLabel>Telefone do responsável</InputLabel>

        <TextField
          type={'outlined'}
          id={'responsiblePhone'}
          fullWidth
          placeholder={'Contato'}
          name='responsiblePhone'
          value={formik.values.responsiblePhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.responsiblePhone && formik.errors.responsiblePhone}
          error={formik.touched.responsiblePhone && Boolean(formik.errors.responsiblePhone)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel>CNPJ</InputLabel>

        <Box display={'flex'} gap={2}>
          <TextField
            id='document'
            type={'outlined'}
            fullWidth
            placeholder={'CNPJ'}
            name='document'
            value={formik.values.document}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.document && formik.errors.document}
            error={formik.touched.document && Boolean(formik.errors.document)}
          />
          <Button
            onClick={fetchCnpj}
            variant='contained'
            disabled={!!formik.errors.document || !formik.values.document}
          >
            Buscar
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel>Razão social</InputLabel>
        <TextField
          fullWidth
          id={'companyName'}
          name={'companyName'}
          disabled
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.companyName && formik.errors.companyName}
          error={formik.touched.companyName && Boolean(formik.errors.companyName)}
        />
      </Grid>
      {activities.length > 0 ? (
        <>
          <Grid item xs={12} md={6}>
            <InputLabel id='select-maintenance'>CNAE</InputLabel>
            <Select
              labelId='select-maintenance'
              label='CNAE'
              id={'cnae'}
              name={'cnae'}
              value={formik.values.cnae}
              onBlur={formik.handleBlur}
              error={formik.touched.kmAmount && Boolean(formik.errors.kmAmount)}
              fullWidth
              onChange={e => {
                formik.setFieldValue(e.target.name, e.target.value)
                formik.setFieldValue(
                  'riskDegree',
                  riskDegree.find(riskD => riskD.code === String(e.target.value).slice(0, 5))?.risk
                )
              }}
              variant={'outlined' as 'filled'}
            >
              {activities.map(activity => (
                <MenuItem key={activity.id} value={activity.id}>
                  {activity.id} - {activity.text.slice(0, 30)}...
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id='select-maintenance'>Grau de risco</InputLabel>

            <TextField
              fullWidth
              disabled
              id={'riskDegree'}
              name={'riskDegree'}
              value={formik.values.riskDegree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.riskDegree && formik.errors.riskDegree}
              error={formik.touched.riskDegree && Boolean(formik.errors.riskDegree)}
            />
          </Grid>
        </>
      ) : null}

      <Grid item xs={12} md={6}>
        <InputLabel>Quantidade de funcionários</InputLabel>
        <TextField
          fullWidth
          type={'number'}
          id={'employeeAmount'}
          name={'employeeAmount'}
          value={formik.values.employeeAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.employeeAmount && formik.errors.employeeAmount}
          error={formik.touched.employeeAmount && Boolean(formik.errors.employeeAmount)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel>Quantidade de funções</InputLabel>
        <TextField
          fullWidth
          type={'number'}
          id={'functionsAmount'}
          name={'functionsAmount'}
          value={formik.values.functionsAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.functionsAmount && formik.errors.functionsAmount}
          error={formik.touched.functionsAmount && Boolean(formik.errors.functionsAmount)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel>KM deslocamento</InputLabel>
        <TextField
          fullWidth
          type={'number'}
          id={'kmAmount'}
          name={'kmAmount'}
          value={formik.values.kmAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.kmAmount && formik.errors.kmAmount}
          error={formik.touched.kmAmount && Boolean(formik.errors.kmAmount)}
        />
      </Grid>
      <Grid item xs={12} md={6} mt={5}>
        <FormControl fullWidth>
          <InputLabel id='select-maintenance'>Oferece risco ergonômico</InputLabel>
          <Select labelId='select-maintenance' defaultValue={'nao'} variant={'outlined' as 'filled'}>
            <MenuItem value={'sim'}>Sim</MenuItem>
            <MenuItem value={'nao'}>Não</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} mt={5}>
        <FormControl fullWidth>
          <InputLabel id='select-maintenance'>Oferece risco Físico/Químico/Biológico?</InputLabel>
          <Select
            labelId='select-maintenance'
            defaultValue={'sim'}
            variant={'outlined' as 'filled'}
            value={formik.values.riskFQB ? 'sim' : 'nao'}
            onChange={e => {
              formik.setFieldValue('riskFQB', e.target.value === 'sim')
            }}
          >
            <MenuItem value={'sim'}>Sim</MenuItem>
            <MenuItem value={'nao'}>Não</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} mt={5}>
        <FormControl fullWidth>
          <InputLabel id='select-maintenance'>Porte da empresa</InputLabel>
          <Select
            labelId='select-maintenance'
            variant={'outlined' as 'filled'}
            value={formik.values.businessSize}
            onChange={e => {
              formik.setFieldValue('businessSize', e.target.value)
            }}
          >
            <MenuItem value={'MEI'}>MEI</MenuItem>
            <MenuItem value={'ME'}>ME</MenuItem>
            <MenuItem value={'EPP'}>EPP</MenuItem>
            <MenuItem value={'OUTROS'}>OUTROS</MenuItem>
          </Select>
        </FormControl>
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
            color={activeStep === steps.length - 1 ? 'success' : ('primary' as any)}
            onClick={async () => {
              await formik.submitForm()
            }}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='ri-check-line' />
              ) : (
                <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Criar orçamento' : 'Próximo'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepClient
