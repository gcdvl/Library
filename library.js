



class Book {
  constructor(title,author,pages,readstatus){
  this.bookid = Date.now();
  this.booktitle = title;
  this.bookauthor = author;
  this.bookpages = pages;
  this.bookreadstatus = readstatus;}

  toggleStatus(){
    if (this.bookreadstatus === "Read") {
    this.bookreadstatus = "Not read";
  } else {
    this.bookreadstatus = "Read";
  }
  }
}

class Library
{

  #myLibrary = [];

    addBooks(title,author,pages,readstatus)
{
    const book = new Book(title,author,pages,readstatus);
    this.#myLibrary.push(book);
    
}


     displaybooks()
{
    const container = document.querySelector("#book-container");
    container.innerHTML="";
    for(const book of this.#myLibrary){
        
        
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
    const index= this.#myLibrary.findIndex(book=>book.bookid==statusid);
    const tochangestatus = this.#myLibrary[index];
    tochangestatus.toggleStatus();
    this.displaybooks();

})    

removebtn.addEventListener("click",()=>{
    const id = card.dataset.id;
    const index= this.#myLibrary.findIndex(book=>book.bookid==id);
    this.#myLibrary.splice(index,1);
    this.displaybooks();
});
       container.appendChild(card);

    };
}

}


const lib = new Library();


const dialog = document.querySelector("#bookdialog");
const openBtn = document.querySelector("#opendialog");

const form = dialog.querySelector("form");

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

const writer = document.getElementById("athr");
writer.addEventListener("input",()=>
{
  if(writer.validity.valueMissing){
    writer.setCustomValidity("Fill the author's name");
  }
  else{writer.setCustomValidity("");}
  writer.reportValidity();
});

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const title = data.get("title");
    const author = data.get ("author");
    const pages = data.get("pages");
    const readstatus = data.get("read");

    lib.addBooks(title,author,pages,readstatus);
    lib.displaybooks();
    dialog.close();
    form.reset();
});

const cancelBtn = dialog.querySelector(".cancel");

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

