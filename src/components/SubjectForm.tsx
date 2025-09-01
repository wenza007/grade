import { useState } from 'react';

type Grade = 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F' | 'W';

interface Subject {
  name: string;
  grade: Grade;
}

const gradePoints: Record<Grade, number | null> = {
  'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0,
  'D+': 1.5, 'D': 1.0, 'F': 0.0, 'W': null,
};

// Define the props with TypeScript interface
interface SubjectFormProps {
  onAddSubject: (newSubject: Subject) => void;
}

function SubjectForm({ onAddSubject }: SubjectFormProps) {
  const [subjectName, setSubjectName] = useState<string>('');
  const [grade, setGrade] = useState<Grade>('A');

  const handleSubmit = () => {
    if (subjectName.trim()) {
      onAddSubject({ name: subjectName.trim(), grade });
      setSubjectName('');
      setGrade('A');
    }
  };

  return (
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
      <button onClick={handleSubmit}>เพิ่มรายวิชา</button>
    </div>
  );
}

export default SubjectForm;