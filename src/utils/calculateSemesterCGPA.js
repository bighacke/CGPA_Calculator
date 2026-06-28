export function calculateSemesterCGPA(semesters) {
  if (!semesters || semesters.length === 0) {
    return { ok: false, error: 'Add at least one semester to calculate CGPA' }
  }

  const totalCredits = semesters.reduce((sum, sem) => sum + sem.credits, 0)
  if (totalCredits <= 0) {
    return { ok: false, error: 'Total credits must be greater than zero' }
  }

  const weightedSum = semesters.reduce(
    (sum, sem) => sum + sem.gpa * sem.credits,
    0,
  )

  const cgpa = Math.round((weightedSum / totalCredits) * 100) / 100

  const rows = semesters.map((sem) => ({
    semester: sem.semesterName,
    gpa: sem.gpa,
    credits: sem.credits,
  }))

  return {
    ok: true,
    rows,
    totalCredits,
    cgpa,
  }
}
