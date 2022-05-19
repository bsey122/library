let myLibrary = [];// Holds book objects

function Book(title, author, pages, read) {// Constructor to make book objects
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
}
/* Displays book objects using DOM manipulation. book.hasOwnProperty(key) was used so 
that the addBookToLibrary method is excluded when looping through book object. This is becuase
each book object inherits the addBookToLibrary method from Book prototype property */
function displayBook() {
    const table = document.querySelector('tbody');
    myLibrary.forEach(book => {
        let tableRow = document.createElement('tr');
        for (const key in book) {
            if (book.hasOwnProperty(key)) {
                const element = book[key];
                let tableData = document.createElement('td');
                tableData.textContent = element;
                tableRow.appendChild(tableData);
            }
            table.appendChild(tableRow);
        }
    });
}
const openModalButton = document.querySelector('.open-modal-button');
const closeModalButton = document.querySelector('.modal-close-button');
const overlay = document.querySelector('#overlay');
const addBookButton = document.querySelector('.form-button');

openModalButton.addEventListener('click', () => {// Event listener to open modal when button is clicked
    const modal = document.querySelector('.modal');
    openModal(modal);
});

closeModalButton.addEventListener('click', () => {// Event listener to close modal when button is clicked
    const modal = document.querySelector('.modal');
    closeModal(modal);
});

overlay.addEventListener('click', () => { // Event listener to close modal when overlay is clicked
    const modal = document.querySelector('.modal');
    closeModal(modal);
});

addBookButton.addEventListener('click', () => { // Event listener to add and display book objects
    addBook();
    displayBook();
});

function openModal(modal) {// Adds active classes to modal and overlay
    if (modal == null) {
        return
    }
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {// Removes active class from modal and overlay
    if (modal == null) {
        return
    }
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function addBook() { // Gets information from forms
    let formTitle = document.querySelector('#title').value;
    let formAuthor = document.querySelector('#author').value;
    let formPages = document.querySelector('#pages').value;
    let formRead = document.querySelector('#read').checked;
    let newBook = new Book(formTitle, formAuthor, formPages, formRead);
    newBook.addBookToLibrary();
}