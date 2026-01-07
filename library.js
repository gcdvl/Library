

const myLibrary = [];

function Book(title, author, pages, readstatus) {
  this.bookid = Date.now();
  this.booktitle = title;
  this.bookauthor = author;
  this.bookpages = pages;
  this.bookreadstatus = readstatus;
}

Book.prototype.toggleStatus = function () {
  if (this.bookreadstatus === "Read") {
    this.bookreadstatus = "Not read";
  } else {
    this.bookreadstatus = "Read";
  }
};
{
    
}

function addBooks(title,author,pages,readstatus)
{
    const book = new Book(title,author,pages,readstatus);
    myLibrary.push(book);
    
};

function displaybooks()
{
    const container = document.querySelector("#book-container");
    container.innerHTML="";
    for(const book of myLibrary){
        
        
       const card = document.createElement("div");
       card.dataset.id = book.bookid;
       card.classList.add("book-card");
       card.innerHTML=`
       <h3>${book.booktitle}</h3>
       <p>Author : ${book.bookauthor}</p>
       <p>Pages : ${book.bookpages}</p>
       <p>Status : ${book.bookreadstatus}</p>
       <button class="removebtn">Remove</button>
       <button class="statusbtn">Change read status</button>
       `
       ;
       const removebtn = card.querySelector(".removebtn");
       const statusbtn = card.querySelector(".statusbtn");

   statusbtn.addEventListener("click",()=>
{
    const statusid = card.dataset.id;
    const index= myLibrary.findIndex(book=>book.bookid==statusid);
    const tochangestatus = myLibrary[index];
    tochangestatus.toggleStatus();
    displaybooks();

})    

removebtn.addEventListener("click",()=>{
    const id = card.dataset.id;
    const index= myLibrary.findIndex(book=>book.bookid==id);
    myLibrary.splice(index,1);
    displaybooks();
});
       container.appendChild(card);

    };
};

const dialog = document.querySelector("#bookdialog");
const openBtn = document.querySelector("#opendialog");

const form = dialog.querySelector("form");

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const title = data.get("title");
    const author = data.get ("author");
    const pages = data.get("pages");
    const readstatus = data.get("read");

    addBooks(title,author,pages,readstatus);
    displaybooks();
    dialog.close();
    form.reset();
});

const cancelBtn = dialog.querySelector(".cancel");

cancelBtn.addEventListener("click", () => {
  dialog.close();
});