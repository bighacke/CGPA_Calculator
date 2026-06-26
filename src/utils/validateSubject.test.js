import { describe, expect, it } from 'vitest'
import { validateSubject, validateSubjects } from './validateSubject.js'

describe('validateSubject', () => {
  it('accepts valid subject entries', () => {
    const result = validateSubject({
      subjectName: 'Data Structures',
      credits: '4',
      grade: 'A',
    })

    expect(result.ok).toBe(true)
    expect(result.value).toEqual({
      subjectName: 'Data Structures',
      credits: 4,
      gradeObtained: 'A',
      gradePoint: 9,
    })
  })

  it('flags missing subject name', () => {
    const result = validateSubject({
      subjectName: '   ',
      credits: '3',
      grade: 'B',
    })

    expect(result.ok).toBe(false)
    expect(result.errors.subjectName).toBe('Subject name is required')
  })

  it('flags non-positive credits', () => {
    const result = validateSubject({
      subjectName: 'Math',
      credits: '-2',
      grade: 'C',
    })

    expect(result.ok).toBe(false)
    expect(result.errors.credits).toBe('Credits must be a positive number')
  })

  it('flags invalid grades', () => {
    const result = validateSubject({
      subjectName: 'Math',
      credits: '3',
      grade: 'Z',
    })

    expect(result.ok).toBe(false)
    expect(result.errors.grade).toBe(
      'Invalid grade: use 8+, A–F or a percentage (0–100)',
    )
  })
})

describe('validateSubjects', () => {
  it('collects row errors without partial validation', () => {
    const result = validateSubjects([
      { subjectName: 'Valid', credits: '3', grade: 'A' },
      { subjectName: '', credits: '2', grade: 'B' },
    ])

    expect(result.ok).toBe(false)
    expect(result.rowErrors[1].subjectName).toBe('Subject name is required')
  })
})
