document.addEventListener("DOMContentLoaded", () => {
    fetch("students.json")
        .then(response => response.json())
        .then(data => displayStudents(data));

    document.getElementById("search").addEventListener("input", filterStudents);
});

function displayStudents(students) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    students.forEach(student => {
        let row = `<tr class="${student.grade > 90 ? 'highlight' : ''}">
                     <td>${student.name}</td>
                     <td>${student.roll}</td>
                     <td>${student.grade}</td>
                   </tr>`;
        tableBody.innerHTML += row;
    });
}

function filterStudents() {
    const query = document.getElementById("search").value.toLowerCase();
    fetch("students.json")
        .then(response => response.json())
        .then(students => {
            const filtered = students.filter(student => 
                student.name.toLowerCase().includes(query) || 
                student.roll.toString().includes(query)
            );
            displayStudents(filtered);
        });
}
