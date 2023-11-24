import { NextRequest, NextResponse } from 'next/server'

import { analyze } from '@/utils/ai'
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

  const analysisData = await analyze(updatedEntry.content)

  const journalAnalysis = await prisma.analysis.findUnique({
    where: {
      journalEntryId: updatedEntry.id,
    },
  })

  if (journalAnalysis) {
    await prisma.analysis.update({
      data: {
        color: analysisData.color,
        isNegative: analysisData.isNegative,
        mood: analysisData.mood,
        sentimentScore: analysisData.sentimentScore,
        subject: analysisData.subject,
        summary: analysisData.summary,
      },
      where: {
        id: journalAnalysis.id,
      },
    })
  } else {
    await prisma.analysis.create({
      data: {
        color: analysisData.color,
        isNegative: analysisData.isNegative,
        journalEntryId: updatedEntry.id,
        mood: analysisData.mood,
        sentimentScore: analysisData.sentimentScore,
        subject: analysisData.subject,
        summary: analysisData.summary,
      },
    })
  }

  return NextResponse.json({ body: updatedEntry })
}
