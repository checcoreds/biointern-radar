import { createContext } from 'react'
import type { DeviceData } from './deviceStorage'

interface DeviceContextValue {
  data: DeviceData
  toggleSaved: (id: string) => void
  toggleTask: (id: string, task: string) => void
  resetChecklist: (id: string) => void
  storageWarning: string | null
}
export const DeviceContext = createContext<DeviceContextValue | null>(null)
