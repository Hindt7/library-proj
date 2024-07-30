/** Add book logic **/
const myLibrary = [];
const bookCardsContainer = document.querySelector(".book-cards");

function Book(title, author, pages, haveread) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveread = haveread;
    this.info = function() {
        let infotext = "${this.title} by ${this.author}, ${pages} pages, ";
        if (haveread) {
            infotext += "have read";
        } else {
            infotext += "not read yet";
        }
        return infotext;
    };
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

// set up the display of a book card
function displayBook(bookToAdd) {
    const bookCardDiv = document.createElement("div");
    const cardTitle = document.createElement("div");
    const cardAuthor = document.createElement("div");

    bookCardDiv.setAttribute("class", "book-card");
    cardTitle.setAttribute("class", "book-card-title");
    cardAuthor.setAttribute("class", "book-card-author");

    cardTitle.textContent = bookToAdd.title;
    bookCardDiv.appendChild(cardTitle);

    cardAuthor.textContent = bookToAdd.author;
    bookCardDiv.appendChild(cardAuthor);

    // create card menu
    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("class", "card-menu");

    const menuButton = document.createElement("button");
    const dotSpan = document.createElement("span");
    menuButton.setAttribute("class", "menu-btn");
    dotSpan.setAttribute("class", "menu-3-dot");
    menuButton.appendChild(dotSpan);

    // add dropdown menu
    const dropdownDiv = document.createElement("div");
    const markReadBtn = document.createElement("a");
    const removeBtn = document.createElement("a");
    dropdownDiv.setAttribute("class", "dropdown-menu");
    removeBtn.textContent = "Remove from library";
    markReadBtn.setAttribute("class", "read-btn");
    removeBtn.setAttribute("class", "remove-btn");
    dropdownDiv.appendChild(markReadBtn);
    dropdownDiv.appendChild(removeBtn);
    // display read icon according to read status
    if (bookToAdd.haveread) {
        const readIcon = renderReadBookIcon();
        bookCardDiv.prepend(readIcon);
        markReadBtn.textContent = "Remove Read status";
        markReadBtn.classList.toggle("read");
    } else {
        markReadBtn.textContent = "Mark as Read";
    }

    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(dropdownDiv);
    bookCardDiv.appendChild(menuContainer);

    bookCardsContainer.appendChild(bookCardDiv);
}

function displayLibrary() {
    for (let book of myLibrary) {
        displayBook(book);
        console.log(book.title);
    }
}

/*
 *   Create sample books
 */

let book1 = new Book("Sherlock Holmes", "Arthur Conan Doyle", 1000, true);
let book2 = new Book("12 rules for life", "Jordan Peterson", 500, false);
let book3 = new Book("A Mind for Numbers", "Barbara Oakley", 400, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayLibrary();

/** Modal for Add Book **/

const addBookDialog = document.getElementById("AddBookModal");
const bookForm = addBookDialog.querySelector("form");
const confirmBtn = addBookDialog.querySelector("#addBtn");

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //console.log(event);
    // get form data
    const bookData = new FormData(bookForm);

    //console.log(bookData);

    const dataTitle = bookData.get("title");
    const dataAuthor = bookData.get("author");
    const dataNumOfPages = bookData.get("numberofpages");
    const dataReadStatus = bookData.get("readstatus");

    // create a new Book object
    // parse in the data from form
    const newBook = new Book();
    newBook.title = dataTitle;
    newBook.author = dataAuthor;
    newBook.pages = dataNumOfPages;
    if (!dataReadStatus) {
        newBook.haveread = false;
    } else {
        newBook.haveread = true;
    }

    //console.log(newBook);

    // display the new added book on page
    displayBook(newBook);

    addBookDialog.close();
});

/**
 *   Drop-down menu on Cards
 *
 **/

// click event to open the chosen card's menu
const cardMenuBtns = document.querySelectorAll(".menu-btn");

cardMenuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        console.log(menuBtn);
        const cardMenu = menuBtn.parentElement.children[1]; //get div.dropdown-menu element
        cardMenu.classList.toggle("opened");
        //console.log(cardMenu);
    });
});

// remove from library event
const removeBookBtns = document.querySelectorAll(".remove-btn");

removeBookBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
        //console.log(removeBtn);
        const currBookCard = removeBtn.parentElement.parentElement.parentElement;
        //console.log(currBookCard);
        currBookCard.remove();
    });
});

// change Read status
const allReadBtns = document.querySelectorAll(".read-btn");

allReadBtns.forEach((readBtn) => {
    readBtn.addEventListener("click", () => {
        const currBookCard = readBtn.parentElement.parentElement.parentElement;

        if (readBtn.classList.contains("read")) {
            let readIcon = currBookCard.querySelector("svg");
            readIcon.remove();
            readBtn.textContent = "Mark as Read";
        } else {
            const readIcon = renderReadBookIcon();
            currBookCard.prepend(readIcon);
            readBtn.textContent = "Remove Read status";
        }
        readBtn.classList.toggle("read");

        //console.log(currBookCard);
    });
});

// create Icon
function renderReadBookIcon() {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

    iconSvg.setAttribute("height", "18");
    iconSvg.setAttribute("width", "15.75");
    iconSvg.setAttribute("viewBox", "0 0 448 512");

    iconPath.setAttribute("fill", "#874F41");
    iconPath.setAttribute(
        "d",
        "M0 96C0 43 43 0 96 0l96 0 0 190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5L352 0l32 0 32 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0L96 512c-53 0-96-43-96-96L0 96zM64 416c0 17.7 14.3 32 32 32l256 0 0-64L96 384c-17.7 0-32 14.3-32 32"
    );

    iconSvg.appendChild(iconPath);

    return iconSvg;
}