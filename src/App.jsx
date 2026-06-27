import { useState } from 'react'
import GradeForm from './components/GradeForm.jsx'
import ResultsTable from './components/ResultsTable.jsx'
import SemesterForm from './components/SemesterForm.jsx'
import SemesterResultsTable from './components/SemesterResultsTable.jsx'
import { calculateCGPA } from './utils/calculateCGPA.js'
import { validateSubjects } from './utils/validateSubject.js'
import { calculateSemesterCGPA } from './utils/calculateSemesterCGPA.js'
import { validateSemesters } from './utils/validateSemester.js'
import './App.css'

let nextSubjectId = 1
let nextSemesterId = 1

function createEmptySubject() {
  return {
    id: nextSubjectId++,
    subjectName: '',
    grade: '',
    credits: '', // Added credits for optional/required subject credits weight
  }
}

function createEmptySemester(name = '') {
  return {
    id: nextSemesterId++,
    semesterName: name,
    gpa: '',
    credits: '',
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('subject')

  // Subject-wise state
  const [subjects, setSubjects] = useState([createEmptySubject()])
  const [subjectRowErrors, setSubjectRowErrors] = useState({})
  const [subjectResults, setSubjectResults] = useState(null)

  // Semester-wise state
  const [semesters, setSemesters] = useState([
    createEmptySemester('Semester 1'),
    createEmptySemester('Semester 2'),
  ])
  const [semesterRowErrors, setSemesterRowErrors] = useState({})
  const [semesterResults, setSemesterResults] = useState(null)

  // Subject handlers
  const handleSubjectChange = (index, field, value) => {
    setSubjects((current) =>
      current.map((subject, subjectIndex) =>
        subjectIndex === index ? { ...subject, [field]: value } : subject,
      ),
    )
    setSubjectRowErrors({})
    setSubjectResults(null)
  }

  const handleAddSubject = () => {
    setSubjects((current) => [...current, createEmptySubject()])
    setSubjectRowErrors({})
    setSubjectResults(null)
  }

  const handleRemoveSubject = (index) => {
    setSubjects((current) => current.filter((_, subjectIndex) => subjectIndex !== index))
    setSubjectRowErrors({})
    setSubjectResults(null)
  }

  const handleCalculateSubjects = () => {
    const validation = validateSubjects(subjects)

    if (!validation.ok) {
      setSubjectRowErrors(validation.rowErrors)
      setSubjectResults(null)
      return
    }

    const calculation = calculateCGPA(validation.subjects)

    if (!calculation.ok) {
      setSubjectRowErrors({})
      setSubjectResults(null)
      return
    }

    setSubjectRowErrors({})
    setSubjectResults(calculation)
  }

  // Semester handlers
  const handleSemesterChange = (index, field, value) => {
    setSemesters((current) =>
      current.map((sem, semIndex) =>
        semIndex === index ? { ...sem, [field]: value } : sem,
      ),
    )
    setSemesterRowErrors({})
    setSemesterResults(null)
  }

  const handleAddSemester = () => {
    const nextNum = semesters.length + 1
    setSemesters((current) => [...current, createEmptySemester(`Semester ${nextNum}`)])
    setSemesterRowErrors({})
    setSemesterResults(null)
  }

  const handleRemoveSemester = (index) => {
    setSemesters((current) => current.filter((_, semIndex) => semIndex !== index))
    setSemesterRowErrors({})
    setSemesterResults(null)
  }

  const handleCalculateSemesters = () => {
    const validation = validateSemesters(semesters)

    if (!validation.ok) {
      setSemesterRowErrors(validation.rowErrors)
      setSemesterResults(null)
      return
    }

    const calculation = calculateSemesterCGPA(validation.semesters)

    if (!calculation.ok) {
      setSemesterRowErrors({})
      setSemesterResults(null)
      return
    }

    setSemesterRowErrors({})
    setSemesterResults(calculation)
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>CGPA Calculator</h1>
        <p>
          Compute your cumulative grade point average or combine semester results instantly.
        </p>
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'subject' ? 'active' : ''}`}
            onClick={() => setActiveTab('subject')}
          >
            Subject-wise GPA
          </button>
          <button
            className={`tab-btn ${activeTab === 'semester' ? 'active' : ''}`}
            onClick={() => setActiveTab('semester')}
          >
            Semester-wise CGPA
          </button>
        </div>
      </header>

      {activeTab === 'subject' ? (
        <>
          <GradeForm
            subjects={subjects}
            rowErrors={subjectRowErrors}
            onSubjectChange={handleSubjectChange}
            onAddSubject={handleAddSubject}
            onRemoveSubject={handleRemoveSubject}
            onCalculate={handleCalculateSubjects}
          />
          {subjectResults && (
            <ResultsTable
              rows={subjectResults.rows}
              cgpa={subjectResults.cgpa}
              totalCredits={subjectResults.totalCredits}
            />
          )}
        </>
      ) : (
        <>
          <SemesterForm
            semesters={semesters}
            rowErrors={semesterRowErrors}
            onSemesterChange={handleSemesterChange}
            onAddSemester={handleAddSemester}
            onRemoveSemester={handleRemoveSemester}
            onCalculate={handleCalculateSemesters}
          />
          {semesterResults && (
            <SemesterResultsTable
              rows={semesterResults.rows}
              cgpa={semesterResults.cgpa}
              totalCredits={semesterResults.totalCredits}
            />
          )}
        </>
      )}
    </main>
  )
}

export default App
