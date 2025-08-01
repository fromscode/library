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
addBookToLibrary("test2", "test2", 10, true);
addBookToLibrary("test3", "test3", 10, true);

function displayBook() {
    myLibrary.forEach((book) => {
        console.log(book);
    });
};

displayBook();