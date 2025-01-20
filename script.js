//Initializing and assigning values to variables
const studentForm = document.getElementById("studentForm");
const studentsTable = document.getElementById("studentsTable").querySelector("tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Renders the students list and ensures scrollbar functionality
function renderStudents() {
  studentsTable.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML= `
    <td>${student.name}</td>
    <td>${student.studentId}</td>
    <td>${student.email}</td>
    <td>${student.contact}</td>
    <td>
    <button onclick="editStudent(${index})">Edit</button>
    <button onclick="deleteStudent(${index})">Delete</button>
    </td>
    `;
    studentsTable.appendChild(row); 
  });

  //Scrollbar check for student table
  const RowsBeforeScroll = 3;
  if(studentsTable.rows.length > RowsBeforeScroll) {
    studentsTable.style.overflowY = "auto";
  }
  else{
    studentsTable.style.overflowY = "hidden";
  }
  }

//Adding Event Listener to Student Form

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();// Stops the default form submission behaviour
  const name = studentForm.name.value.trim();
  const studentId = studentForm.studentId.value.trim();
  const email = studentForm.email.value.trim();
  const contact = studentForm.contact.value.trim();

  //Form Validation
if (validateInputs(name, studentId, email, contact)) {
  //Saving student records
  students.push({ name, studentId, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  studentForm.reset();//Resets the form for next entry 
}
});

//Initializing patterns for form inputs
function validateInputs(name, studentId, email, contact) {
  const namePattern = /^[a-zA-Z\s]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactPattern = /^[0-9]{10}$/;

  if(!namePattern.test(name)) {
    alert("Name must contain only characters.");
    return false;
  }
  if(!emailPattern.test(email)) {
    alert("Invalid email format.");
    return false;
  }
  if(!contactPattern.test(contact)){
    alert("Contact number must be 10 digits.");
    return false;
  }
  return true;
}

//Editing and Deleting Student Form Inputs 
function editStudent(index){
  const student = students[index];
  studentForm.name.value = student.name;
  studentForm.studentId.value = student.studentId;
  studentForm.email.value = student.email;
  studentForm.contact.value = student.contact;

  deleteStudent(index);
}

function deleteStudent(index) {
  students.splice(index,1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

document.addEventListener("DOMContentLoaded",renderStudents);

