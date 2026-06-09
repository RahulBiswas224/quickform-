import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../lib/api'
import Navbar from '../components/Navbar'

export default function Responses() {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [responses, setResponses] = useState([])
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get(`/forms/${formId}`),
      api.get(`/responses/${formId}`)
    ]).then(([formRes, responsesRes]) => {
      setForm(formRes.data)
      setResponses(responsesRes.data)
    }).finally(() => setLoading(false))
  }, [formId])

  const downloadCSV = async () => {
  try {
    const res = await api.get(`/responses/${formId}/csv`, {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `responses-${formId}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (err) {
    alert('No responses to export yet')
  }
}

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{form?.title}</h1>
            <p className="text-sm text-gray-400 mt-1">{responses.length} response(s)</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
            >
              Download CSV
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back
            </button>
          </div>
        </div>

        {responses.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No responses yet. Share the form link to collect responses.
          </div>
        )}

        <div className="space-y-4">
          {responses.map((r, i) => (
            <div key={r.id} className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-400 mb-3">
                Response #{i + 1} · {new Date(r.submittedAt).toLocaleString()}
              </p>
              <div className="space-y-2">
                {form?.fields.map(field => (
                  <div key={field.id} className="text-sm">
                    <span className="font-medium text-gray-700">{field.label}: </span>
                    <span className="text-gray-600">{String(r.answers[field.id] ?? '—')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}