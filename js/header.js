let hamburger=document.querySelector('.hamburger');
let navLinks=document.getElementById('nav-links');
let links=document.querySelectorAll('.links');

hamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('hide');
    hamburger.classList.toggle('lines-rotate');
});
