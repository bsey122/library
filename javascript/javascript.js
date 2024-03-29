let myLibrary = [];// Holds book objects

class Book {// Class to make book objects
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    addBookToLibrary() {
        myLibrary.push(this);
    }
    toggleReadBook() {
        if (this.read) {
            this.read = false;
        } else {
            this.read = true;
        }
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
                toggleReadButton.setAttribute('data-toggle-button-id', `table-row`);
                toggleReadDisplay(element, toggleReadButton);
                tableData.appendChild(toggleReadButton);
                tableRow.appendChild(tableData);
            } else {
                tableData.textContent = element;
                tableRow.appendChild(tableData);
            }
        }
    }
    removeButton.setAttribute('data-remove-button-id', `table-row`);
    removeButton.textContent = 'remove';
    tableData.appendChild(removeButton);
    tableRow.appendChild(tableData);
    tableRow.setAttribute('id', `table-row`);
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
        const tableRowRemove = e.target.parentNode.parentNode;
        tableRowRemove.remove();
        const tableTitle = tableRowRemove.firstChild.textContent;
        let index = myLibrary.findIndex(function (bookTitle) {
            return bookTitle.title === tableTitle;
        });
        myLibrary.splice(index, 1);
    }
}
function toggleRead(e) { // Toggles the read status of a book object in the myLibrary array and calls toggleReadDisplay
    if (e.target.dataset.toggleButtonId) {
        const tableRow = e.target.parentNode.parentNode;
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
function toggleReadDisplay(read, toggleButton) { // Toggles the text of the button to display if the book has been read or not
    if (read) {
        toggleButton.textContent = 'read';
        toggleButton.setAttribute('style', 'background-color: #00984c');
    } else {
        toggleButton.textContent = 'not read';
        toggleButton.setAttribute('style', 'background-color: #980500');
    }
}

const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const form = document.querySelector('#form');

formTitle.addEventListener('input', (e) =>{
    checkFormValidity(formTitle, e);
});

formAuthor.addEventListener('input', (e) => {
    checkFormValidity(formAuthor, e);
});

formPages.addEventListener('input', (e) => {
    checkFormValidity(formPages, e);
});

form.addEventListener('submit', (e) => { // The form is not being submitted so this doesn't work
    checkFormValidity(form, e);
});

function checkFormValidity(formElement, e) {
    if (!formElement.validity.valid) {
        showError(formElement);
        e.preventDefault();
    }
}

function showError(formElement) {
    if (formElement.validity.valueMissing) {
        formElement.setCustomValidity('Please enter a vaule');
        formElement.reportValidity();
    } else if (formElement.validity.rangeUnderflow) {
        formElement.setCustomValidity('The amount of pages must be at least 1');
        formElement.reportValidity();
    } else {
        formElement.setCustomValidity('');
    }
}