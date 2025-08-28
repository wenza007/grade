import { useState } from 'react'
import './App.css'

type Grade = 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F' | 'W'

interface Subject {
  name: string
  grade: Grade
}

const gradePoints: Record<Grade, number | null> = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': null, // ไม่คิดเกรด
}

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [subjectName, setSubjectName] = useState<string>('')
  const [grade, setGrade] = useState<Grade>('A')
  const [gpa, setGpa] = useState<number | null>(null)

  const addSubject = () => {
    if (subjectName.trim()) {
      setSubjects([...subjects, { name: subjectName.trim(), grade }])
      setSubjectName('')
      setGrade('A')
    }
  }

  const removeSubject = (index: number) => {
    const updated = [...subjects]
    updated.splice(index, 1)
    setSubjects(updated)
  }

  const calculateGPA = () => {
    const validGrades = subjects.filter(s => gradePoints[s.grade] !== null)
    const totalPoints = validGrades.reduce((sum, s) => sum + (gradePoints[s.grade] ?? 0), 0)
    const gpaValue = validGrades.length ? totalPoints / validGrades.length : 0
    setGpa(parseFloat(gpaValue.toFixed(2)))
  }

  return (
    <div className="App">
      <h1>ระบบตัดเกรด</h1>

      <div>
        <input
          type="text"
          placeholder="ชื่อวิชา"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value as Grade)}>
          {Object.keys(gradePoints).map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button onClick={addSubject}>เพิ่มรายวิชา</button>
      </div>

      <ul>
        {subjects.map((s, index) => (
          <li key={index} style={{ color: s.grade === 'F' ? 'red' : 'black' }}>
            {s.name} - {s.grade}
            <button onClick={() => removeSubject(index)}>ลบ</button>
          </li>
        ))}
      </ul>

      <button onClick={calculateGPA}>คำนวณ GPA</button>
      {gpa !== null && <p>GPA: {gpa}</p>}
    </div>
  )
}

export default App