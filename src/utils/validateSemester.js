export function validateSemester({ semesterName, gpa, credits }) {
  const errors = {}

  const trimmedName = semesterName.trim()
  if (!trimmedName) {
    errors.semesterName = 'Semester name is required'
  }

  const gpaStr = String(gpa || '').trim()
  const parsedGpa = parseFloat(gpaStr)
  if (!gpaStr) {
    errors.gpa = 'GPA is required'
  } else if (isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 10) {
    errors.gpa = 'GPA must be a number between 0.00 and 10.00'
  }

  const creditsStr = String(credits || '').trim()
  let parsedCredits = 1
  if (creditsStr) {
    parsedCredits = parseFloat(creditsStr)
    if (isNaN(parsedCredits) || parsedCredits <= 0) {
      errors.credits = 'Credits must be a positive number'
    }
  } else {
    // If empty, defaults to 1 (equal weights)
    parsedCredits = 1
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      semesterName: trimmedName,
      gpa: parsedGpa,
      credits: parsedCredits,
    },
  }
}

export function validateSemesters(semesters) {
  const rowErrors = {}
  const validated = []

  semesters.forEach((semester, index) => {
    const result = validateSemester(semester)
    if (!result.ok) {
      rowErrors[index] = result.errors
    } else {
      validated.push(result.value)
    }
  })

  if (Object.keys(rowErrors).length > 0) {
    return { ok: false, rowErrors }
  }

  return { ok: true, semesters: validated }
}
