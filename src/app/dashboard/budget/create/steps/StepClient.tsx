// React Imports
import { type Dispatch, type SetStateAction, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { FormControl, InputLabel, OutlinedInput, Select } from '@mui/material'

import axios from 'axios'

import MenuItem from '@mui/material/MenuItem'

import type { FormikProps } from 'formik'

import DirectionalIcon from '@components/DirectionalIcon'

import { TextMaskCustom } from '@components/InputMask'
import { riskDegree } from '@/app/dashboard/budget/create/steps/riskDegree'
import type { BudgetInfoProps } from '@/app/dashboard/budget/create/page'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
  formik: FormikProps<BudgetInfoProps>
}

const StepClient = ({ activeStep, handleNext, handlePrev, steps, formik }: Props) => {
  const [cnpjDetails, setCnpjDetails] = useState<any>()
  const [cnpj, setCnpj] = useState('')
  const [activities, setActivities] = useState<any[]>([])
  const [risk, setRisk] = useState('')
  const [selectedCnae, setSelectedCnae] = useState(' ')

  const fetchCnpj = async () => {
    const response = (await axios.get(
      `https://open.cnpja.com/office/${cnpj.replaceAll('.', '').replace('/', '').replace('-', '')}`
    )) as any

    setCnpjDetails(response.data)
    setActivities([response.data.mainActivity, ...response.data.sideActivities])
    setSelectedCnae(String(response.data.mainActivity.id))
    setRisk(String(riskDegree.find(riskD => riskD.code === String(response.data.mainActivity.id).slice(0, 5))?.risk))
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <TextField fullWidth helperText='Responsável do orçamento' disabled value={formik.values.responsible} />
      </Grid>

      <Grid item xs={12} md={6}>
        <OutlinedInput
          type={'outlined'}
          id={'contactInfo'}
          fullWidth
          placeholder={'Contato'}
          name='contactInfo'
          value={formik.values.contactInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.contactInfo && formik.errors.contactInfo}
          error={formik.touched.contactInfo && Boolean(formik.errors.contactInfo)}
          inputComponent={TextMaskCustom('(00) 00000-0000') as any}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <OutlinedInput
          type={'outlined'}
          fullWidth
          placeholder={'CNPJ'}
          name='textmask'
          value={cnpj}
          onChange={e => {
            setCnpj(e.target.value)
          }}
          endAdornment={
            <Button
              onClick={() => {
                if (cnpj.length === 18) {
                  fetchCnpj()
                }
              }}
              variant={'contained'}
            >
              Buscar
            </Button>
          }
          id='formatted-text-mask-input'
          inputComponent={TextMaskCustom('00.000.000/0000-00') as any}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth helperText='Razão social' disabled value={cnpjDetails?.company?.name} />
      </Grid>
      {selectedCnae && cnpjDetails?.company?.name && (
        <>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='select-maintenance'>CNAE</InputLabel>
              <Select
                labelId='select-maintenance'
                label='CNAE'
                value={selectedCnae}
                onChange={e => {
                  setRisk(String(riskDegree.find(riskD => riskD.code === String(e.target.value).slice(0, 5))?.risk))
                  setSelectedCnae(String(e.target.value))
                }}
              >
                {activities.map(activity => (
                  <MenuItem key={activity.id} value={activity.id}>
                    {activity.id} - {activity.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth value={risk} disabled helperText={'Grau de risco'} />
          </Grid>
        </>
      )}

      <Grid item xs={12} md={6}>
        <TextField fullWidth type={'number'} helperText={'Quantidade de funcionários'} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth type={'number'} helperText={'Quantidade de funções'} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth type={'number'} helperText={'KM deslocamento'} />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id='select-maintenance'>Oferece risco ergonômico</InputLabel>
          <Select labelId='select-maintenance' defaultValue={'sim'}>
            <MenuItem value={'sim'}>Sim</MenuItem>
            <MenuItem value={'nao'}>Não</MenuItem>
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

export default StepClient
