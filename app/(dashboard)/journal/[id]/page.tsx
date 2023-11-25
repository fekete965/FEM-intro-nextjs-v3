import Editor from '@/components/Editor'

import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

const getJournalEntryWithAnalysis = async (journalId: string) => {
  const user = await getUserByClerkId()

  const entryWithAnalysis = await prisma.journalEntry.findUniqueOrThrow({
    where: {
      userId_id: {
        userId: user.id,
        id: journalId,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entryWithAnalysis
}

type Params = {
  id: string
}

type Props = {
  params: Params
}

const JournalEntryPage = async ({ params }: Props) => {
  const entry = await getJournalEntryWithAnalysis(params.id)

  return (
    <section className="w-full h-full grid grid-cols-3 gap-4">
      <Editor entry={entry} />
    </section>
  )
}

export default JournalEntryPage
