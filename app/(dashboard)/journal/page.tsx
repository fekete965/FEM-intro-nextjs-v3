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
      updatedAt: 'desc',
    },
  })

  return journalEntries
}

const JournalPage = async () => {
  const journalEntries = await getJournalEntries()

  return (
    <section className="p-4">
      <h2 className="text-3xl">Journal</h2>
      <ul className="grid gap-4 mt-8 grid-cols-3">
        <NewEntryCard />
        {journalEntries.map(entry => (
          <EntryCard key={entry.id} id={entry.id} />
        ))}
      </ul>
    </section>
  )
}

export default JournalPage
