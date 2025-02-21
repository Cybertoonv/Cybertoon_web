const ul =document.querySelector('.items');
ul.firstElementChild.textContent = 'Hello';
ul.children[1].innerHTML ="<h1>hELLOW</h1>"
ul.lastElementChild.textContent ='WHatever';
const btn = document.querySelector('.btn');
console.log
btn.style.background='red';
ul.style.color='red'


btn.addEventListener("mouseover", (e)=>{
    e.preventDefault();
    console.log('click')
    document.querySelector('.btn').style.background="blue"
    document.querySelector('body').classList.add('bg-dark');
})