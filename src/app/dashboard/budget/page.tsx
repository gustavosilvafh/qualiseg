'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import type { MRT_ColumnDef } from 'material-react-table'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import Grid from '@mui/material/Grid'
import { Box, IconButton, Tooltip, type PaperProps } from '@mui/material'
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { format } from 'date-fns'

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<any[]>([])

  const router = useRouter()

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'createdAt',
        header: 'Criado em',
        enableEditing: false,
        size: 150,
        Cell(props) {
          return `${format(new Date(props.cell.getValue() as string), 'dd/MM/yyyy às HH:mm')}h`
        }
      },

      {
        accessorKey: 'responsibleName',
        header: 'Responsável',
        enableEditing: false,
        size: 150
      },
      {
        accessorKey: 'document',
        header: 'Documento',
        size: 50
      },
      {
        accessorKey: 'companyName',
        header: 'Empresa',
        size: 50
      }
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: budgets,
    state: {
      isLoading: !budgets.length
    },
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    localization: MRT_Localization_PT_BR,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title='Visualizar'>
          <IconButton onClick={() => router.push(`/dashboard/budget/edit/${row.original.id}`)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    muiTablePaperProps: () =>
      ({
        width: '100%'
      }) as PaperProps
  })

  const getData = useCallback(async () => {
    const response = await axios.get('/api/invoice')

    setBudgets(response.data)
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

export default BudgetPage
