//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI conctructor (dunamically add lists to UI)
function UI() {}

//Addbooktolist function added to prototype
UI.prototype.addBooktoList = function(book) {
  const list = document.getElementById("book-list");
  //create a row element
  const row = document.createElement("tr");
  //init row element
  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href='#' class="delete">X</a></td>
  `;
  //append to list
  list.appendChild(row);
};

//Clear fields function added to prototype
UI.prototype.clear = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Add showDialogfunction to prototype
UI.prototype.showDialog = function(message, className) {
  //Create a div element
  const div = document.createElement("div");
  //Add classes and textNode
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  //Get parent tag and form
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  //Add div dialog box before the form
  container.insertBefore(div, form);

  //Set timeout function
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Add Deletebook func to prototype
UI.prototype.deleteBook = function(target) {
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  }
};

//Add event handler to add element
document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //create a book object
  const book = new Book(title, author, isbn);

  //create a UI object
  const ui = new UI();

  //Check if all the fields are filled
  if (title === "" || author == "" || isbn === "") {
    //Show error dialog
    ui.showDialog("All input fields are required", "error");
  } else {
    //Add book to list --> function to be added to UI
    ui.addBooktoList(book);

    //Show success message
    ui.showDialog("Book Successfully added", "success");

    //clear all input fields
    ui.clear();
  }

  e.preventDefault();
});

//Event Listener for delete functionality
document.getElementById("book-list").addEventListener("click", function(e) {
  //Initialize the UI object
  const ui = new UI();

  //Add delete via event delegation
  ui.deleteBook(e.target);
  if (e.target.classList.contains("delete")) {
    //Show success delete message
    ui.showDialog("Deleted Successfully", "success");
  }

  e.preventDefault();
});
