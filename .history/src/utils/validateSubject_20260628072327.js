import { parseGradeInput } from './gradeMapping.js'

export const DEFAULT_SUBJECT_CREDITS = 3

export function validateSubject({ subjectName, grade, credits }) {
  const errors = {}

  const trimmedName = subjectName.trim()
  if (!trimmedName) {
    errors.subjectName = 'Subject name is required'
  }

  const gradeResult = parseGradeInput(grade)
  if (!grade || !grade.trim()) {
    errors.grade = 'Invalid grade: use 8+, A–F or a percentage (0–100)'
  } else if (!gradeResult.ok) {
    errors.grade = gradeResult.error
  }

  const creditsStr = String(credits || '').trim()
  let parsedCredits = DEFAULT_SUBJECT_CREDITS
  if (creditsStr) {
    parsedCredits = parseFloat(creditsStr)
    if (isNaN(parsedCredits) || parsedCredits <= 0) {
      errors.credits = 'Credits must be a positive number'
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      subjectName: trimmedName,
      credits: parsedCredits,
      gradeObtained: gradeResult.gradeObtained,
      gradePoint: gradeResult.gradePoint,
    },
  }
}

export function validateSubjects(subjects) {
  const rowErrors = {}
  const validated = []

  subjects.forEach((subject, index) => {
    const result = validateSubject(subject)
    if (!result.ok) {
      rowErrors[index] = result.errors
    } else {
      validated.push(result.value)
    }
  })

  if (Object.keys(rowErrors).length > 0) {
    return { ok: false, rowErrors }
  }

  return { ok: true, subjects: validated }
}
