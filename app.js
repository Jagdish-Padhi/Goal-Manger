let save = document.querySelector("#Save");

//learnt: avoid to store trimed value directly in var
// let goal = document.querySelector("#goal").value.trim();

//for zoom effect
const btnZoom = (btn) => {
  btn.style.transform = "scale(1.1)";
  btn.style.border = "2px solid black";
  btn.style.transition = "transform 0.2s ease";

  
  //come back to initial state
  setTimeout(() => {
    btn.style.transform = "scale(1)";
    btn.style.border = "1.5px solid black";
  }, 200);
};

//function to clear all
const clearAll = () => {
  document.querySelector("#list").innerText = "";
  document.querySelector("#goal").value = "";

  //Clear local storage
  localStorage.removeItem("goals");

  //reset add button
  save.innerText = "Add";
  save.style.backgroundColor = "rgb(173, 255, 245)";

  //to zoom clear button
  let clear = document.querySelector("#clear");
  btnZoom(clear);
};

//function to add goals in list
const addGoal = () => {
  //trim to remove extra spaces
  const goal = document.querySelector("#goal").value.trim();

  //if input is empty
  if (!goal) return;

  //creating new list after each entry
  let listItem = document.createElement("li");

  listItem.innerHTML = `<div id="btn3">${goal}<br>
  <button id="delete" class="mark"> Delete </button>
  <button id="edit" class="mark"> Edit </button>
  <button id="completed" class="mark"> Mark as Done </button>
  <button id="Backlog" class="mark"> Remained </button>
  </div>`;

  //removed value present in input box
  document.querySelector("#goal").value = "";

  //add items to new list
  return document.querySelector("#list").appendChild(listItem);
};

//Imp Idea learnt to undo any process like....
//to change button color back or to undo text
//entered in input while I click on edit .

//tracking edited items
let editItem = null;

//for dynamic elements forEach will not work
//so I have used event delegation like this..

document.body.addEventListener("click", (event) => {
  //to Zoom buttons
  if (event.target.classList.contains("mark")) {
    btnZoom(event.target);
  }

  //to delete buttons
  if (event.target.id === "delete") {
    event.target.closest("li").remove();
  }

  // to addGoals
  if (event.target.id === "Save") {
    addGoal();
    btnZoom(save);
  }

  //to EDIT goals
  if (event.target.id === "edit") {
    //to reset other edit buttons
    if (editItem) {
      editItem.querySelector("#edit").style.backgroundColor = "";
      editItem.querySelector("#edit").style.border = "";
    }

    //for just clicked edit button
    event.target.style.backgroundColor = " rgb(0, 251, 255)";
    event.target.style.border = "2px solid red";

    //for save button
    save.style.backgroundColor = " rgba(80, 255, 89, 0.81)";
    save.innerText = "Save";
    save.setAttribute("id", "editSave");

    //store current button as before clicked
    editItem = event.target.closest("li");

    //to show already filled data in input
    document.querySelector("#goal").value = editItem
      .querySelector("#btn3")
      .childNodes[0].nodeValue.trim();
  }

  if (event.target.id === "editSave") {
    if (editItem) {
      //to update list
      const newGoal = document.querySelector("#goal").value.trim();

      if (newGoal) {
        editItem.querySelector("#btn3").childNodes[0].nodeValue = newGoal;
      }

      //Reset save button
      save.setAttribute("id", "Save");
      // btnZoom(save);
      save.innerText = "Add";
      save.style.backgroundColor = "rgb(173, 255, 245)";

      //reset edit buttons
      editItem.querySelector("#edit").style.backgroundColor = "";
      editItem.querySelector("#edit").style.border = "";
      editItem = null;

      //reset input box
      document.querySelector("#goal").value = "";
    }
  }

  if (event.target.id === "completed") {
    event.target.style.backgroundColor = "rgb(80, 255, 89";
    event.target.style.border = "3px solid blue";
    event.target.innerText = "Completed";
    event.target.closest("li").querySelector("#Backlog").remove();
  }

  if (event.target.id === "Backlog") {
    event.target.style.backgroundColor = "rgb(253, 164, 74)";
    event.target.innerText = "Backlog";
  }
});
