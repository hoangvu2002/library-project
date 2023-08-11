const form = document.querySelector("form");
const display = document.querySelector('.display');
form.onsubmit = (e) => {e.preventDefault();
}

let myLibrary = [];

function Book(title, author, pages, read=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.getIndex = function () {
    const index = myLibrary.indexOf(this);
    return index;
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
  displayCard();
}


function displayCard() {
    while (display.firstElementChild) {
        display.removeChild(display.firstElementChild);
    }
    for (const book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        const title = document.createElement('h3');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const deleteButton = document.createElement('button');
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(deleteButton);
        display.appendChild(bookCard);
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        deleteButton.textContent = 'Delete';

        const index = book.getIndex();
        title.dataset.index = index;

        deleteButton.onclick = function () {
            myLibrary.splice(Number(index), 1);
            display.removeChild(bookCard);
            displayCard();
        }
    }
}



const add = document.querySelector("form button");
add.onclick = addBookToLibrary;