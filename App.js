// ===============================
// STUDENT RECORDS DATA PROCESSOR
// ===============================

const students = [
  { id: 1, name: "Alice Cruz", year: 1, course: "BSIT", grades: [88, 90, 92], enrolled: true },
  { id: 2, name: "Brian Santos", year: 2, course: "BSCS", grades: [85, 87, 89], enrolled: true },
  { id: 3, name: "Carla Reyes", year: 3, course: "BSBA", grades: [91, 93, 95], enrolled: false },
  { id: 4, name: "Daniel Garcia", year: 4, course: "BSIT", grades: [78, 80, 82], enrolled: true },
  { id: 5, name: "Ella Mendoza", year: 1, course: "BSCS", grades: [94, 96, 98], enrolled: true },
  { id: 6, name: "Franz Lopez", year: 2, course: "BSBA", grades: [84, 86, 88], enrolled: false },
  { id: 7, name: "Grace Ramos", year: 3, course: "BSIT", grades: [90, 91, 92], enrolled: true },
  { id: 8, name: "Henry Torres", year: 4, course: "BSCS", grades: [76, 79, 81], enrolled: true },
  { id: 9, name: "Ivy Flores", year: 1, course: "BSBA", grades: [89, 90, 91], enrolled: true },
  { id: 10, name: "Jake Diaz", year: 2, course: "BSIT", grades: [85, 88, 90], enrolled: false },

  { id: 11, name: "Karen Villanueva", year: 3, course: "BSCS", grades: [92, 93, 94], enrolled: true },
  { id: 12, name: "Leo Bautista", year: 4, course: "BSBA", grades: [80, 82, 84], enrolled: true },
  { id: 13, name: "Mia Castro", year: 1, course: "BSIT", grades: [95, 96, 97], enrolled: true },
  { id: 14, name: "Noel Fernandez", year: 2, course: "BSCS", grades: [87, 88, 89], enrolled: false },
  { id: 15, name: "Olivia Gomez", year: 3, course: "BSBA", grades: [90, 92, 94], enrolled: true },
  { id: 16, name: "Paul Herrera", year: 4, course: "BSIT", grades: [83, 84, 85], enrolled: true },
  { id: 17, name: "Queen Ignacio", year: 1, course: "BSCS", grades: [91, 92, 93], enrolled: true },
  { id: 18, name: "Ryan Jimenez", year: 2, course: "BSBA", grades: [77, 79, 81], enrolled: false },
  { id: 19, name: "Sophia Lim", year: 3, course: "BSIT", grades: [98, 99, 100], enrolled: true },
  { id: 20, name: "Tristan Morales", year: 4, course: "BSCS", grades: [86, 87, 88], enrolled: true },

  { id: 21, name: "Uma Navarro", year: 1, course: "BSBA", grades: [88, 89, 90], enrolled: true },
  { id: 22, name: "Victor Ong", year: 2, course: "BSIT", grades: [82, 83, 84], enrolled: false },
  { id: 23, name: "Wendy Perez", year: 3, course: "BSCS", grades: [93, 94, 95], enrolled: true },
  { id: 24, name: "Xander Quinto", year: 4, course: "BSBA", grades: [85, 86, 87], enrolled: true },
  { id: 25, name: "Yana Rivera", year: 1, course: "BSIT", grades: [89, 91, 93], enrolled: true },
  { id: 26, name: "Zack Salazar", year: 2, course: "BSCS", grades: [81, 82, 83], enrolled: false },
  { id: 27, name: "Angela Tan", year: 3, course: "BSBA", grades: [94, 95, 96], enrolled: true },
  { id: 28, name: "Ben Uy", year: 4, course: "BSIT", grades: [79, 80, 81], enrolled: true },
  { id: 29, name: "Chloe Valdez", year: 1, course: "BSCS", grades: [97, 98, 99], enrolled: true },
  { id: 30, name: "David Wong", year: 2, course: "BSBA", grades: [], enrolled: true }
];

// 1. Average Grade
function getAverageGrade(student) {
  if (!student.grades || student.grades.length === 0) {
    return 0;
  }

  return (
    student.grades.reduce((sum, grade) => sum + grade, 0) /
    student.grades.length
  );
}

// 2. Top Students
function getTopStudents(students, n) {
  if (n < 0) {
    throw new Error("n cannot be negative.");
  }

  return [...students]
    .sort((a, b) => getAverageGrade(b) - getAverageGrade(a))
    .slice(0, n);
}

// 3. Group By Course
function groupByCourse(students) {
  return students.reduce((groups, student) => {
    if (!groups[student.course]) {
      groups[student.course] = [];
    }

    groups[student.course].push(student);
    return groups;
  }, {});
}

// 4. Enrolled Count
function getEnrolledCount(students) {
  return {
    enrolled: students.filter(student => student.enrolled).length,
    notEnrolled: students.filter(student => !student.enrolled).length
  };
}

// 5. Find Student
function findStudent(students, name) {
  return (
    students.find(
      student =>
        student.name.toLowerCase() === name.toLowerCase()
    ) || null
  );
}

// 6. Course Averages
function getCourseAverages(students) {
  const grouped = groupByCourse(students);

  return Object.entries(grouped)
    .map(([course, members]) => {
      const avg =
        members.reduce(
          (sum, student) => sum + getAverageGrade(student),
          0
        ) / members.length;

      return {
        course,
        average: avg.toFixed(2)
      };
    })
    .sort((a, b) => b.average - a.average);
}

// 7. Export Summary
function exportSummary(students) {
  const totalStudents = students.length;

  const overallAverage =
    totalStudents === 0
      ? 0
      : students.reduce(
          (sum, student) => sum + getAverageGrade(student),
          0
        ) / totalStudents;

  const topStudent =
    totalStudents === 0
      ? null
      : getTopStudents(students, 1)[0];

  return {
    totalStudents,
    overallAverage: overallAverage.toFixed(2),
    topStudent,
    courseBreakdown: getCourseAverages(students)
  };
}

// Optional: Filter By Year
function filterByYear(students, year) {
  return students.filter(student => student.year === year);
}

// Optional: Sort By Name
function sortByName(students) {
  return [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

// MAIN FUNCTION
function main() {
  console.log("========== STUDENT REPORT ==========\n");

  console.log("Total Students:");
  console.log(students.length);

  console.log("\nOverall Average Grade:");
  console.log(exportSummary(students).overallAverage);

  console.log("\nTop 5 Students:");
  getTopStudents(students, 5).forEach((student, index) => {
    console.log(
      `${index + 1}. ${student.name} - ${getAverageGrade(student).toFixed(2)}`
    );
  });

  console.log("\nEnrollment Count:");
  console.log(getEnrolledCount(students));

  console.log("\nCourse Averages:");
  console.log(getCourseAverages(students));

  console.log("\nSearch Student (Sophia Lim):");
  console.log(findStudent(students, "Sophia Lim"));

  console.log("\nStudents in Year 1:");
  console.log(filterByYear(students, 1).length);

  console.log("\nAlphabetical Order (First 5):");
  console.log(
    sortByName(students)
      .slice(0, 5)
      .map(student => student.name)
  );

  console.log("\nSummary Object:");
  console.log(exportSummary(students));

  console.log("\n========== END OF REPORT ==========");
}

main();