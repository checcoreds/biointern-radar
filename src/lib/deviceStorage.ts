export const DEVICE_KEY = 'biointern-radar:device:v1'
export interface DeviceData {
  version: 1
  savedIds: string[]
  checklists: Record<string, string[]>
}
export const emptyDeviceData = (): DeviceData => ({
  version: 1,
  savedIds: [],
  checklists: {},
})

export function parseDeviceData(raw: string | null): DeviceData {
  if (!raw) return emptyDeviceData()
  const value: unknown = JSON.parse(raw)
  if (
    !value ||
    typeof value !== 'object' ||
    !('version' in value) ||
    value.version !== 1 ||
    !('savedIds' in value) ||
    !Array.isArray(value.savedIds) ||
    !value.savedIds.every((id) => typeof id === 'string') ||
    !('checklists' in value) ||
    !value.checklists ||
    typeof value.checklists !== 'object' ||
    Array.isArray(value.checklists)
  )
    throw new Error('Invalid device data')
  const checklists: Record<string, string[]> = Object.create(null)
  for (const [id, tasks] of Object.entries(value.checklists)) {
    if (
      !Array.isArray(tasks) ||
      !tasks.every((task) => typeof task === 'string')
    )
      throw new Error('Invalid checklist')
    checklists[id] = [...new Set(tasks)]
  }
  return { version: 1, savedIds: [...new Set(value.savedIds)], checklists }
}
