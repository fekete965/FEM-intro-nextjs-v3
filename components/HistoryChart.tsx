'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

const CustomToolTip = ({ active, label, payload }: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || !payload[0].payload) return null

  const analysis = payload[0].payload

  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
      <div className="absolute left-2 top-2 w-2 h-2 rounded-full" style={{ background: analysis.color }}></div>
      <p className="label text-sm text-black/30">{dateLabel}</p>
      <p className="intro text-xl uppercase">{analysis.mood}</p>
    </div>
  )
}

type ChartData = {
  sentimentScore: number
  updatedAt: Date
}

type Props = {
  data: ChartData[]
}

const HistoryCharts = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line activeDot={{ r: 8 }} dataKey="sentimentScore" stroke="#8884d8" strokeWidth={2} type="monotone" />
        <XAxis dataKey="updatedAt" />
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryCharts
