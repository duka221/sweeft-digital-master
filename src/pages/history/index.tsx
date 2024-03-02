import { useEffect, useState } from 'react'
import { HistoryBox } from './components/history-box'
import 'styles/History/styles.css'

export const HistoryPage = () => {
  const [historyTitles, setHistoryTitles] = useState<Array<string> | null>(
    null
  )

  useEffect(() => {
    const prevSearchedHistory = localStorage.getItem('searched-keys')

    if (prevSearchedHistory) {
      const parsed = JSON.parse(prevSearchedHistory)

      if (Object.keys(parsed).length > 0) {
        setHistoryTitles(parsed)
      }
    }
  }, [])

  if (!historyTitles) {
    return <h1>there is no history</h1>
  }
  return (
    <div className='history-page'>

    <h1> Searched images</h1>
    {historyTitles.length > 0 && historyTitles.map(historyTitle => {
      return (
          <HistoryBox title={historyTitle}/>
      )
    })}
  </div>
  )
}