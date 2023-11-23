'use client'

import { ChangeEvent, useState } from 'react'
import { useAutosave } from 'react-autosave'

import { updateJournalEntry } from '@/utils/api'

type Props = {
  content: string
  id: string
}

const Editor = ({ content, id }: Props) => {
  const [value, setValue] = useState<string>(content)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  useAutosave({
    data: value,
    onSave: async data => {
      setIsLoading(true)

      const updatedEntry = await updateJournalEntry(id, data)

      setIsLoading(false)
    },
    interval: 2500,
    saveOnUnmount: false,
  })

  return (
    <div className="w-full h-full">
      {isLoading ? 'loading...' : null}
      <textarea className="w-full h-full text-6xl p-8 text-slate-800 outline-none" value={value} onChange={onChange} />
      <div></div>
    </div>
  )
}

export default Editor
