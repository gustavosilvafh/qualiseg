import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()

  const response = await prisma.invoiceParameter.update({
    where: {
      id: params.id
    },
    data: {
      ...body
    }
  })

  return NextResponse.json(response)
}
