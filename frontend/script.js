const title = document.querySelector("#title");
const content = document.querySelector("#content");

//creating notes (POST)
function add() {
  fetch("http://localhost:7800/note/create", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      //   console.log(json);
      document.getElementById("outputDiv").innerHTML += `<div class="card">
        <h1>${title.value} </h1>
        <p> ${content.value}</p>

        <button>DELETE</button>
        <button>EDIT</button>
        </div>
        `;
      title.value = "";
      content.value = "";
      read();
    });
}

//read notes(GET)
function read() {
  fetch("http://localhost:7800/note/get")
    .then((response) => response.json())
    .then((json) => {
      //   console.log(json.note);
      document.getElementById("outputDiv").innerHTML = "";
      for (let i = 0; i < json.note.length; i++) {
        document.getElementById("outputDiv").innerHTML += `
            <div class="card">
             <h1>${json.note[i].title} </h1>
             <p> ${json.note[i].content}</p>

             <button onclick = "deleteNote('${json.note[i]._id}')">DELETE</button>
             <button onclick = "getNote('${json.note[i]._id}')">EDIT</button>
            </div>
            `;
      }
    });
}
read();

//getNoteById
function getNote(id) {
  fetch(`http://localhost:7800/note/get/${id}`)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json.note);
      title.value = json.note.title;
      content.value = json.note.content;
    });
  document.getElementById("update-button").setAttribute("onclick", `updateNote('${id}');`);
}

//update note(UPDATE)
function updateNote(id) {
  fetch(`http://localhost:7800/note/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      title.value = "";
      content.value = "";
      read();
    });
}

//delete(DELETE)
function deleteNote(id) {
  // console.log(id);
  fetch(`http://localhost:7800/note/delete/${id}`, {
    method: "DELETE",
  });
  read();
}
