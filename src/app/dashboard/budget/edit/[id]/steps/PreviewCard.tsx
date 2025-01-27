// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import axios from 'axios'

// Type Imports

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import './print.css'
import { BudgetInfoProps, Parameters } from '../page'
import { useCallback, useEffect, useState } from 'react'

type Props = {
  invoiceData?: any
  id: string
  budgetDetails: BudgetInfoProps
  parameters: Parameters[]
}

const PreviewCard = ({ invoiceData, id, budgetDetails, parameters }: Props) => {
  return (
    <Card className='previewCard'>
      <CardContent className='sm:!p-12'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className='p-6 bg-actionHover rounded'>
              <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center'>
                    <Logo />
                  </div>
                  <div>
                    <Typography color='text.primary'>Qualyseg Servicos Empresariais Ltda</Typography>
                    <Typography color='text.primary'>Rua Mario Prandini, 786, Sala 16</Typography>
                  </div>
                </div>
                <div className='flex flex-col gap-6'>
                  <Typography variant='h5'>{`Orçamento #${id}`}</Typography>
                  <div className='flex flex-col gap-1'>
                    <Typography color='text.primary'>{`Criado em: ${invoiceData?.issuedDate}`}</Typography>
                    <Typography color='text.primary'>{`Validade: ${invoiceData?.dueDate}`}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={12}>
              <Grid item xs={12} sm={12}>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Apresentamos a seguir uma proposta visando atender a necessidade atual dessa conceituada
                    organização. Nossa proposta está focada no atendimento e a aderência à legislação contida nas Normas
                    Regulamentadoras – NRs do Ministério do Trabalho e Emprego – M.T.E.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className='flex flex-col gap-4'>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[300px]'>Cliente</Typography>
                      <Typography className='text-right w-full'>55.409.109 GUSTAVO FRANCISCO DA SILVA FILHO</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[300px]'>CNPJ</Typography>
                      <Typography className='text-right w-full'>55.409.109/0001-79</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[300px]'>Total Funcionários</Typography>
                      <Typography className='text-right w-full'>1</Typography>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className=' border rounded'>
              <table className={tableStyles.table}>
                <thead>
                  <tr className='border-be '>
                    <th className='!bg-transparent font-bold text-center'>GESTÃO DE SEGURANÇA E SAÚDE DO TRABALHO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Typography color='text.primary'>
                        E-SOCIAL – Gestão de eventos à serem prestados ao E social SST (2240, 2220, 2210)
                      </Typography>
                    </td>
                  </tr>
                  <tr className='w-fit'>
                    <td>
                      <Typography color='text.primary' className='w-fit'>
                        LTCAT (Prevideciário, NR 15 - insalubridade e NR 16 - periculosidade) – Laudo Técnico das
                        Condições Ambientais do Trabalho
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className=' border rounded'>
              <table className={tableStyles.table}>
                <thead>
                  <tr className='border-be '>
                    <th className='!bg-transparent font-bold text-center'>GESTÃO DE SEGURANÇA E SAÚDE DO TRABALHO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Typography color='text.primary'>
                        E-SOCIAL – Gestão de eventos à serem prestados ao E social SST (2240, 2220, 2210)
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className=' border rounded'>
              <table className={tableStyles.table}>
                <thead>
                  <tr className='border-be '>
                    <th className='!bg-transparent font-bold text-center'>OUTROS SERVIÇOS INCLUSOS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Typography color='text.primary'>
                        E-SOCIAL – Gestão de eventos à serem prestados ao E social SST (2240, 2220, 2210)
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='flex justify-between flex-col gap-y-4 sm:flex-row'>
              <div className='flex flex-col gap-1 order-2 sm:order-[unset]'>
                <div className='flex items-center gap-2'>
                  <Typography className='font-medium' color='text.primary'>
                    Orçamento emitido por:
                  </Typography>
                  <Typography>Gabriel Maciel</Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <Typography className='font-medium' color='text.primary'>
                    Contato:
                  </Typography>
                  <Typography>(15) 99999-9999</Typography>
                </div>
              </div>
              <div className='min-is-[250px]'>
                <div className='flex items-center justify-between'>
                  <Typography>Investimento mensal:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    12 x R$1800
                  </Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <div></div>
                  <Typography style={{ fontSize: '12px', opacity: 0.5 }}>* Válido para contrato de 12 meses</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider className='border-dashed' />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Typography component='span' className='font-medium' color='text.primary'>
                Observações:
              </Typography>{' '}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
