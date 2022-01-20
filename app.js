class colorPalette{
  constructor(){

    this.colorDivs = document.querySelectorAll('.color');
    this.hexes = document.querySelectorAll('.hex');
    this.customizerBtns = document.querySelectorAll('.customizer');
    this.lockBtns = document.querySelectorAll('.lock');
    this.libraryBtn = document.querySelector('.library');
    this.generateBtn = document.querySelector('.generate');
    this.saveBtn= document.querySelector('.save');
    this.sliders = document.querySelectorAll('input[type="range"]');
    this.satSliders = document.querySelectorAll('#saturation');
    this.generateBtn = document.querySelector('.generate');



    this.initalColors = [];
  }
  
  //Hex generator
  // generateHex(){
  //   const letters = '0123456789ABCDEF';
  //   let hash = '#';
  //   for(let i = 0; i < 6; i++){
  //     hash += letters[Math.floor(Math.random() * 16)]
  //   }
  //   return hash;
  // }

  generateHex(){
    const hexColor = chroma.random();
    return hexColor;
  }

  randomColor(){
    this.colorDivs.forEach((div)=>{      

      const hexText = div.children[0];
      const customizerBtn = div.children[1].children[0];
      const lockBtn = div.children[1].children[1];

      const lockIcon = lockBtn.firstChild;
      if(lockIcon.classList.contains('fa-lock-open')){


        const generatedHex = this.generateHex();
        this.initalColors.push(generatedHex);
  
        hexText.textContent = generatedHex;
        div.style.background = generatedHex;
        this.checkTextContrast(generatedHex,hexText,customizerBtn,lockBtn); 
        const sliders = div.querySelectorAll('input[type="range"]'); 
  
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];
  
        const hslArr = chroma(generatedHex).hsl();
  
        hue.value = hslArr[0];
        saturation.value = hslArr[1];
        brightness.value = hslArr[2];
  
  
  
        this.beautifySliders(generatedHex,hue,brightness,saturation);
      }
     

      
      
    });
  }

  checkTextContrast(color,text,customizerBtn,lockBtn){
    const luminance = chroma(color).luminance();

    if(luminance > 0.5){
      text.style.color = 'black'
      customizerBtn.style.color = 'black'
      lockBtn.style.color = 'black'
      
    }
    else{
      text.style.color = 'white'
      customizerBtn.style.color = 'white'
      lockBtn.style.color = 'white'
    }
  }
  // chroma.scale(['#ffffff','#d3edf8','#a8dbf0','#7cc9e9','#50b8e2','#24a6db','#1d85af','#166383','#0f4257','#07212c', '#000000']);

  beautifySliders(color,hue,brightness,saturation){
    
    const satMin = color.set('hsl.s',0);
    const satMid = color.set('hsl.s',0.5);
    
    const satMax = color.set('hsl.s',1);


    const scaleSat = chroma.scale([satMin,satMid,satMax]);

    const midBright = color.set('hsl.l',0.5)

    const scaleBright = chroma.scale(['black',midBright,'white']);

    
    brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)},${midBright},${scaleBright(1)})`;

    saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)},${scaleSat(0.5)},${scaleSat(1)})`;

    hue.style.backgroundImage = `linear-gradient(to right,#ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 67%,#ff00ff 83%, #ff0000 100%)`;




    // hue.addEventListener('input',(e)=>{
    //   const target = e.target.parentElement.parentElement;

    //   this.updateBg(target,color);

    // });

    // saturation.addEventListener('input',(e)=>{
    //   const target = e.target.parentElement.parentElement;

    //   this.updateBg(target,color);

    // });

    // brightness.addEventListener('input',(e)=>{
    //   const target = e.target.parentElement.parentElement;

    //   this.updateBg(target,color);

    // });


  }

  // updateBg(target,color){
  //   const sliders = target.querySelectorAll('input[type="range"]');

  //   const hueSlider = sliders[0];
  //   const brightSlider = sliders[1];
  //   const satSlider = sliders[2];

  //   target.style.background = color.set('hsl.h',hueSlider.value).set('hsl.s',satSlider.value).set('hsl.l',brightSlider.value);

  // }


}


const cp = new colorPalette();


cp.randomColor();





// cp.satSliders.forEach((s)=>{
//   // let bgColor = target.style.getPropertyValue('background-color');
//   s.addEventListener('input',function(e){
//     const target = e.target.parentElement.parentElement;
//     // console.log(this.value);

//     bgColor = chroma(bgColor);
//     console.log(bgColor.hex());
//     const satMin = bgColor.set('hsl.s',0);
//     const satMax = bgColor.set('hsl.s',1);
  
//     const satScale = chroma.scale([satMin,bgColor,satMax]);
//     target.style.background = satScale(this.value);
//     // console.log(bgColor.hex());
//     // target.style.setProperty('background-color',bgColor);
//     // const inputVal = this.value;
    
//     // changeSatBg(bgColor,inputVal,target);
//   })
// })


// function changeSatBg(color,inputVal,target){
//   const satMin = color.set('hsl.s',0);
//   const satMax = color.set('hsl.s',1);

//   const satScale = chroma.scale([satMin,color,satMax]);

//   // console.log(inputVal);
//   target.style.background = satScale(inputVal);
//   // console.log(inputVal);

// }


cp.sliders.forEach((s)=>{
  if(s.classList.contains('hue-input')){
    s.addEventListener('input',updateAllColor)
  }
  else if(s.classList.contains('brightness-input')){
    s.addEventListener('input',updateSat)
  }
  else{
    s.addEventListener('input',updateBright);
  }
})

function updateSat(e){

  const sliderDiv = e.target.parentElement;
  const parentDiv = e.target.parentElement.parentElement;
  const hex = parentDiv.children[0].textContent;
  const sliders = sliderDiv.querySelectorAll('input[type="range"]');
  const divColor = cp.initalColors[0].hex();
  // console.log(divcolor);
  const hueSlider = sliders[0];
  const brightSlider = sliders[1];
  const satSlider = sliders[2];

  const satColor = chroma(hex);

  updateSliders(satColor,null,satSlider);
  updateBg(sliderDiv,parentDiv,divColor)
}

function updateBright(e){
  const sliderDiv = e.target.parentElement;
  const parentDiv = e.target.parentElement.parentElement;
  const hex = parentDiv.children[0].textContent;
  const sliders = sliderDiv.querySelectorAll('input[type="range"]');
  const divColor = cp.initalColors[0].hex();
  // console.log(divcolor);
  const hueSlider = sliders[0];
  const brightSlider = sliders[1];
  const satSlider = sliders[2];

  const brightColor = chroma(hex);

  updateSliders(brightColor,brightSlider,null);
  updateBg(sliderDiv,parentDiv,divColor)

}


function updateAllColor(e){
  const sliderDiv = e.target.parentElement;
  const parentDiv = e.target.parentElement.parentElement;
  const divColor = parentDiv.children[0].textContent;
  const sliders = sliderDiv.querySelectorAll('input[type="range"]');
  // console.log(divcolor);
  const hueSlider = sliders[0];
  const brightSlider = sliders[1];
  const satSlider = sliders[2];

  const hueColor = chroma(divColor);
  // const hueColor = `hsl(${hueSlider.value}, 100%, 50%)`;
  console.log(hueColor);

  // console.log(hueSlider.value);

  updateSliders(hueColor,brightSlider,satSlider);

  updateBg(sliderDiv,parentDiv,divColor);

 
  
}

function updateSliders(hueColor,brightSlider,satSlider){
  // const sliders = sliderDiv.querySelectorAll('input[type="range"]');

  // console.log(color.hex());
  const satMin = hueColor.set('hsl.s',0);
  const satMid = hueColor.set('hsl.s',0.5);
  const satMax = hueColor.set('hsl.s',1);
  const scaleSat = chroma.scale([satMin,satMid,satMax]);

  const midBright = hueColor.set('hsl.l',0.5)
  const scaleBright = chroma.scale(['black',midBright,'white']);
  

  // console.log(brightSlider);

  // brightSlider.style.backgroundImage = 'linear-gradient(to right,red,green,blue)';
  if(brightSlider === null){
    satSlider.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)},${scaleSat(0.5)},${scaleSat(1)})`;
  }else if(satSlider === null){
    
    brightSlider.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)},${scaleBright(0.5)},${scaleBright(1)})`;
  }
  else{

    brightSlider.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)},${scaleBright(0.5)},${scaleBright(1)})`;
  
    satSlider.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)},${scaleSat(0.5)},${scaleSat(1)})`;
  }

}






function updateBg(sliderDiv,parentDiv,color){
  const sliders = sliderDiv.querySelectorAll('input[type="range"]');

  const hueSlider = sliders[0];
  const brightSlider = sliders[1];
  const satSlider = sliders[2];
  
  const updatedColor = chroma(color).set('hsl.h',hueSlider.value).set('hsl.s',satSlider.value).set('hsl.l',brightSlider.value);

  parentDiv.style.background = updatedColor;

  parentDiv.children[0].textContent = updatedColor;

  const text = parentDiv.children[0];
  
  const adjustBtn = parentDiv.children[1].children[0];
  const lockBtn = parentDiv.children[1].children[1];

  // console.log(parentDiv.children[1].children[1]);

  // adjustBtn.style.color = 'white';
  // cp.checkTextContrast(updatedColor,text,adjustBtn,lockBtn);
  // console.log();
  cp.checkTextContrast(updatedColor,text,adjustBtn,lockBtn);
}


const hexText = document.querySelectorAll('h1.hex');

hexText.forEach((c)=>{
  c.addEventListener('click',function(){
    navigator.clipboard.writeText(c.textContent);
    document.querySelector('.copy-container').classList.toggle('active');
    document.querySelector('.copy-popup').classList.toggle('active');

    setTimeout(() => {
      document.querySelector('.copy-container').classList.toggle('active');
      document.querySelector('.copy-popup').classList.toggle('active');
    }, 700);
    

  });
})

const adjustBtns = document.querySelectorAll('.customizer');



// console.log(adjustBtns);

adjustBtns.forEach((a)=>{
  a.addEventListener('click',function(){
    const sliders = a.parentElement.nextElementSibling;
    // console.log(sliders);

    sliders.classList.toggle('active');

    const closeBtn = sliders.children[0];
    
    closeBtn.addEventListener('click',function(){
      sliders.classList.remove('active');
    })
    
  })
});




const saveBtn = document.querySelector('.save');

const  saveContainer = document.querySelector('.save-container');
const closeBtn = saveContainer.querySelector('.close');

const submitBtn = saveContainer.querySelector('.save-submit');

saveBtn.addEventListener('click',function(){


  document.querySelector(".save-popup").classList.toggle('active');
  saveContainer.classList.toggle('active');

});

closeBtn.addEventListener('click',function(){
  document.querySelector(".save-popup").classList.toggle('active');
  saveContainer.classList.toggle('active');
})

submitBtn.addEventListener('click',function(){
  document.querySelector(".save-popup").classList.toggle('active');
saveContainer.classList.toggle('active');
})



const lockBtn = document.querySelectorAll('.lock');


lockBtn.forEach((lock)=>{
  lock.addEventListener('click',function(e){
    e.target.firstElementChild.classList.toggle('fa-lock-open');
    e.target.firstElementChild.classList.toggle('fa-lock');
  })
});





const generateBtn = document.querySelector('.generate');

generateBtn.addEventListener('click',function(){
  cp.randomColor();
});




//saving palettes to LS


//creating an array of current colors



function currentColors(){
  let colors = [];
  cp.colorDivs.forEach((s)=>{
    colors.push(s.children[0].textContent);
  });
  return colors;
}




const saveInput = document.querySelector('.save-input');

// const palette ={}

// const colors = ['#345234','#345234','#345234','#345234'];


function savePalette(){
  let colors = currentColors();

  if(saveInput.value !== ''){
    let palette = {name:saveInput.value,colors:colors}; 
    const paletteList = JSON.parse(localStorage.getItem('paletteList')) || [];
    paletteList.push(palette);
    localStorage.setItem('paletteList',JSON.stringify(paletteList)); 
    saveInput.value = '';
  }

}