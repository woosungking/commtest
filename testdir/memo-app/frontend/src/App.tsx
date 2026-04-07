import { useEffect, useState } from 'react'

interface Memo {
  id: number
  content: string
  createdAt: string
}

const API = '/api/memos'

export default function App() {
  const [memos, setMemos] = useState<Memo[]>([])
  const [content, setContent] = useState('')

  const fetchMemos = () =>
    fetch(API).then(r => r.json()).then(setMemos)

  useEffect(() => { fetchMemos() }, [])

  const addMemo = async () => {
    if (!content.trim()) return
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    setContent('')
    fetchMemos()
  }

  const deleteMemo = async (id: number) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    fetchMemos()
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>메모</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addMemo()}
          placeholder="메모 입력..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addMemo}>추가</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {memos.map(m => (
          <li key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span>{m.content}</span>
            <button onClick={() => deleteMemo(m.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
