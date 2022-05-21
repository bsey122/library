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
    let book = myLibrary[myLibrary.length - 1];
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
}
const openModalButton = document.querySelector('.open-modal-button');
const closeModalButton = document.querySelector('.modal-close-button');
const overlay = document.querySelector('#overlay');
const addBookButton = document.querySelector('.form-button');
const modal = document.querySelector('.modal');

openModalButton.addEventListener('click', () => {// Event listener to open modal when button is clicked
    openModal(modal);
});

closeModalButton.addEventListener('click', () => {// Event listener to close modal when button is clicked
    
    closeModal(modal);
});

overlay.addEventListener('click', () => { // Event listener to close modal when overlay is clicked
    closeModal(modal);
});

addBookButton.addEventListener('click', (e) => { // Event listener to add and display book objects
    e.preventDefault();
    addBook();
    displayBook();
    closeModal(modal);
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
    clearModal();
}

function addBook() { // Gets information from forms
    let formTitle = document.querySelector('#title').value;
    let formAuthor = document.querySelector('#author').value;
    let formPages = document.querySelector('#pages').value;
    let formRead = document.querySelector('#read').checked;
    let newBook = new Book(formTitle, formAuthor, formPages, formRead);
    newBook.addBookToLibrary();
}
function clearModal() { // Clears values from modal form
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.checked = false;
    });
}