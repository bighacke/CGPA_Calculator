function SubjectRow({ index, subject, errors = {}, canRemove, onChange, onRemove }) {
  return (
    <div className="subject-row">
      <div className="field">
        <label htmlFor={`subject-name-${subject.id}`}>Subject</label>
        <input
          id={`subject-name-${subject.id}`}
          type="text"
          value={subject.subjectName}
          placeholder="Data Structures"
          onChange={(event) =>
            onChange(index, 'subjectName', event.target.value)
          }
        />
        {errors.subjectName && (
          <span className="field-error">{errors.subjectName}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor={`grade-${subject.id}`}>Grade</label>
        <input
          id={`grade-${subject.id}`}
          type="text"
          value={subject.grade}
          placeholder="8+, A or 85%"
          onChange={(event) => onChange(index, 'grade', event.target.value)}
        />
        {errors.grade && <span className="field-error">{errors.grade}</span>}
      </div>

      {canRemove && (
        <button
          type="button"
          className="button remove"
          aria-label={`Remove subject row ${index + 1}`}
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      )}
    </div>
  )
}

export default SubjectRow
