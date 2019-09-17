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

//Add event handler to form element
document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //create a book object
  const book = new Book(title, author, isbn);

  //create a UI object
  const ui = new UI();

  //Add book to list --> function to be added to UI
  ui.addBooktoList(book);

  ui.clear();

  e.preventDefault();
});
