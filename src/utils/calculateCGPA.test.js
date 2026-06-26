import { describe, expect, it } from 'vitest'
import { calculateCGPA } from './calculateCGPA.js'

describe('calculateCGPA', () => {
  it('computes weighted CGPA and rounds to two decimals', () => {
    const result = calculateCGPA([
      {
        subjectName: 'Data Structures',
        credits: 1,
        gradeObtained: 'A',
        gradePoint: 9,
      },
      {
        subjectName: 'Advanced Calculus',
        credits: 1,
        gradeObtained: '85%',
        gradePoint: 10,
      },
    ])

    expect(result.ok).toBe(true)
    expect(result.totalCredits).toBe(2)
    expect(result.cgpa).toBe(9.5)
    expect(result.rows).toHaveLength(2)
  })

  it('guards against empty input', () => {
    const result = calculateCGPA([])

    expect(result.ok).toBe(false)
    expect(result.error).toBe('Add at least one subject to calculate CGPA')
  })

  it('guards against zero total credits', () => {
    const result = calculateCGPA([
      {
        subjectName: 'Invalid',
        credits: 0,
        gradeObtained: 'A',
        gradePoint: 9,
      },
    ])

    expect(result.ok).toBe(false)
    expect(result.error).toBe('Total credits must be greater than zero')
  })
})
