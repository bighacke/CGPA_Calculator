export const LETTER_TO_POINT = {
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 0,
  F: 0,
}

export const TOP_GRADE_LABEL = '8+'
export const TOP_GRADE_POINT = 10

const PERCENTAGE_BANDS = [
  { min: 80, max: 100, letter: TOP_GRADE_LABEL, point: TOP_GRADE_POINT },
   { min: 70, max: 79, letter: 'A', point: 9 },
  { min: 70, max: 79, letter: 'A', point: 9 },
  { min: 60, max: 69, letter: 'B', point: 8 },
  { min: 50, max: 59, letter: 'C', point: 7 },
  { min: 40, max: 49, letter: 'D', point: 6 },
  { min: 0, max: 39, letter: 'F', point: 0 },
]

const INVALID_GRADE_MESSAGE =
  'Invalid grade: use 8+, A–F or a percentage (0–100)'

export function letterToGradePoint(letter) {
  const normalized = letter.trim().toUpperCase()

  if (normalized === TOP_GRADE_LABEL) {
    return TOP_GRADE_POINT
  }

  if (!(normalized in LETTER_TO_POINT)) {
    return null
  }
  return LETTER_TO_POINT[normalized]
}

export function percentageToGradePoint(percent) {
  const band = PERCENTAGE_BANDS.find(
    (entry) => percent >= entry.min && percent <= entry.max,
  )
  return band ? band.point : null
}

export function percentageToLetter(percent) {
  const band = PERCENTAGE_BANDS.find(
    (entry) => percent >= entry.min && percent <= entry.max,
  )
  return band ? band.letter : null
}

export function parseGradeInput(rawGrade) {
  const trimmed = rawGrade.trim()
  if (!trimmed) {
    return { ok: false, error: 'Grade is required' }
  }

  const percentMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*%?$/)
  if (percentMatch) {
    const percent = Number(percentMatch[1])
    if (percent < 0 || percent > 100) {
      return {
        ok: false,
        error: INVALID_GRADE_MESSAGE,
      }
    }
    const gradePoint = percentageToGradePoint(percent)
    const letter = percentageToLetter(percent)
    return {
      ok: true,
      gradeObtained: `${percent}%`,
      gradePoint,
      letter,
    }
  }

  const normalized = trimmed.toUpperCase()
  const gradePoint = letterToGradePoint(normalized)
  if (gradePoint === null) {
    return {
      ok: false,
      error: INVALID_GRADE_MESSAGE,
    }
  }

  const gradeObtained = normalized === TOP_GRADE_LABEL ? TOP_GRADE_LABEL : normalized

  return {
    ok: true,
    gradeObtained,
    gradePoint,
    letter: gradeObtained,
  }
}
