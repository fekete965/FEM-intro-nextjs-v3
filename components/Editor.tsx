'use client'

import { Analysis, JournalEntry } from '@prisma/client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAutosave } from 'react-autosave'

import { updateJournalEntry } from '@/utils/api'

import AnalysisComponent from './AnalysisComponent'

type Entry = JournalEntry & {
  analysis: Analysis | null
}

type Props = {
  entry: Entry
}

const Editor = ({ entry }: Props) => {
  const [content, setContent] = useState<string>(entry.content)
  const [analysis, setAnalysis] = useState<Analysis | null>(entry.analysis)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isMountedRef = useRef<boolean>(false)

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value)
  }

  useAutosave({
    data: content,
    onSave: async data => {
      if (!isMountedRef.current) return

      setIsLoading(true)

      const updatedEntry = await updateJournalEntry(entry.id, data)

      setAnalysis(updatedEntry.analysis)

      setIsLoading(false)
    },
    interval: 2500,
    saveOnUnmount: false,
  })

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return (
    <>
      <div className="col-span-2 w-full h-full">
        {isLoading ? 'loading...' : null}
        <textarea
          className="w-full h-full text-6xl p-8 text-slate-800 outline-none"
          value={content}
          onChange={onChange}
        />
      </div>
      <AnalysisComponent
        color={analysis?.color}
        isNegative={analysis?.isNegative}
        mood={analysis?.mood}
        sentimentScore={analysis?.sentimentScore}
        subject={analysis?.subject}
      />
    </>
  )
}

export default Editor
