import { Analysis } from '@prisma/client'
import { revalidatePath } from 'next/cache'
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

  const analysisRequestData = await analyze(updatedEntry.content)

  const newAnalysisData = {
    color: analysisRequestData.color,
    isNegative: analysisRequestData.isNegative,
    mood: analysisRequestData.mood,
    sentimentScore: analysisRequestData.sentimentScore,
    subject: analysisRequestData.subject,
    summary: analysisRequestData.summary,
  }

  const updatedAnalysis = await prisma.analysis.upsert({
    create: {
      ...newAnalysisData,
      journalEntryId: updatedEntry.id,
      userId: user.id,
    },
    update: newAnalysisData,
    where: {
      journalEntryId: updatedEntry.id,
      userId: user.id,
    },
  })

  return NextResponse.json({
    body: {
      ...updatedEntry,
      analysis: updatedAnalysis,
    },
  })
}
