import { useState } from 'react';
import SubjectForm from './components/SubjectForm';
import SubjectList from './components/SubjectList';
import './App.css';

// Type definitions remain at the top for clarity
type Grade = 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F' | 'W';

interface Subject {
  name: string;
  grade: Grade;
}

const gradePoints: Record<Grade, number | null> = {
  'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0,
  'D+': 1.5, 'D': 1.0, 'F': 0.0, 'W': null,
};

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = (newSubject: Subject) => {
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (index: number) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const calculateGPA = () => {
    const validGrades = subjects.filter(s => gradePoints[s.grade] !== null);
    const totalPoints = validGrades.reduce((sum, s) => sum + (gradePoints[s.grade] ?? 0), 0);
    const gpaValue = validGrades.length ? totalPoints / validGrades.length : 0;
    setGpa(parseFloat(gpaValue.toFixed(2)));
  };

  return (
    <div className="App">
      <h1>ระบบตัดเกรด</h1>
      <SubjectForm onAddSubject={addSubject} />
      <SubjectList subjects={subjects} onRemoveSubject={removeSubject} />
      <button onClick={calculateGPA}>คำนวณ GPA</button>
      {gpa !== null && <p>GPA: {gpa}</p>}
    </div>
  );
}

export default App;