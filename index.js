let timer
let deleteFirstPhotoDelay

async function start(){
   try{
    const respose = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await respose.json();
    breedList(data.message)
   }catch (e) {
    console.log("there was a problem fetching the bleed of dogs.");
   }
}
start();

function breedList(breedItems){
    document.getElementById('dogbleed').innerHTML = `
    <select onchange="loadBreed(this.value)">
        <option>CHOOSE A DOG BREED</option>
      ${Object.keys(breedItems).map(function(breed){
        return `<option>${breed}</option>`
      }).join('')}
    </select>
    `
}


async function loadBreed(breed){
    if (breed != "CHOOSE A DOG BLEED") {
        const respose =await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await respose.json();
        createSlideShow(data.message)
    }
}

function createSlideShow(images){
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    if (images.length >1) {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
          <div class="slide" style="background-image: url('${images[1]}')"></div> 
       `
        currentPosition +=2
        if(images.length == 2) currentPosition = 0
        timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div> 
       `
    }

    function nextSlide(){
        document.getElementById('slideshow').insertAdjacentHTML('beforeend',`<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        },1000)
        if(currentPosition + 1 >= images.length){
            currentPosition = 0
        }else{
            currentPosition++
        }
    }
}