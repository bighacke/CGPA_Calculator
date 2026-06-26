import { parseGradeInput } from './gradeMapping.js'

export function validateSubject({ subjectName, credits, grade }) {
  const errors = {}

  const trimmedName = subjectName.trim()
  if (!trimmedName) {
    errors.subjectName = 'Subject name is required'
  }

  const creditsValue = credits.trim()
  if (!creditsValue) {
    errors.credits = 'Credits must be a positive number'
  } else {
    const parsedCredits = Number(creditsValue)
    if (Number.isNaN(parsedCredits) || parsedCredits <= 0) {
      errors.credits = 'Credits must be a positive number'
    }
  }

  const gradeResult = parseGradeInput(grade)
  if (!grade.trim()) {
    errors.grade = 'Invalid grade: use 8+, A–F or a percentage (0–100)'
  } else if (!gradeResult.ok) {
    errors.grade = gradeResult.error
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      subjectName: trimmedName,
      credits: Number(creditsValue),
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
