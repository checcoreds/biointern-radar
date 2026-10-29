import { useEffect, useState, type ReactNode } from 'react'
import { DeviceContext } from './deviceContext'
// Context identity and storage helpers live outside this Fast Refresh boundary.
import { DEVICE_KEY, emptyDeviceData, parseDeviceData } from './deviceStorage'

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => {
    try {
      return {
        data: parseDeviceData(localStorage.getItem(DEVICE_KEY)),
        warning: null,
      }
    } catch {
      return {
        data: emptyDeviceData(),
        warning:
          'Saved data could not be read. Changes will be kept on this page; browser storage may be unavailable.',
      }
    }
  })
  const [data, setData] = useState(initial.data)
  const [storageWarning, setStorageWarning] = useState<string | null>(
    initial.warning,
  )
  useEffect(() => {
    try {
      localStorage.setItem(DEVICE_KEY, JSON.stringify(data))
    } catch {
      setStorageWarning(
        'Browser storage is unavailable. Saves and checklist changes will last only while this page remains open.',
      )
    }
  }, [data])
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== DEVICE_KEY && event.key !== null) return
      try {
        setData(parseDeviceData(event.newValue))
      } catch {
        setStorageWarning(
          'Saved data from another tab could not be read. Your current progress is still available here.',
        )
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const toggleSaved = (id: string) =>
    setData((previous) => ({
      ...previous,
      savedIds: previous.savedIds.includes(id)
        ? previous.savedIds.filter((value) => value !== id)
        : [...previous.savedIds, id],
    }))
  const toggleTask = (id: string, task: string) =>
    setData((previous) => {
      const current = previous.checklists[id] ?? []
      return {
        ...previous,
        checklists: {
          ...previous.checklists,
          [id]: current.includes(task)
            ? current.filter((value) => value !== task)
            : [...current, task],
        },
      }
    })
  const resetChecklist = (id: string) =>
    setData((previous) => ({
      ...previous,
      checklists: { ...previous.checklists, [id]: [] },
    }))
  return (
    <DeviceContext.Provider
      value={{ data, toggleSaved, toggleTask, resetChecklist, storageWarning }}
    >
      {children}
    </DeviceContext.Provider>
  )
}
