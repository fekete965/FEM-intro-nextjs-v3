import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'

import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

const getJournalEntries = async () => {
  const user = await getUserByClerkId()

  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return journalEntries
}

const JournalPage = async () => {
  const journalEntries = await getJournalEntries()

  return (
    <ul className="grid gap-4 mt-8 grid-cols-3">
      <NewEntryCard />
      {journalEntries.map(entry => (
        <EntryCard analysis={undefined} createdAt={entry.createdAt} key={entry.id} id={entry.id} />
      ))}
    </ul>
  )
}

export default JournalPage
