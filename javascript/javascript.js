let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
}
function displayBook() {
    const table = document.querySelector('tbody');
    myLibrary.forEach(book => {
        let tableRow = document.createElement('tr');
        for (const key in book) {
            if (book.hasOwnProperty(key)) {;
                const element = book[key];
                let tableData = document.createElement('td');
                tableData.textContent = element;
                tableRow.appendChild(tableData);
            }
            table.appendChild(tableRow);
        }
    });
}