// Type definitions are repeated here for self-contained component use
type Grade = 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F' | 'W';

interface Subject {
  name: string;
  grade: Grade;
}

// Define the props with TypeScript interface
interface SubjectListProps {
  subjects: Subject[];
  onRemoveSubject: (index: number) => void;
}

function SubjectList({ subjects, onRemoveSubject }: SubjectListProps) {
  return (
    <ul>
      {subjects.map((s, index) => (
        <li key={index} style={{ color: s.grade === 'F' ? 'red' : 'black' }}>
          {s.name} - {s.grade}
          <button onClick={() => onRemoveSubject(index)}>ลบ</button>
        </li>
      ))}
    </ul>
  );
}

export default SubjectList;