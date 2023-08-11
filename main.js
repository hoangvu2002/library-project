const form = document.querySelector("form")
form.onsubmit = (e) => {e.preventDefault();}

let myLibrary = [];

function Book(title, author, pages, read=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const read = document.getElementById('read');
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  title.value = "";
  author.value = "";
  pages.value="";
  read.checked=false;
}