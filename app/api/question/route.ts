import { NextResponse } from 'next/server'

import { qa } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

export const POST = async (req: Request) => {
  const user = await getUserByClerkId()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      createdAt: true,
      content: true,
    },
  })

  const body = await req.json()

  const answer = await qa(body.question, entries)

  return NextResponse.json({ answer })
}
