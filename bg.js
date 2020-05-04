const body = document.querySelector("body");

const IMG_NUMBER = 4;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `image/${imgNumber +1}.jpg`;
    body.appendChild(image);
    image.classList.add("bgimage");
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();