import { describe, expect, it } from 'vitest'
import { validateSubject, validateSubjects } from './validateSubject.js'

describe('validateSubject', () => {
  it('accepts valid subject entries', () => {
    const result = validateSubject({
      subjectName: 'Data Structures',
      grade: 'A',
    })

    expect(result.ok).toBe(true)
    expect(result.value).toEqual({
      subjectName: 'Data Structures',
      credits: 1,
      gradeObtained: 'A',
      gradePoint: 9,
    })
  })

  it('flags missing subject name', () => {
    const result = validateSubject({
      subjectName: '   ',
      grade: 'B',
    })

    expect(result.ok).toBe(false)
    expect(result.errors.subjectName).toBe('Subject name is required')
  })

  it('flags invalid grades', () => {
    const result = validateSubject({
      subjectName: 'Math',
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
      { subjectName: 'Valid', grade: 'A' },
      { subjectName: '', grade: 'B' },
    ])

    expect(result.ok).toBe(false)
    expect(result.rowErrors[1].subjectName).toBe('Subject name is required')
  })
})
