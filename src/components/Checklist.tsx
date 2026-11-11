import { Check, ListChecks, RotateCcw } from 'lucide-react'
import type { Category } from '../types/opportunity'
import { useDevice } from '../lib/useDevice'
import { sound } from '../lib/sound'

export const commonTasks = [
  {
    id: 'source',
    label: 'Read the official source and confirm the current cycle and status.',
  },
  {
    id: 'eligibility',
    label: 'Check degree, year-of-study, and GPA eligibility.',
  },
  {
    id: 'practical',
    label: 'Confirm dates, funding, and any visa or travel needs.',
  },
  {
    id: 'materials',
    label: 'Prepare only the application materials requested by the source.',
  },
  {
    id: 'references',
    label:
      'Check document and reference requirements, including separate deadlines.',
  },
]
export function Checklist({
  category,
  opportunityId,
}: {
  category: Category
  opportunityId: string
}) {
  const { data, toggleTask, resetChecklist } = useDevice()
  const tasks = [
    ...commonTasks,
    category === 'Speculative lab outreach'
      ? {
          id: 'outreach',
          label: 'Read the lab’s work and draft a concise, specific enquiry.',
        }
      : {
          id: 'submit',
          label: 'Confirm the application route and submission deadline.',
        },
  ]
  const stored = data.checklists[opportunityId] ?? []
  const checked = tasks.filter((task) => stored.includes(task.id))
  return (
    <section className="checklist panel" aria-labelledby="checklist-title">
      <div className="panel-title">
        <ListChecks size={22} aria-hidden="true" />
        <h2 id="checklist-title">Your preparation checklist</h2>
      </div>
      <p>
        General preparation guidance, not official requirements. Progress is
        saved for this opportunity in this browser, on this device. Clearing
        browser data removes it.
      </p>
      <div className="checklist-progress">
        <span role="status">
          {checked.length} of {tasks.length} steps complete
        </span>
        {checked.length === tasks.length && (
          <span className="complete-note">
            <Check size={16} aria-hidden="true" /> List complete
          </span>
        )}
      </div>
      <progress
        value={checked.length}
        max={tasks.length}
        aria-label="Application preparation progress"
      />
      {tasks.map((task) => (
        <label
          className={`checklist-item ${stored.includes(task.id) ? 'checked' : ''}`}
          key={task.id}
        >
          <input
            type="checkbox"
            checked={stored.includes(task.id)}
            onChange={(event) => {
              toggleTask(opportunityId, task.id)
              // The last tick gets a short chime instead of the usual click.
              if (!event.target.checked) sound.play('untick')
              else if (checked.length === tasks.length - 1)
                sound.play('complete')
              else sound.play('tick')
            }}
          />
          <span>{task.label}</span>
        </label>
      ))}
      <button
        type="button"
        className="reset-checklist"
        onClick={() => resetChecklist(opportunityId)}
        disabled={checked.length === 0}
      >
        <RotateCcw size={16} aria-hidden="true" /> Reset this checklist
      </button>
    </section>
  )
}
