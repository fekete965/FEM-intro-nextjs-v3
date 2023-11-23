import Editor from '@/components/Editor'

import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

const getJournalEntry = async (journalId: string) => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.findUniqueOrThrow({
    where: {
      userId_id: {
        userId: user.id,
        id: journalId,
      },
    },
  })

  return entry
}

type Params = {
  id: string
}

type Props = {
  params: Params
}

const JournalEntryPage = async ({ params }: Props) => {
  const journalEntry = await getJournalEntry(params.id)

  return (
    <section className="w-full h-full">
      <Editor content={journalEntry.content} id={journalEntry.id} />
    </section>
  )
}

export default JournalEntryPage
