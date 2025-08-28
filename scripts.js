let myLibrary = [];

class Book {
  #id;
  #title;
  #author;
  #pages;
  #haveRead = false;

  constructor(title, author, pages, haveRead) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#haveRead = haveRead;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  get haveRead() {
    return this.#haveRead;
  }

  info() {
    let output = this.title + " by " + this.author + ", " + this.pages + ", ";
    if (this.#haveRead) {
      return output + "read";
    }
    return output + "not read yet";
  }

  changeRead() {
    this.#haveRead = !this.#haveRead;
    console.log("test");
  }
}

function addBookToLibrary(title, author, pages, haveRead) {
  const book = new Book(title, author, pages, haveRead);
  myLibrary.push(book);
}

addBookToLibrary("test", "test", 10, true);
addBookToLibrary("test2", "test2", 10, false);
addBookToLibrary("test3", "test3", 10, true);

const tBody = document.querySelector("tbody");

function displayBook() {
  tBody.textContent = null;
  myLibrary.forEach((book) => {
    showBook(book);
  });

  const removeButtonAll = document.querySelectorAll(".remove-btn");

  removeButtonAll.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.dataset.id;
      console.log(bookId);
      myLibrary = myLibrary.filter((book) => book.id != bookId);
      displayBook();
    });
  });

  const actionButtonAll = document.querySelectorAll(".action-btn");

  actionButtonAll.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.dataset.id;
      for (const book of myLibrary) {
        if (book.id === bookId) {
          book.changeRead();
          break;
        }
      }
      displayBook();
    });
  });
}

function showBook(book) {
  const tr = document.createElement("tr");
  const title = document.createElement("td");
  title.textContent = book.title;

  const author = document.createElement("td");
  author.textContent = book.author;
  const pages = document.createElement("td");
  pages.textContent = book.pages;
  const haveRead = document.createElement("td");
  if (book.haveRead) {
    haveRead.textContent = "YES";
  } else {
    haveRead.textContent = "NO";
  }

  const actionButton = document.createElement("button");
  actionButton.type = "button";
  actionButton.textContent = "Read / Unread";
  actionButton.dataset.id = book.id;
  actionButton.className = "action-btn";

  const actionCell = document.createElement("td");
  actionCell.appendChild(actionButton);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.className = "remove-btn";
  removeButton.dataset.id = book.id;

  const removeCell = document.createElement("td");
  removeCell.appendChild(removeButton);

  tr.append(title);
  tr.append(author);
  tr.append(pages);
  tr.append(haveRead);
  tr.append(actionCell);
  tr.append(removeCell);

  tBody.append(tr);
}

displayBook();

const addBookButton = document.querySelector("#add-book");

addBookButton.addEventListener("click", () => {
  const form = document.querySelector("form");
  form.style.display = "block";
});

const formSubmitButton = document.querySelector("form button");

formSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const form = formSubmitButton.parentElement;

  while (form.checkValidity()) {
    addBook();
    return;
  }

  if (author.validity.valueMissing) {
    author.setCustomValidity("Enter an author's name");
  }

  if (title.validity.valueMissing) {
    title.setCustomValidity("Enter title of the book");
  }

  if (pages.validity.valueMissing) {
    pages.setCustomValidity("Enter number of pages");
  } else if (pages.validity.rangeUnderflow || pages.validity.rangeOverflow) {
    pages.setCustomValidity("Pages must be between 30 and 1000");
  }

  form.reportValidity();
});

const author = document.querySelector("#author");

author.addEventListener("input", () => {
  if (!author.validity.valueMissing) author.setCustomValidity("");
});

const title = document.querySelector("#title");
title.addEventListener("input", () => {
  if (!title.validity.valueMissing) title.setCustomValidity("");
});

const pages = document.querySelector("#pages");
pages.addEventListener("input", () => {
  if (pages.validity.rangeUnderflow || pages.validity.rangeOverflow)
    pages.setCustomValidity("Pages must be between 30 and 1000");
  else pages.setCustomValidity("");
});

function addBook() {
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");

  const read = document.querySelector('input[name="read"]:checked');
  const readStatus = read.value === "true" ? true : false;

  addBookToLibrary(title.value, author.value, pages.value, readStatus);

  tBody.textContent = null;

  const form = document.querySelector("form");
  author.value = "";
  title.value = "";
  pages.value = "";
  read.checked = false;
  form.style.display = "none";

  displayBook();
}
