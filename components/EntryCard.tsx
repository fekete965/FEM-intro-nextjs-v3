import { Analysis } from '@prisma/client'
import Link from 'next/link'

type Props = {
  analysis?: Analysis
  id: string
  createdAt: Date
}

const EntryCard = ({ analysis, createdAt, id }: Props) => {
  return (
    <li className="text-slate-700 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <Link href={`/journal/${id}`}>
        <h3 className="px-4 py-5 sm:px-6">{createdAt.toLocaleDateString()}</h3>
        <p className="px-4 py-5 sm:p-6">{analysis?.summary}</p>
        <p className="px-4 py-4 sm:px-6">{analysis?.mood}</p>
      </Link>
    </li>
  )
}

export default EntryCard
