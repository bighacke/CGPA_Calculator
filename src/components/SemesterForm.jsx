import SemesterRow from './SemesterRow.jsx'

function SemesterForm({
  semesters,
  rowErrors,
  onSemesterChange,
  onAddSemester,
  onRemoveSemester,
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
        <h2>Enter Semester GPAs</h2>
        <p>
          Add each semester with its GPA/SGPA and total credits. Leaving credits blank 
          applies equal weighting.
        </p>
      </div>

      <div className="subject-rows">
        {semesters.map((semester, index) => (
          <SemesterRow
            key={semester.id}
            index={index}
            semester={semester}
            errors={rowErrors[index]}
            canRemove={semesters.length > 1}
            onChange={onSemesterChange}
            onRemove={onRemoveSemester}
          />
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="button secondary" onClick={onAddSemester}>
          Add Semester
        </button>
        <button type="submit" className="button primary">
          Calculate Cumulative CGPA
        </button>
      </div>
    </form>
  )
}

export default SemesterForm
