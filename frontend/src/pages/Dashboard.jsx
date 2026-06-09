import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/forms')
      .then(res => setForms(res.data))
      .finally(() => setLoading(false))
  }, [])

  const createForm = async () => {
    try {
      const res = await api.post('/forms', { title: 'Untitled Form' })
      navigate(`/builder/${res.data.id}`)
    } catch (err) {
      alert('Failed to create form')
    }
  }

  const deleteForm = async (id) => {
    if (!confirm('Delete this form?')) return
    await api.delete(`/forms/${id}`)
    setForms(forms.filter(f => f.id !== id))
  }

  const togglePublish = async (id, current) => {
    const res = await api.patch(`/forms/${id}/publish`)
    setForms(forms.map(f => f.id === id ? res.data : f))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Forms</h1>
          <button
            onClick={createForm}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            + New Form
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && forms.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No forms yet</p>
            <p className="text-sm mt-1">Click "+ New Form" to get started</p>
          </div>
        )}

        <div className="space-y-4">
          {forms.map(form => (
            <div key={form.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-800">{form.title}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  {form.isPublished ? '🟢 Published' : '⚪ Draft'} · slug: {form.slug}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/builder/${form.id}`)}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/responses/${form.id}`)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Responses
                </button>
                <button
                  onClick={() => togglePublish(form.id, form.isPublished)}
                  className={`text-sm px-3 py-1 rounded-full ${form.isPublished ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                >
                  {form.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => deleteForm(form.id)}
                  className="text-sm text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}