import { useContext } from 'react'
import { DeviceContext } from './deviceContext'

export function useDevice() {
  const value = useContext(DeviceContext)
  if (!value) throw new Error('useDevice requires DeviceProvider')
  return value
}
