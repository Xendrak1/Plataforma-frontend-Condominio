import { useState, useMemo } from 'react'

// Hook reutilizable para filtrado de tablas
export function useTableFilter<T>(
  data: T[], 
  searchFields: (keyof T)[]
) {
  const [term, setTerm] = useState('')

  const filteredData = useMemo(() => {
    if (!term.trim()) return data

    return data.filter(item => {
      return searchFields.some(field => {
        const value = item[field]
        return value && 
               typeof value === 'string' && 
               value.toLowerCase().includes(term.toLowerCase())
      })
    })
  }, [data, term, searchFields])

  return {
    term,
    setTerm,
    filteredData
  }
}
