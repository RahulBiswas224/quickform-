import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'

export default function PublicForm() {
  const { slug } = useParams()
  const [form, setForm] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/forms/public/${slug}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Form not found or not published'))
      .finally(() => setLoading(false))
  }, [slug])

  const handleChange = (fieldId, value) => {
    setAnswers({ ...answers, [fieldId]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post(`/responses/${form.id}`, { answers })
      setSubmitted(true)
    } catch (err) {
      setError('Failed to submit. Please try again.')
    }
  }

  if (loading) return <div className="p-10 text-center text-gray-500">Loading form...</div>
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>
  if (submitted) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-sm text-center">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-800">Response submitted!</h2>
        <p className="text-gray-500 mt-2">Thank you for filling out this form.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{form.title}</h1>
        <hr className="mb-6" />
        <form onSubmit={handleSubmit} className="space-y-5">
          {form.fields.map(field => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === 'short_text' && (
                <input type="text" placeholder={field.placeholder} required={field.required}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              )}
              {field.type === 'long_text' && (
                <textarea placeholder={field.placeholder} required={field.required} rows={4}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              )}
              {field.type === 'email' && (
                <input type="email" placeholder={field.placeholder} required={field.required}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              )}
              {field.type === 'number' && (
                <input type="number" placeholder={field.placeholder} required={field.required}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              )}
              {field.type === 'date' && (
                <input type="date" required={field.required}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              )}
              {field.type === 'dropdown' && (
                <select required={field.required}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option value="">Select an option</option>
                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
              {field.type === 'radio' && (
                <div className="space-y-1">
                  {field.options?.map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="radio" name={field.id} value={opt} required={field.required}
                        onChange={e => handleChange(field.id, e.target.value)}
                        className="accent-indigo-600" />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {field.type === 'checkbox' && (
                <input type="checkbox"
                  onChange={e => handleChange(field.id, e.target.checked)}
                  className="accent-indigo-600" />
              )}
            </div>
          ))}

          <button type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}