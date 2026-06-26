import { describe, expect, it } from 'vitest'
import {
  letterToGradePoint,
  parseGradeInput,
  percentageToGradePoint,
} from './gradeMapping.js'

describe('letterToGradePoint', () => {
  it('maps letter grades on a 10-point scale', () => {
    expect(letterToGradePoint('8+')).toBe(10)
    expect(letterToGradePoint('A')).toBe(9)
    expect(letterToGradePoint('b')).toBe(8)
    expect(letterToGradePoint('C')).toBe(7)
    expect(letterToGradePoint('D')).toBe(6)
    expect(letterToGradePoint('E')).toBe(0)
    expect(letterToGradePoint('F')).toBe(0)
  })

  it('returns null for unknown letters', () => {
    expect(letterToGradePoint('Z')).toBeNull()
  })
})

describe('percentageToGradePoint', () => {
  it('maps percentage bands to grade points', () => {
    expect(percentageToGradePoint(100)).toBe(10)
    expect(percentageToGradePoint(80)).toBe(10)
    expect(percentageToGradePoint(85)).toBe(10)
    expect(percentageToGradePoint(75)).toBe(9)
    expect(percentageToGradePoint(65)).toBe(8)
    expect(percentageToGradePoint(55)).toBe(7)
    expect(percentageToGradePoint(45)).toBe(6)
    expect(percentageToGradePoint(39)).toBe(0)
    expect(percentageToGradePoint(0)).toBe(0)
  })
})

describe('parseGradeInput', () => {
  it('parses letter grades', () => {
    expect(parseGradeInput('A')).toEqual({
      ok: true,
      gradeObtained: 'A',
      gradePoint: 9,
      letter: 'A',
    })
    expect(parseGradeInput('8+')).toEqual({
      ok: true,
      gradeObtained: '8+',
      gradePoint: 10,
      letter: '8+',
    })
  })

  it('parses percentage values with or without a percent sign', () => {
    expect(parseGradeInput('85%')).toEqual({
      ok: true,
      gradeObtained: '85%',
      gradePoint: 10,
      letter: '8+',
    })
    expect(parseGradeInput('75')).toEqual({
      ok: true,
      gradeObtained: '75%',
      gradePoint: 9,
      letter: 'A',
    })
  })

  it('rejects out-of-range percentages', () => {
    expect(parseGradeInput('101')).toEqual({
      ok: false,
      error: 'Invalid grade: use 8+, A–F or a percentage (0–100)',
    })
  })
})
