'use client'

type Props = {
  color?: string
  isNegative?: boolean
  mood?: string
  sentimentScore?: number
  subject?: string
}

const AnalysisComponent = ({ color, isNegative, mood, sentimentScore, subject }: Props) => {
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: subject },
    { name: 'Mood', value: mood },
    { name: 'SentimentScore', value: sentimentScore },
    { name: 'Negative', value: isNegative ? 'Yes' : 'No' },
  ]

  return (
    <div className="border-l border-slate-500">
      <div className="px-6 py-10" style={{ backgroundColor: color }}>
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
  )
}

export default AnalysisComponent
