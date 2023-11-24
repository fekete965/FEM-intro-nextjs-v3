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
  const data = await getJournalEntryWithAnalysis(params.id)

  const analysisData = [
    { name: 'Subject', value: data.analysis?.subject },
    { name: 'Summary', value: data.analysis?.subject },
    { name: 'Mood', value: data.analysis?.mood },
    { name: 'SentimentScore', value: data.analysis?.sentimentScore },
    { name: 'Negative', value: data.analysis?.isNegative?.toString() },
  ]

  return (
    <section className="w-full h-full grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Editor content={data.content} id={data.id} />
      </div>
      <div className="border-l border-slate-500">
        <div className="px-6 py-10" style={{ backgroundColor: data.analysis?.color }}>
          <h2 className="text-center text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(data => (
              <li className="flex items-center justify-between px-2 py-4 border-y border-slate-500" key={data.name}>
                <span className="text-lg font-semibold">{data.name}</span>
                <span className="">{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default JournalEntryPage
