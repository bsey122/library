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
each book object inherits the addBookToLibrary method from Book prototype property*/
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