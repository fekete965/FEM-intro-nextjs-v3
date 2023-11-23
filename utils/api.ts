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
