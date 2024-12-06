// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Início',
    href: '/dashboard/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'Configurações',
    icon: 'ri-survey-line',
    children: [
      {
        label: 'Parâmetros',
        href: '/dashboard/parameters'
      }
    ]
  },
  {
    label: 'Novo orçamento',
    href: '/dashboard/budget/create',
    icon: 'ri-file-paper-2-fill'
  }
]

export default verticalMenuData
