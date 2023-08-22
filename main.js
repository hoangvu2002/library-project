const form = document.querySelector("form");
const display = document.querySelector('.display');
form.onsubmit = (e) => {e.preventDefault();
}

let myLibrary = [];

class Book {
  title;
  author;
  pages;
  read;
  constructor(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  getIndex() {
    const index = myLibrary.indexOf(this);
    return index;
  }
}

//Book.prototype.getIndex = function () {
//    const index = myLibrary.indexOf(this);
//    return index;
//}

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
  modal.close();
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
        if (book.read) {
            title.classList.add('read');
        }
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


        title.onclick = function() {
            title.classList.toggle('read');
            myLibrary[index].read = title.classList.contains('read');
        }

    }
}



const add = document.querySelector("form button");
add.onclick = addBookToLibrary;


const addBookCard = document.querySelector('.add');
const modal = document.querySelector("[data-modal]");
addBookCard.onclick = () => {modal.showModal()};

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close()
    }
  })