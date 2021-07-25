// console.log("Online");
showNotes();
// if user adds a note, add it to localStorage
let addBtn = document.getElementById('addButton');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addText");
    let addTtl = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        newNotes = [];
    }
    else {
        newNotes = JSON.parse(notes);
    }
    newNotes.push([addTtl.value,addTxt.value]);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    addTxt.value = "";
    addTtl.value = "";
    // console.log(newNotes);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        newNotes = [];
    }
    else {
        newNotes = JSON.parse(notes);
    }
    let html = "";
    newNotes.forEach(function (element, index) {
        html += `
                <div class="card mx-2 my-2 noteCard" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element[0]}</h5>
                        <p class="card-text">${element[1]}</p>
                        <button id ="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let bufferNote = document.getElementById('notes');
    if (newNotes.length != 0) {
        bufferNote.innerHTML = html;
    }
    else {
        bufferNote.innerHTML = `<p style="text-align: center; color: grey; font-size: large; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" padding="10px">Your Notes seems to be empty. Add a note for yourself..</p>`
    }
}

// function to delete note 
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        newNotes = [];
    }
    else {
        newNotes = JSON.parse(notes);
    }
    // confirm("Are you sure? This will be deleted."); //Use this to add confirmation before deletion 
    newNotes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputValue = search.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
})

let clearAll = document.getElementById("clearBtn");
clearAll.addEventListener("click", function () {
    confirm("Are you sure? Do you want to delete all notes?");
    localStorage.clear();
    showNotes();
});
