import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import api from '../lib/api'
import Navbar from '../components/Navbar'
import FieldCard from '../components/FieldCard'
import { useToast } from '../context/ToastContext'

const FIELD_TYPES = [
  { type: 'short_text', label: 'Short Text' },
  { type: 'long_text', label: 'Long Text' },
  { type: 'email', label: 'Email' },
  { type: 'number', label: 'Number' },
  { type: 'dropdown', label: 'Dropdown' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio' },
  { type: 'date', label: 'Date' },
]

export default function Builder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [fields, setFields] = useState([])
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const { showToast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    api.get(`/forms/${id}`).then(res => {
      setForm(res.data)
      setTitle(res.data.title)
      setFields(res.data.fields || [])
    })
  }, [id])

  const addField = (type) => {
    const newField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type.replace('_', ' ')} field`,
      required: false,
      placeholder: '',
      options: type === 'dropdown' || type === 'radio' ? ['Option 1', 'Option 2'] : []
    }
    setFields([...fields, newField])
  }

  const updateField = (fieldId, updates) => {
    setFields(fields.map(f => f.id === fieldId ? { ...f, ...updates } : f))
  }

  const removeField = (fieldId) => {
    setFields(fields.filter(f => f.id !== fieldId))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id)
      const newIndex = fields.findIndex(f => f.id === over.id)
      setFields(arrayMove(fields, oldIndex, newIndex))
    }
  }

  const saveForm = async () => {
    setSaving(true)
    try {
      await api.put(`/forms/${id}`, { title, fields })
      setSaved(true)
      showToast('Form saved successfully', 'success')
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      showToast('Failed to save form', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <div className="p-10 text-gray-500">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Title */}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-gray-200 focus:border-indigo-500 outline-none pb-2 mb-8"
          placeholder="Form title..."
        />

        {/* Field list */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3 mb-6">
              {fields.map(field => (
                <FieldCard
                  key={field.id}
                  field={field}
                  onUpdate={updateField}
                  onRemove={removeField}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {fields.length === 0 && (
          <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mb-6">
            Add fields from the panel below
          </div>
        )}

        {/* Add field buttons */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <p className="text-xs text-gray-500 font-medium mb-3">ADD FIELD</p>
          <div className="flex flex-wrap gap-2">
            {FIELD_TYPES.map(ft => (
              <button
                key={ft.type}
                onClick={() => addField(ft.type)}
                className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg transition-colors"
              >
                + {ft.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={saveForm}
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Form'}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}