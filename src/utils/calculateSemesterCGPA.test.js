import { describe, expect, it } from 'vitest'
import { calculateSemesterCGPA } from './calculateSemesterCGPA.js'
import { validateSemester, validateSemesters } from './validateSemester.js'

describe('validateSemester', () => {
  it('passes for valid semester data', () => {
    const result = validateSemester({
      semesterName: 'Semester 1',
      gpa: '8.5',
      credits: '20',
    })
    expect(result.ok).toBe(true)
    expect(result.value).toEqual({
      semesterName: 'Semester 1',
      gpa: 8.5,
      credits: 20,
    })
  })

  it('defaults credits to 1 if empty', () => {
    const result = validateSemester({
      semesterName: 'Semester 2',
      gpa: '9.0',
      credits: '',
    })
    expect(result.ok).toBe(true)
    expect(result.value.credits).toBe(1)
  })

  it('rejects empty semester name', () => {
    const result = validateSemester({
      semesterName: '  ',
      gpa: '9.0',
      credits: '15',
    })
    expect(result.ok).toBe(false)
    expect(result.errors.semesterName).toBeDefined()
  })

  it('rejects out of range gpa', () => {
    const result = validateSemester({
      semesterName: 'Semester 3',
      gpa: '11.5',
      credits: '15',
    })
    expect(result.ok).toBe(false)
    expect(result.errors.gpa).toBeDefined()

    const negativeGpaResult = validateSemester({
      semesterName: 'Semester 3',
      gpa: '-1.0',
      credits: '15',
    })
    expect(negativeGpaResult.ok).toBe(false)
    expect(negativeGpaResult.errors.gpa).toBeDefined()
  })

  it('rejects non-positive credits', () => {
    const result = validateSemester({
      semesterName: 'Semester 4',
      gpa: '8.0',
      credits: '0',
    })
    expect(result.ok).toBe(false)
    expect(result.errors.credits).toBeDefined()

    const negativeCreditsResult = validateSemester({
      semesterName: 'Semester 4',
      gpa: '8.0',
      credits: '-5',
    })
    expect(negativeCreditsResult.ok).toBe(false)
    expect(negativeCreditsResult.errors.credits).toBeDefined()
  })
})

describe('calculateSemesterCGPA', () => {
  it('calculates correct weighted CGPA', () => {
    const result = calculateSemesterCGPA([
      { semesterName: 'Semester 1', gpa: 8.2, credits: 20 },
      { semesterName: 'Semester 2', gpa: 8.8, credits: 22 },
    ])
    expect(result.ok).toBe(true)
    expect(result.totalCredits).toBe(42)
    // (8.2 * 20 + 8.8 * 22) / 42 = (164 + 193.6) / 42 = 357.6 / 42 = 8.514 -> 8.51
    expect(result.cgpa).toBe(8.51)
  })

  it('guards against empty input', () => {
    const result = calculateSemesterCGPA([])
    expect(result.ok).toBe(false)
    expect(result.error).toBe('Add at least one semester to calculate CGPA')
  })

  it('guards against zero total credits', () => {
    const result = calculateSemesterCGPA([
      { semesterName: 'Semester 1', gpa: 8.0, credits: 0 },
    ])
    expect(result.ok).toBe(false)
    expect(result.error).toBe('Total credits must be greater than zero')
  })
})
