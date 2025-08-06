const myLibrary = [];

function Book(title, author, pages, haveRead) {
    if (!new.target) {
        throw Error("Use new with constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function() {
        let output = this.title + " by " + this.author + ", " + this.pages + ", ";
        if (haveRead) {
            return output + "read";
        }
        return output + "not read yet";
    };
}

function addBookToLibrary(title, author, pages, haveRead) {
    const book = new Book(title, author, pages, haveRead);
    myLibrary.push(book);
}

addBookToLibrary("test", "test", 10, true);
addBookToLibrary("test2", "test2", 10, false);
addBookToLibrary("test3", "test3", 10, true);

function displayBook() {
    myLibrary.forEach((book) => {
        showBook(book);
    });
};

const tBody = document.querySelector("tbody");

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
    }
    else {
        haveRead.textContent = "NO";
    }
    tr.append(title);
    tr.append(author);
    tr.append(pages);
    tr.append(haveRead);

    tBody.append(tr);
}

displayBook();

const addBookButton = document.querySelector("#add-book");

addBookButton.addEventListener('click', () => {
    const form = document.querySelector("form");
    form.style.display = 'block';
})

const formSubmitButton = document.querySelector("form button");

formSubmitButton.addEventListener('click', () => {
    event.preventDefault();
    const author = document.querySelector("#author");
    const title = document.querySelector("#title");
    const pages = document.querySelector("#pages");
    
    const read = document.querySelector('input[name="read"]:checked');
    const readStatus  = read.value === "true" ? true : false;

    addBookToLibrary(title.value, author.value, pages.value, readStatus);

    tBody.textContent = null;

    const form = document.querySelector("form");
    author.value = "";
    title.value = "";
    pages.value = "";
    read.checked = false;
    form.style.display = 'none';

    displayBook();
})