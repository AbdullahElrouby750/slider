
const gallary = Array.from( document.querySelectorAll('.gallary-imgs'));

const slider = document.querySelector('.slider')
const sliderImg = document.querySelector('.slider-img');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const exit = document.querySelector('.exit');

const layer = document.querySelector('.layer');

let currentSlider = 0;

//eventListeners

document.addEventListener('DOMContentLoaded',()=>{

    gallary.forEach((img, index) => {
        console.log(img);
        console.log(index);
        
        img.addEventListener("click", event =>{
            console.log('done');
            event.stopPropagation();
            
            currentSlider = index;
            sliderImg.src = img.src;
            console.log(sliderImg);
            
            slider.classList.remove("d-none");
            console.log(slider);
            layer.classList.remove("d-none");
            console.log(layer);
        });
    });
});

leftArrow.addEventListener('click', prevSlide);
rightArrow.addEventListener('click', nextSlide);
exit.addEventListener('click', closeSlider);

slider.addEventListener('touchstart',startTouching, false);
slider.addEventListener('touchend',endTouching, false);
document.body.addEventListener('click', event =>{
    if(event.target !== slider) closeSlider();
});
document.addEventListener('keydown',event =>{
    if(event.key === 'ArrowLeft') prevSlide();
    if(event.key === 'ArrowRight') nextSlide();
    if(event.key === 'Escape') closeSlider();
});


//navigate methods
function closeSlider(){
    slider.classList.add('d-none');
    layer.classList.add('d-none');
}

function nextSlide(){
    currentSlider = (currentSlider + 1) % gallary.length;
    sliderImg.src = gallary[currentSlider].src;
}

function prevSlide(){
    currentSlider = (currentSlider - 1 + gallary.length) % gallary.length;
    sliderImg.src = gallary[currentSlider].src;
}

function startTouching(event){
    touchStartX = event.changedTouches[0].screenX;
}

function endTouching(event){
    touchEndX  = event.changedTouches[0].screenX;
    handleGesture();
}

function handleGesture() {
    if (touchEndX < touchStartX) {
        console.log('Swiped left');
        prevSlide();
    }
    if (touchEndX > touchStartX) {
        console.log('Swiped right');
        nextSlide();
    }
}