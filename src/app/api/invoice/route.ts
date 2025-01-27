import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

export interface Body {
  employeeAmount: number
  functionsAmount: number
  kmAmount: number
  riskFQB: boolean
  cnae: string
  id?: string
  ergonomicRisk: boolean
  riskDegree: number
  responsiblePhone: string
  responsibleName: string
  document: string
  companyName: string
  businessSize: string
}

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body: Body = await request.json()

  if (body.id) {
    const response = await prisma.invoice.update({
      where: {
        id: body.id
      },
      data: body
    })

    return NextResponse.json(response)
  }

  const response = await prisma.invoice.create({
    data: body
  })

  return NextResponse.json(response)
}

export async function GET() {
  const response = await prisma.invoice.findMany()

  return NextResponse.json(response)
}
