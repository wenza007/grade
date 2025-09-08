import { useState } from "react";

type Subject = {
  name: string;
  grade: string;
};

function GradeApp() {
  const [subject, setSubject] = useState<string>(""); // เก็บชื่อวิชา
  const [grade, setGrade] = useState<string>("");     // เก็บเกรด
  const [subjects, setSubjects] = useState<Subject[]>([]); // รายชื่อวิชาทั้งหมด
  const [gpa, setGpa] = useState<number | null>(null);     // ค่า GPA

  // mapping grade → grade point
  const gradePoints: Record<string, number> = {
    "A": 4.0,
    "B+": 3.5,
    "B": 3.0,
    "C+": 2.5,
    "C": 2.0,
    "D+": 1.5,
    "D": 1.0,
    "F": 0.0,
    "W": NaN   // ถอน ไม่เอามาคิด GPA
  };

  const addSubject = () => {
    if (subject.trim() === "" || grade.trim() === "") return;
    setSubjects([...subjects, { name: subject, grade }]);
    setSubject("");
    setGrade("");
    setGpa(null); // reset GPA ทุกครั้งที่มีการเพิ่ม
  };

  const deleteSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
    setGpa(null);
  };

  const calculateGPA = () => {
    const validGrades = subjects.filter((s) => !isNaN(gradePoints[s.grade]));
    if (validGrades.length === 0) {
      setGpa(0);
      return;
    }
    const totalPoints = validGrades.reduce(
      (sum, s) => sum + gradePoints[s.grade],
      0
    );
    const gpaValue = totalPoints / validGrades.length;
    setGpa(parseFloat(gpaValue.toFixed(2)));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Grade Calculator</h1>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="ชื่อวิชา"
        style={{ marginRight: 10 }}
      />
      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option value="">เลือกเกรด</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="F">F</option>
        <option value="W">W</option>
      </select>
      <button onClick={addSubject} style={{ marginLeft: 10 }}>เพิ่มรายวิชา</button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {subjects.map((s, index) => (
          <li key={index} style={{ margin: "5px 0" }}>
            <span style={{ color: s.grade === "F" ? "red" : "black" }}>
              {s.name} ({s.grade})
            </span>
            <button
              onClick={() => deleteSubject(index)}
              style={{ marginLeft: 10, color: "red" }}
            >
              ลบรายวิชา
            </button>
          </li>
        ))}
      </ul>

      <button onClick={calculateGPA} style={{ marginTop: 20 }}>
        คำนวณ GPA
      </button>

      {gpa !== null && (
        <h2 style={{ marginTop: 20 }}>GPA = {gpa}</h2>
      )}
    </div>
  );
}

export default GradeApp;
