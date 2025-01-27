import { useMemo, useState } from 'react'

import { Box, Button, Divider, Grid, IconButton, Tooltip } from '@mui/material'

import type { MRT_ColumnDef, MRT_Row } from 'material-react-table'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

import DeleteIcon from '@mui/icons-material/Delete'

import type { BudgetInfoProps, Parameters } from '../page'
import DirectionalIcon from '@/components/DirectionalIcon'

import { formatValueBR } from '@/utils/string'

import { examsParams, visitas } from './services.constants'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
  budgetDetails: BudgetInfoProps
  parameters: Parameters[]
}

const BudgetValues = ({ activeStep, handlePrev, steps, budgetDetails, parameters }: Props) => {
  const [visitsData, setVisitsData] = useState<any[]>([])
  const [examsData, setExamsData] = useState<any[]>([])
  const ltcatWithRisk = parameters.find(el => el.slug === 'ltcat-com-risco')
  const ltcatWithoutRisk = parameters.find(el => el.slug === 'ltcat-sem-risco')
  const pgrWithRisk = parameters.find(el => el.slug === 'pgr-com-risco')!
  const pgrWithoutRisk = parameters.find(el => el.slug === 'pgr-sem-risco')!
  const pcmsoWithRisk = parameters.find(el => el.slug === 'pcmso-com-risco')!
  const pcmsoWithoutRisk = parameters.find(el => el.slug === 'pcmso-sem-risco')!
  const esocial = parameters.find(el => el.slug === 'esocial')!
  const escritorio = parameters.find(el => el.slug === 'escritorio')!

  const calcLTCAT = () => {
    //budgetDetails.functionsAmount Quantidade de funcoes

    if (!budgetDetails.riskFQB) {
      if (budgetDetails.functionsAmount <= 5) {
        return budgetDetails.functionsAmount * ltcatWithoutRisk!.upToFive + ltcatWithoutRisk!.baseValue
      }

      if (budgetDetails.functionsAmount <= 10) {
        return budgetDetails.functionsAmount * ltcatWithoutRisk!.upToTen + ltcatWithoutRisk!.baseValue
      }

      if (budgetDetails.functionsAmount <= 20) {
        return budgetDetails.functionsAmount * ltcatWithoutRisk!.upToTwenty + ltcatWithoutRisk!.baseValue
      }

      if (budgetDetails.functionsAmount > 20) {
        return budgetDetails.functionsAmount * ltcatWithoutRisk!.aboveTwenty + ltcatWithoutRisk!.baseValue
      }

      return 0
    } else {
      if (budgetDetails.functionsAmount <= 5) {
        return budgetDetails.functionsAmount * ltcatWithRisk!.upToFive + ltcatWithRisk!.baseValue
      }

      if (budgetDetails.functionsAmount <= 10) {
        return budgetDetails.functionsAmount * ltcatWithRisk!.upToTen + ltcatWithRisk!.baseValue
      }

      if (budgetDetails.functionsAmount <= 20) {
        return budgetDetails.functionsAmount * ltcatWithRisk!.upToTwenty + ltcatWithRisk!.baseValue
      }

      if (budgetDetails.functionsAmount > 20) {
        return budgetDetails.functionsAmount * ltcatWithRisk!.aboveTwenty + ltcatWithRisk!.baseValue
      }

      return 0
    }
  }

  function calculaPGR() {
    // Verifica se c24 é "DISPENSA"
    if (ShouldBeDoPGR() === 'DISPENSA') {
      return 0
    }

    // Caso c15 seja "não"
    if (budgetDetails.riskFQB === false) {
      if (budgetDetails.functionsAmount <= 5) {
        return budgetDetails.functionsAmount * pgrWithoutRisk.upToFive + pgrWithoutRisk.baseValue
      } else if (budgetDetails.functionsAmount <= 10) {
        return budgetDetails.functionsAmount * pgrWithoutRisk.upToTen + pgrWithoutRisk.baseValue
      } else if (budgetDetails.functionsAmount <= 20) {
        return budgetDetails.functionsAmount * pgrWithoutRisk.upToTwenty + pgrWithoutRisk.baseValue
      } else if (budgetDetails.functionsAmount >= 21) {
        return budgetDetails.functionsAmount * pgrWithoutRisk.aboveTwenty + pgrWithoutRisk.baseValue
      }
    }

    // Caso c15 seja "sim"
    if (budgetDetails.riskFQB === true) {
      if (budgetDetails.functionsAmount <= 5) {
        return budgetDetails.functionsAmount * pgrWithRisk.upToFive + pgrWithRisk.baseValue
      } else if (budgetDetails.functionsAmount <= 10) {
        return budgetDetails.functionsAmount * pgrWithRisk.upToTen + pgrWithRisk.baseValue
      } else if (budgetDetails.functionsAmount <= 20) {
        return budgetDetails.functionsAmount * pgrWithRisk.upToTwenty + pgrWithRisk.baseValue
      } else if (budgetDetails.functionsAmount >= 21) {
        return budgetDetails.functionsAmount * pgrWithRisk.aboveTwenty + pgrWithRisk.baseValue
      }
    }

    // Retorna vazio caso nenhuma condição seja atendida
    return ''
  }

  const shouldCalcPCMSO = () => {
    if (
      budgetDetails.ergonomicRisk === false &&
      (budgetDetails.businessSize === 'MEI' ||
        (budgetDetails.businessSize === 'ME' &&
          budgetDetails.riskFQB === false &&
          (budgetDetails.riskDegree === 1 || budgetDetails.riskDegree === 2)) ||
        (budgetDetails.businessSize === 'EPP' &&
          budgetDetails.riskFQB === false &&
          (budgetDetails.riskDegree === 1 || budgetDetails.riskDegree === 2)))
    ) {
      return 'DISPENSA'
    }

    return 'FAZER'
  }

  function calcPCMSO() {
    if (shouldCalcPCMSO() === 'DISPENSA') {
      return 0
    }

    if (budgetDetails.riskFQB === false) {
      if (budgetDetails.functionsAmount <= 5) {
        return (
          budgetDetails.functionsAmount * pcmsoWithoutRisk.upToFive +
          pcmsoWithoutRisk.baseValue +
          budgetDetails.employeeAmount * pcmsoWithoutRisk.perEmployee
        )
      } else if (budgetDetails.functionsAmount <= 10) {
        return (
          budgetDetails.functionsAmount * pcmsoWithoutRisk.upToTen +
          pcmsoWithoutRisk.baseValue +
          budgetDetails.employeeAmount * pcmsoWithoutRisk.perEmployee
        )
      } else if (budgetDetails.functionsAmount <= 20) {
        return (
          budgetDetails.functionsAmount * pcmsoWithoutRisk.upToTwenty +
          pcmsoWithoutRisk.baseValue +
          budgetDetails.employeeAmount * pcmsoWithoutRisk.perEmployee
        )
      } else if (budgetDetails.functionsAmount >= 21) {
        return (
          budgetDetails.functionsAmount * pcmsoWithoutRisk.aboveTwenty +
          pcmsoWithoutRisk.baseValue +
          budgetDetails.employeeAmount * pcmsoWithoutRisk.perEmployee
        )
      }
    } else if (budgetDetails.riskFQB === true) {
      if (budgetDetails.functionsAmount <= 5) {
        return (
          budgetDetails.functionsAmount * pcmsoWithRisk.upToFive +
          pcmsoWithRisk.baseValue +
          5 * pcmsoWithRisk.perEmployee
        )
      } else if (budgetDetails.functionsAmount <= 10) {
        return (
          budgetDetails.functionsAmount * pcmsoWithRisk.upToTen +
          pcmsoWithRisk.baseValue +
          5 * pcmsoWithRisk.perEmployee
        )
      } else if (budgetDetails.functionsAmount <= 20) {
        return (
          budgetDetails.functionsAmount * pcmsoWithRisk.upToTwenty +
          pcmsoWithRisk.baseValue +
          5 * pcmsoWithRisk.perEmployee
        )
      } else if (budgetDetails.functionsAmount >= 21) {
        return (
          budgetDetails.functionsAmount * pcmsoWithRisk.aboveTwenty +
          pcmsoWithRisk.baseValue +
          5 * pcmsoWithRisk.perEmployee
        )
      }
    }

    return null // Retorno padrão caso nenhuma condição seja atendida
  }

  const ShouldBeDoPGR = () => {
    if (
      budgetDetails.businessSize === 'MEI' ||
      (budgetDetails.businessSize === 'ME' &&
        budgetDetails.riskFQB === false &&
        (budgetDetails.riskDegree === 1 || budgetDetails.riskDegree === 2)) ||
      (budgetDetails.businessSize === 'EPP' &&
        budgetDetails.riskFQB === false &&
        (budgetDetails.riskDegree === 1 || budgetDetails.riskDegree === 2))
    ) {
      return 'DISPENSA'
    } else {
      return 'FAZER'
    }
  }

  const calcEsocial = () => {
    if (budgetDetails.employeeAmount <= 5) {
      return budgetDetails.employeeAmount * esocial.upToFive
    } else if (budgetDetails.employeeAmount <= 10) {
      return budgetDetails.employeeAmount * esocial.upToTen
    } else if (budgetDetails.employeeAmount <= 20) {
      return budgetDetails.employeeAmount * esocial.upToTwenty
    } else if (budgetDetails.employeeAmount >= 21) {
      return budgetDetails.employeeAmount * esocial.aboveTwenty
    }

    return '' // Retorna vazio se nenhuma condição for atendida
  }

  const calcEscritorio = () => {
    const resultado =
      budgetDetails.employeeAmount <= 5
        ? budgetDetails.employeeAmount * escritorio.upToFive
        : budgetDetails.employeeAmount <= 10
          ? budgetDetails.employeeAmount * escritorio.upToTen
          : budgetDetails.employeeAmount <= 20
            ? budgetDetails.employeeAmount * escritorio.upToTwenty
            : budgetDetails.employeeAmount >= 21
              ? budgetDetails.employeeAmount * escritorio.aboveTwenty
              : ''

    return resultado
  }

  const workSecurity = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'service',
        header: 'Serviço',
        enableEditing: false,
        size: 80
      },
      {
        accessorKey: 'recommendation',
        header: 'Recomendação',
        enableEditing: false,
        size: 80
      },

      {
        accessorKey: 'calculatedValue',
        header: 'Valor calculado',
        Cell(props) {
          return formatValueBR((props.cell.getValue() as number) / 100)
        },
        enableEditing: false,
        size: 80
      },
      {
        accessorKey: 'value',
        header: 'Valor a cobrar',
        enableEditing: true,
        size: 80,
        Cell(props) {
          return formatValueBR((props.cell.getValue() as number) / 100)
        }
      }
    ],
    []
  )

  const visitsColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'service',
        header: 'Serviço',
        enableEditing: true,
        editSelectOptions: visitas.filter(visit => !visitsData.find(vs => vs.service === visit.value)),
        muiEditTextFieldProps: {
          select: true
        },
        Cell(props) {
          return visitas.find(visit => visit.value === props.cell.getValue())?.label
        },
        size: 80
      },
      {
        accessorKey: 'quantity',
        header: 'Quantidade',
        enableEditing: true,
        muiEditTextFieldProps: {
          type: 'number',
          required: true
        },
        size: 80
      },

      {
        accessorKey: 'value',
        header: 'Valor venda',
        Cell(props) {
          return formatValueBR((props.cell.getValue() as number) / 100)
        },
        enableEditing: false,
        size: 80
      }
    ],
    [visitsData]
  )

  const examsColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'service',
        header: 'Serviço',
        enableEditing: true,
        editSelectOptions: examsParams.filter(ex => !examsData.find(vs => vs.service === ex.value)),
        muiEditTextFieldProps: {
          select: true
        },
        Cell(props) {
          return examsParams.find(ex => ex.value === props.cell.getValue())?.label
        },
        size: 80
      },
      {
        accessorKey: 'quantity',
        header: 'Quantidade',
        enableEditing: true,
        muiEditTextFieldProps: {
          type: 'number',
          required: true
        },
        size: 80
      },

      {
        accessorKey: 'value',
        header: 'Valor venda',
        Cell(props) {
          return formatValueBR((props.cell.getValue() as number) / 100)
        },
        enableEditing: false,
        size: 80
      }
    ],
    [visitsData]
  )

  const data = useMemo(
    () => [
      {
        service: 'LTCAT',
        calculatedValue: calcLTCAT(),
        quantity: '',
        recommendation: '',
        value: calcLTCAT()
      },
      {
        service: 'PGR',
        calculatedValue: calculaPGR(),
        quantity: 'N/A',
        recommendation: ShouldBeDoPGR(),
        value: calculaPGR()
      },
      {
        service: 'PCMSO',
        calculatedValue: calcPCMSO(),
        recommendation: shouldCalcPCMSO(),
        quantity: 'N/A',
        value: calcPCMSO()
      },
      {
        service: 'ESOCIAL',
        calculatedValue: calcEsocial(),
        recommendation: '',
        quantity: 'N/A',
        value: calcEsocial()
      },
      {
        service: 'ESCRITORIO',
        calculatedValue: calcEscritorio(),
        recommendation: '',
        quantity: 'N/A',
        value: calcEscritorio()
      }
    ],
    []
  )

  const workSecurityTable = useMaterialReactTable({
    columns: workSecurity,
    data: data
  })

  const openDeleteConfirmModal = (row: MRT_Row<any>) => {
    setVisitsData(visitsData.filter(el => el.service !== row.original.service))
  }

  const openDeleteConfirmModalExam = (row: MRT_Row<any>) => {
    setExamsData(examsData.filter(el => el.service !== row.original.service))
  }

  const handleCreateService = ({ values }: any) => {
    const calcValue = (service: string) => {
      if (service === 'desloc') {
        return budgetDetails.kmAmount * 0.8 * Number(values.quantity) * 100
      }

      const svc = visitas.find(el => el.value === service)!

      return Number(values.quantity) * svc.unitValue + budgetDetails.kmAmount * 0.8 * Number(values.quantity) * 100
    }

    setVisitsData([...visitsData, { ...values, value: calcValue(values.service) }])
    visitsTable.setCreatingRow(null) //exit creating mode
  }

  const handleCreateExamService = ({ values }: any) => {
    const calcValue = (service: string) => {
      const svc = examsParams.find(el => el.value === service)!

      return Number(values.quantity) * svc.cost
    }

    setExamsData([...examsData, { ...values, value: calcValue(values.service) }])
    examTable.setCreatingRow(null) //exit creating mode
  }

  const visitsTable = useMaterialReactTable({
    columns: visitsColumns,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    onCreatingRowSave: handleCreateService,

    getRowId: row => row.id,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant='contained'
        onClick={() => {
          table.setCreatingRow(true)
        }}
      >
        Adicionar visita
      </Button>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    data: visitsData
  })

  const examTable = useMaterialReactTable({
    columns: examsColumns,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    onCreatingRowSave: handleCreateExamService,

    getRowId: row => row.id,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant='contained'
        onClick={() => {
          table.setCreatingRow(true)
        }}
      >
        Adicionar exame
      </Button>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => openDeleteConfirmModalExam(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    data: examsData
  })

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>
          Segurança no trabalho - Total{' '}
          {formatValueBR(data.reduce((acc, act) => (Number(act.value) || 0) + acc, 0) / 100)}
        </h3>
        <MaterialReactTable table={workSecurityTable} />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>
          Visistas - {formatValueBR(visitsData.reduce((acc, act) => (Number(act.value) || 0) + acc, 0) / 100)}
        </h3>

        <MaterialReactTable table={visitsTable} />

        <Divider />
      </Grid>
      <Grid item xs={12}>
        <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>
          Exames - {formatValueBR(examsData.reduce((acc, act) => (Number(act.value) || 0) + acc, 0) / 100)}
        </h3>

        <MaterialReactTable table={examTable} />

        <Divider />
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
              //   await formik.submitForm()
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

export default BudgetValues
