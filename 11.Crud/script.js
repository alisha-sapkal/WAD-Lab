let students = [];
let editIndex = null;

document.getElementById('studentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;

  if (editIndex === null) {
    students.push({ name, roll });
  } else {
    students[editIndex] = { name, roll };
    editIndex = null;
  }

  this.reset();
  displayStudents();
});

function displayStudents() {
  const tbody = document.getElementById('studentTableBody');
  tbody.innerHTML = '';

  students.forEach((student, index) => {
    const row = `<tr>
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editStudent(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function editStudent(index) {
  document.getElementById('name').value = students[index].name;
  document.getElementById('roll').value = students[index].roll;
  editIndex = index;
}

function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents();
}
