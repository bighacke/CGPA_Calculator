import SubjectRow from './SubjectRow.jsx'

function GradeForm({
  subjects,
  rowErrors,
  onSubjectChange,
  onAddSubject,
  onRemoveSubject,
  onCalculate,
}) {
  return (
    <form
      className="grade-form"
      onSubmit={(event) => {
        event.preventDefault()
        onCalculate()
      }}
    >
      <div className="form-header">
        <h2>Enter Subject Grades</h2>
        <p>Add each subject with its letter grade, percentage, and optional credits.</p>
      </div>

      <div className="subject-rows">
        {subjects.map((subject, index) => (
          <SubjectRow
            key={subject.id}
            index={index}
            subject={subject}
            errors={rowErrors[index]}
            canRemove={subjects.length > 1}
            onChange={onSubjectChange}
            onRemove={onRemoveSubject}
          />
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="button secondary" onClick={onAddSubject}>
          Add Subject
        </button>
        <button type="submit" className="button primary">
          Calculate CGPA
        </button>
      </div>
    </form>
  )
}

export default GradeForm
