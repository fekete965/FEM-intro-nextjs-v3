const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createNewJournalEntry = async () => {
  const url = createUrl('/api/journal')
  const resp = await fetch(url, {
    method: 'POST',
  })

  if (resp.ok) {
    const data = await resp.json()
    return data.body
  }
}

export const updateJournalEntry = async (id: string, content: string) => {
  const url = createUrl(`/api/journal/${id}`)
  const resp = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  })

  if (resp.ok) {
    const data = await resp.json()
    return data.body
  }
}

export const askQuestion = async (question: string) => {
  const url = createUrl(`/api/question`)
  const resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ question }),
  })

  if (resp.ok) {
    const data = await resp.json()
    return data.body
  }
}
