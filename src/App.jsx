import { useState } from 'react'
import GradeForm from './components/GradeForm.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import { calculateCGPA } from './utils/calculateCGPA.js'
import { validateSubjects } from './utils/validateSubject.js'
import './App.css'

let nextSubjectId = 1

function createEmptySubject() {
  return {
    id: nextSubjectId++,
    subjectName: '',
    grade: '',
  }
}

function App() {
  const [subjects, setSubjects] = useState([createEmptySubject()])
  const [rowErrors, setRowErrors] = useState({})
  const [results, setResults] = useState(null)

  const clearResults = () => setResults(null)

  const handleSubjectChange = (index, field, value) => {
    setSubjects((current) =>
      current.map((subject, subjectIndex) =>
        subjectIndex === index ? { ...subject, [field]: value } : subject,
      ),
    )
    setRowErrors({})
    clearResults()
  }

  const handleAddSubject = () => {
    setSubjects((current) => [...current, createEmptySubject()])
    setRowErrors({})
    clearResults()
  }

  const handleRemoveSubject = (index) => {
    setSubjects((current) => current.filter((_, subjectIndex) => subjectIndex !== index))
    setRowErrors({})
    clearResults()
  }

  const handleCalculate = () => {
    const validation = validateSubjects(subjects)

    if (!validation.ok) {
      setRowErrors(validation.rowErrors)
      clearResults()
      return
    }

    const calculation = calculateCGPA(validation.subjects)

    if (!calculation.ok) {
      setRowErrors({})
      clearResults()
      return
    }

    setRowErrors({})
    setResults(calculation)
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>CGPA Calculator</h1>
        <p>
          Enter subject grades to compute your cumulative grade point average.
        </p>
      </header>

      <GradeForm
        subjects={subjects}
        rowErrors={rowErrors}
        onSubjectChange={handleSubjectChange}
        onAddSubject={handleAddSubject}
        onRemoveSubject={handleRemoveSubject}
        onCalculate={handleCalculate}
      />

      {results && (
        <ResultsTable rows={results.rows} cgpa={results.cgpa} />
      )}
    </main>
  )
}

export default App
