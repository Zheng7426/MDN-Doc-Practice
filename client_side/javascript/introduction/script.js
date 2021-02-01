// document.addEventListener('DOMContentLoaded', function() {
function createParagraph() {
    let para = document.createElement('p');
    para.textContent = 'You generated a new paragraph 0.0';
    document.body.appendChild(para);
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', createParagraph));
console.log(buttons.length);