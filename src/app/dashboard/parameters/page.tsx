'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import type { MRT_ColumnDef } from 'material-react-table'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import type { PaperProps } from '@mui/material'
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR'
import axios from 'axios'

const ParametersPage = () => {
  const [parameters, setParameters] = useState<any[]>([])

  const formatDatabaseValue = (value: number) =>
    (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
        enableEditing: false,
        size: 150
      },

      {
        accessorKey: 'discountBy',
        header: 'Desconto por',
        enableEditing: false,
        size: 150
      },
      {
        accessorKey: 'upToFive',
        header: 'Até 5',
        size: 50,
        Cell: props => formatDatabaseValue(props.cell.getValue() as number)
      },
      {
        accessorKey: 'upToTen',
        header: 'Até 10',
        size: 50,
        Cell: props => formatDatabaseValue(props.cell.getValue() as number)
      },
      {
        accessorKey: 'upToTwenty',
        header: 'Até 20',
        size: 50,
        Cell: props => formatDatabaseValue(props.cell.getValue() as number)
      },
      {
        accessorKey: 'aboveTwenty',
        header: 'Acima de 20',
        size: 50,
        Cell: props => formatDatabaseValue(props.cell.getValue() as number)
      },
      {
        accessorKey: 'baseValue',
        header: 'Valor base',
        size: 50,
        Cell: props => formatDatabaseValue(props.cell.getValue() as number)
      },
      {
        accessorKey: 'perEmployee',
        header: 'Por Funcionário',
        size: 50,
        Cell: props => formatDatabaseValue(props.cell.getValue() as number)
      }
    ],
    []
  )

  const handleSaveParameter = async (props: any) => {
    await axios.post(`/api/parameters/${props.row.original.id}`, {
      upToFive: Number(props.values.upToFive),
      upToTen: Number(props.values.upToTen),
      upToTwenty: Number(props.values.upToTwenty),
      aboveTwenty: Number(props.values.aboveTwenty),
      baseValue: Number(props.values.baseValue),
      perEmployee: Number(props.values.perEmployee)
    })

    props.exitEditingMode()
  }

  const table = useMaterialReactTable({
    columns,
    data: parameters,
    state: {
      isLoading: !parameters.length
    },
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    onEditingRowSave: handleSaveParameter,
    localization: MRT_Localization_PT_BR,
    muiTablePaperProps: () =>
      ({
        width: '100%'
      }) as PaperProps
  })

  const getData = useCallback(async () => {
    const response = await axios.get('/api/parameters')

    setParameters(response.data)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Grid spacing={6}>
      <MaterialReactTable table={table} />
    </Grid>
  )
}

export default ParametersPage
