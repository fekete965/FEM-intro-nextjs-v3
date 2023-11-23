'use client'

import { useRouter } from 'next/navigation'

import { createNewJournalEntry } from '@/utils/api'

const NewEntryCard = () => {
  const router = useRouter()

  const onClick = async () => {
    const journal = await createNewJournalEntry()

    router.push(`/journal/${journal.id}`)
  }

  return (
    <li
      className="cursor-pointer text-slate-700 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
      onClick={onClick}>
      New Entry
    </li>
  )
}

export default NewEntryCard
