const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

for (let i = 0; i < 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/pic${i+1}.jpg`);
    
    /* Adding an onclick handler to each thumbnail image */
    newImage.onclick = function() {
        displayedImage.src = newImage.src;
    }

    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
function lightingSwitch() {
    let state = btn.getAttribute('class');
    if (state === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else if (state === 'light') {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}
btn.addEventListener('click', lightingSwitch);