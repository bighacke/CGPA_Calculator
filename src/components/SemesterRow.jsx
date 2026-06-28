function SemesterRow({ index, semester, errors = {}, canRemove, onChange, onRemove }) {
  return (
    <div className="semester-row">
      <div className="field">
        <label htmlFor={`semester-name-${semester.id}`}>Semester / Period Name</label>
        <input
          id={`semester-name-${semester.id}`}
          type="text"
          value={semester.semesterName}
          placeholder="e.g., Semester 1 or Prior Cumulative"
          onChange={(event) =>
            onChange(index, 'semesterName', event.target.value)
          }
        />
        {errors.semesterName && (
          <span className="field-error">{errors.semesterName}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor={`gpa-${semester.id}`}>GPA / SGPA</label>
        <input
          id={`gpa-${semester.id}`}
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={semester.gpa}
          placeholder="e.g., 8.50"
          onChange={(event) => onChange(index, 'gpa', event.target.value)}
        />
        {errors.gpa && <span className="field-error">{errors.gpa}</span>}
      </div>

      <div className="field">
        <label htmlFor={`credits-${semester.id}`}>Total Credits (Optional)</label>
        <input
          id={`credits-${semester.id}`}
          type="number"
          min="0.5"
          step="0.5"
          value={semester.credits}
          placeholder="e.g., 20 (defaults to 1)"
          onChange={(event) => onChange(index, 'credits', event.target.value)}
        />
        {errors.credits && <span className="field-error">{errors.credits}</span>}
      </div>

      {canRemove && (
        <button
          type="button"
          className="button remove"
          aria-label={`Remove semester row ${index + 1}`}
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      )}
    </div>
  )
}

export default SemesterRow
