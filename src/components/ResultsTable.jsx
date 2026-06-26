function ResultsTable({ rows, totalCredits, cgpa }) {
  return (
    <section className="results">
      <h2>CGPA Results</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Credits</th>
              <th>Grade Obtained</th>
              <th>Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.subject}>
                <td>{row.subject}</td>
                <td>{row.credits}</td>
                <td>{row.gradeObtained}</td>
                <td>{row.gradePoints.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="summary-row">
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalCredits}</strong>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr className="summary-row">
              <td></td>
              <td></td>
              <td>
                <strong>CGPA</strong>
              </td>
              <td>
                <strong>{cgpa.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ResultsTable
