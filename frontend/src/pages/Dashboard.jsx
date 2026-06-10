import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import Navbar from '../components/Navbar'
import { useToast } from '../context/ToastContext'

export default function Dashboard() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null) // State track helper for temporary copy success states
  const navigate = useNavigate()
  const { showToast } = useToast()

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
    showToast('Failed to create form', 'error')
  }
}

const deleteForm = async (id) => {
  if (!confirm('Delete this form?')) return
  await api.delete(`/forms/${id}`)
  setForms(forms.filter(f => f.id !== id))
  showToast('Form deleted', 'success')
}

const togglePublish = async (id) => {
  const res = await api.patch(`/forms/${id}/publish`)
  setForms(forms.map(f => f.id === id ? res.data : f))
  showToast(res.data.isPublished ? 'Form published' : 'Form unpublished', 'info')
}

const handleCopyLink = async (slug, id) => {
  const publicUrl = `${window.location.origin}/f/${slug}`
  try {
    await navigator.clipboard.writeText(publicUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    showToast('Link copied to clipboard!', 'success')
  } catch (err) {
    showToast('Failed to copy link', 'error')
  }
}

const handleExpiryChange = async (id, dateValue) => {
  try {
    const isoDate = dateValue ? new Date(dateValue).toISOString() : null
    const res = await api.put(`/forms/${id}`, { expiresAt: isoDate })
    setForms(forms.map(f => f.id === id ? { ...f, expiresAt: isoDate } : f))
    showToast('Expiry date updated', 'success')
  } catch (err) {
    showToast('Failed to update expiry date', 'error')
  }
}
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Forms</h1>
          <button
            onClick={createForm}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
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
            <div key={form.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-semibold text-gray-800 text-base">{form.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  {/* <span>{form.isPublished ? '🟢 Published' : '⚪ Draft'}</span> */}
                  <span>
                    {form.expiresAt && new Date() > new Date(form.expiresAt)
                      ? '🔴 Expired'
                      : form.isPublished
                      ? '🟢 Published'
                      : '⚪ Draft'}
                  </span>
                  <span>•</span>
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">Formid: {form.slug}</span>
                </div>
              </div>

              {/* Functional Controls Block */}
              <div className="flex flex-wrap items-center gap-3 md:self-center">
                
                {/* Feature A: Share copy link trigger layout inline */}
                {form.isPublished && (
                  <button
                    onClick={() => handleCopyLink(form.slug, form.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                      copiedId === form.id
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-100'
                    }`}
                  >
                    {copiedId === form.id ? '✅ Copied link!' : '🔗 Copy Link'}
                  </button>
                )}

                {/* Feature E: Expiry Picker Controller markup element */}
                <div className="flex items-center gap-1.5 border border-gray-200 bg-gray-50 px-2.5 py-1 rounded-lg">
                  <label htmlFor={`exp-${form.id}`} className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Expiry:</label>
                  <input
                    id={`exp-${form.id}`}
                    type="date"
                    value={form.expiresAt ? form.expiresAt.split('T')[0] : ''}
                    onChange={(e) => handleExpiryChange(form.id, e.target.value)}
                    className="bg-transparent text-xs text-gray-700 outline-none cursor-pointer font-medium"
                  />
                </div>

                <div className="h-4 w-px bg-gray-200 hidden sm:block" />

                <button
                  onClick={() => navigate(`/builder/${form.id}`)}
                  className="text-sm text-indigo-600 hover:underline font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/responses/${form.id}`)}
                  className="text-sm text-gray-600 hover:underline font-medium"
                >
                  Responses
                </button>
                <button
                  onClick={() => togglePublish(form.id, form.isPublished)}
                  className={`text-sm px-3 py-1 rounded-full font-medium transition-colors ${
                    form.isPublished ? 'bg-red-50 hover:bg-red-100 text-red-600' : 'bg-green-50 hover:bg-green-100 text-green-600'
                  }`}
                >
                  {form.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => deleteForm(form.id)}
                  className="text-sm text-red-400 hover:text-red-600 transition-colors ml-1"
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