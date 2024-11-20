// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Início',
    href: '/dashboard/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'About',
    href: '/dashboard/about',
    icon: 'ri-information-line'
  }
]

export default verticalMenuData
