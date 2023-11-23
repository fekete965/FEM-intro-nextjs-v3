import { NextRequest, NextResponse } from 'next/server'

import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

type Params = {
  id: string
}

type SearchParams = {
  params: Params
}

export const PATCH = async (req: NextRequest, searchParams: SearchParams) => {
  const user = await getUserByClerkId()

  const body = await req.json()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: searchParams.params.id,
      },
    },
    data: {
      content: body.content,
    },
  })

  return NextResponse.json({ body: updatedEntry })
}
