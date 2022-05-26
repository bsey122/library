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
Book.prototype.toggleReadBook = function () {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}
/* Displays book objects using DOM manipulation. book.hasOwnProperty(key) was used so 
that the addBookToLibrary method is excluded when looping through book object. This is becuase
each book object inherits the addBookToLibrary method from Book prototype property */
function displayBook() {
    let book = myLibrary[myLibrary.length - 1];
    let tableRow = document.createElement('tr');
    let tableData = document.createElement('td');
    let removeButton = document.createElement('button');
    let toggleReadButton = document.createElement('button');
    for (const key in book) {
        if (book.hasOwnProperty(key)) {
            const element = book[key];
            let tableData = document.createElement('td');
            if (key === 'read') {
                toggleReadButton;
                toggleReadButton.setAttribute('data-toggle-button-id', `table-row-${myLibrary.length - 1}`);
                toggleReadDisplay(element, toggleReadButton);
                tableData.appendChild(toggleReadButton);
                tableRow.appendChild(tableData);
            } else {
                tableData.textContent = element;
                tableRow.appendChild(tableData);
            }
        }
    }
    removeButton.setAttribute('data-remove-button-id', `table-row-${myLibrary.length - 1}`);
    removeButton.textContent = 'remove';
    tableData.appendChild(removeButton);
    tableRow.appendChild(tableData);
    tableRow.setAttribute('id', `table-row-${myLibrary.length - 1}`);
    table.appendChild(tableRow);
}
const openModalButton = document.querySelector('.open-modal-button');
const closeModalButton = document.querySelector('.modal-close-button');
const overlay = document.querySelector('#overlay');
const addBookButton = document.querySelector('.form-button');
const modal = document.querySelector('.modal');
const table = document.querySelector('tbody');

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
/* Event listener set on table element so that the dynamically created remove buttons can have events binded
to them through bubbling */
table.addEventListener('click', (e) => {
    removeTableRow(e);
    toggleRead(e);
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
function removeTableRow(e) { // Removes book information from table and myLibrary array
    if (e.target.dataset.removeButtonId) {
        const tableRowId = e.target.dataset.removeButtonId;
        const tableRowRemove = document.querySelector(`#${tableRowId}`);
        tableRowRemove.remove();
        const tableTitle = tableRowRemove.firstChild.textContent;
        let index = myLibrary.findIndex(function (bookTitle) {
            return bookTitle.title === tableTitle;
        });
        myLibrary.splice(index, 1);
    }
}
function toggleRead(e) {
    if (e.target.dataset.toggleButtonId) {
        const tableRowId = e.target.dataset.toggleButtonId;
        const tableRow = document.querySelector(`#${tableRowId}`);
        const toggleButton = e.target;
        const tableTitle = tableRow.firstChild.textContent;
        let index = myLibrary.findIndex(function (bookTitle) {
            return bookTitle.title === tableTitle;
        });
        myLibrary[index].toggleReadBook();
        let read = myLibrary[index].read;
        toggleReadDisplay(read, toggleButton);
    }
}
function toggleReadDisplay(read, toggleButton) {
    if (read) {
        toggleButton.textContent = 'read';
    } else {
        toggleButton.textContent = 'not read';
    }
}