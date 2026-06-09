import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function FieldCard({ field, onUpdate, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        {/* Drag handle */}
        <span
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab text-lg select-none"
        >
          ⠿
        </span>
        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
          {field.type.replace('_', ' ')}
        </span>
        <button
          onClick={() => onRemove(field.id)}
          className="ml-auto text-red-400 hover:text-red-600 text-sm"
        >
          Remove
        </button>
      </div>

      {/* Label */}
      <input
        value={field.label}
        onChange={e => onUpdate(field.id, { label: e.target.value })}
        placeholder="Field label"
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* Placeholder (not for checkbox/radio/dropdown/date) */}
      {!['checkbox', 'radio', 'dropdown', 'date'].includes(field.type) && (
        <input
          value={field.placeholder}
          onChange={e => onUpdate(field.id, { placeholder: e.target.value })}
          placeholder="Placeholder text (optional)"
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      )}

      {/* Options for dropdown/radio */}
      {(field.type === 'dropdown' || field.type === 'radio') && (
        <div className="mb-2">
          <p className="text-xs text-gray-500 mb-1">Options (one per line)</p>
          <textarea
            value={field.options?.join('\n')}
            onChange={e => onUpdate(field.id, { options: e.target.value.split('\n') })}
            rows={3}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      )}

      {/* Required toggle */}
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={field.required}
          onChange={e => onUpdate(field.id, { required: e.target.checked })}
          className="accent-indigo-600"
        />
        Required
      </label>
    </div>
  )
}