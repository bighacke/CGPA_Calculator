function CgpaSummary({ cgpa }) {
  return (
    <div className="cgpa-summary">
      <span className="cgpa-label">CGPA</span>
      <span className="cgpa-value">{cgpa.toFixed(2)}</span>
    </div>
  )
}

export default CgpaSummary
