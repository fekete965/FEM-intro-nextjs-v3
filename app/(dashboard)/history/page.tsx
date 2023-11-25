import HistoryCharts from '@/components/HistoryChart'

import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

const getSentimentData = async () => {
  const user = await getUserByClerkId()

  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analysis.reduce((acc, analysis) => acc + analysis.sentimentScore, 0)
  const avg = Math.round(sum / analysis.length)

  return { avg, analysis }
}

const HistoryPage = async () => {
  const { avg, analysis } = await getSentimentData()

  return (
    <>
      <h2 className="flex justify-center items-center text-3xl col-span-7 row-span-1">History</h2>
      <h3>Avg. Sentiment {avg}</h3>
      <div className="w-96 h-32">
        <HistoryCharts data={analysis} />
      </div>
    </>
  )
}

export default HistoryPage
