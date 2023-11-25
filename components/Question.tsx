'use client'

import { FormEvent, useState } from 'react'

import { askQuestion } from '@/utils/api'

const QUESTION = 'question'

const Question = () => {
  const [answer, setAnswer] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const question = formData.get(QUESTION)?.toString().trim()

    if (question == null || question == '') return

    setIsLoading(true)
    const answer = await askQuestion(question)

    setAnswer(answer)
    setIsLoading(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <input disabled={isLoading} name={QUESTION} id={QUESTION} placeholder="Ask a question" />
      <button disabled={isLoading} type="submit">
        Ask
      </button>
      {isLoading ? 'loading...' : null}
      {answer ? <p>{answer}</p> : null}
    </form>
  )
}

export default Question
