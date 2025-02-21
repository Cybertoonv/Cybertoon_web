//Book class; Represent a book
class Book{
  constructor(title,author,isbn){
    this.title= title;
    this.author = author;
    this.isbn =isbn;
  }

}
//Ui class: Handles ui Task
class UI {
  static displayBooks(){

  //   const StoredBooks=[{
  //     title:"Book one",
  //     author: "John doe",
  //     isbn:"12435"
  //   },
  //   {
  //     title:'book two',
  //     author:'john doe',
  //     isbn:'142555'
  //   }
  // ]
  const books= Store.getBooks();
  books.forEach(book=>UI.addBookToList(book));
  }
  static addBookToList(book){
  
    const list=document.querySelector("#book-list");
    const row = document.createElement('tr');
    row.innerHTML= `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class='btn btn-danger btn-sm delete'>X</a></td>
    `;
    list.appendChild(row);

    //Clear field 

    }
    static clearfields(){
      document.querySelector('#title').value=' '
      document.querySelector('#author').value=' '
      document.querySelector('#isbn').value=' '
    }

  //delete X
  static delete(et){
    if(et.classList.contains('delete')){
      et.parentElement.parentElement.remove()
    }
  }
  static ShowAlert(message,classname){
    const div= document.createElement('div');
    div.className=`alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));
    const container=document.querySelector('.container');
    const form=document.querySelector("#book-form");
    
    //Trying to show alert only if it not exist
    const show=document.querySelector('.alert');
    if(show === null){
      container.insertBefore(div,form); 
      //make it vanish after 3s
      setTimeout(()=>document.querySelector('.alert').remove(),1500)
    }
    //don't need to add else if the output already exist
    }
}
//store class: handles Storage
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem("books") === null){
      books=[];
    }
    else{
      books=JSON.parse(localStorage.getItem("books"))

    }
  return books
  }
  static addBooks(book){
    const books=Store.getBooks();
    books.push(book);
    localStorage.setItem("books",JSON.stringify(books))
  }
  static removeBooks(isbn){
    const books=Store.getBooks();

    books.forEach((book,index)=>{
      if(book.isbn ===isbn){
        books.splice(index,1);
      }
    }) 

    localStorage.setItem("books",JSON.stringify(books))

  }
}

//events: Display a book 
document.addEventListener("DOMContentLoaded",UI.displayBooks)
//events: Add a book 
document.querySelector("#book-form").addEventListener("submit", (e)=>{
    e.preventDefault();

    //get form value
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector("#isbn").value;

    //validate
    if(title === ""&&  author === ""&& isbn === "" ){
      UI.ShowAlert("Please fill up the whole form ","danger")
      }
      else if(title === ""||  author === ""|| isbn === "" ){
        UI.ShowAlert("The form is not filled out completely ","info")
      }
      else{
        const book=new Book(title,author,isbn)
      //Added Book to UI
        UI.addBookToList(book);
      // Add book to store
        Store.addBooks(book);
        //Show success message
        UI.ShowAlert("Book is added to the list","success")
      //Clear field 
        UI.clearfields();
        
      }
    }
  )
      

       


//events:Remove a book
document.querySelector("#book-list").addEventListener('click', (e)=>{
  console.log("remove")
  
  //remove book from UI
  UI.delete(e.target)
  //remove books from store
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
  // Alert: Book Remove
  UI.ShowAlert("Book removed","success")
})

