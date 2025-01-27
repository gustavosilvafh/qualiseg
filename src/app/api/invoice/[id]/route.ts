import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const onDb = await prisma.invoice.findFirstOrThrow({
    where: {
      id
    }
  })

  return NextResponse.json(onDb)
}
