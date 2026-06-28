function SemesterResultsTable({ rows, cgpa, totalCredits }) {
  // SVG progress ring calculations
  const radius = 54
  const strokeWidth = 8
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min(Math.max(cgpa / 10, 0), 1)
  const strokeDashoffset = circumference - percentage * circumference

  return (
    <section className="results semester-results">
      <h2>Cumulative CGPA Summary</h2>
      
      <div className="results-summary-card">
        <div className="cgpa-ring-container">
          <svg className="cgpa-ring" width="130" height="130">
            <defs>
              <linearGradient id="cgpaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" /> {/* Purple-violet */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
              </linearGradient>
            </defs>
            <circle
              className="cgpa-ring-bg"
              cx="65"
              cy="65"
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              className="cgpa-ring-indicator"
              cx="65"
              cy="65"
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              stroke="url(#cgpaGrad)"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.8s ease-in-out',
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>
          <div className="cgpa-ring-text">
            <span className="cgpa-value-large">{cgpa.toFixed(2)}</span>
            <span className="cgpa-scale">/ 10.0</span>
          </div>
        </div>

        <div className="cgpa-details">
          <div className="detail-item">
            <span className="detail-label">Overall CGPA</span>
            <span className="detail-value text-glow">{cgpa.toFixed(2)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Credits Earned</span>
            <span className="detail-value">{totalCredits}</span>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Semester / Period</th>
              <th>GPA Obtained</th>
              <th>Credits Weight</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.semester}</td>
                <td>{row.gpa.toFixed(2)}</td>
                <td>{row.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default SemesterResultsTable
