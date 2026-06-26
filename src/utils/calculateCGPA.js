export function calculateCGPA(subjects) {
  if (!subjects || subjects.length === 0) {
    return { ok: false, error: 'Add at least one subject to calculate CGPA' }
  }

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0)
  if (totalCredits <= 0) {
    return { ok: false, error: 'Total credits must be greater than zero' }
  }

  const weightedSum = subjects.reduce(
    (sum, subject) => sum + subject.gradePoint * subject.credits,
    0,
  )

  const cgpa = Math.round((weightedSum / totalCredits) * 100) / 100

  const rows = subjects.map((subject) => ({
    subject: subject.subjectName,
    credits: subject.credits,
    gradeObtained: subject.gradeObtained,
    gradePoints: subject.gradePoint,
  }))

  return {
    ok: true,
    rows,
    totalCredits,
    cgpa,
  }
}
