console.log("0xK3rnalX portfolio loaded")

const layers = document.querySelectorAll(".layer")

document.addEventListener("mousemove",(e)=>{

const x = (window.innerWidth / 2 - e.clientX) / 40
const y = (window.innerHeight / 2 - e.clientY) / 40

layers.forEach(layer=>{
layer.style.transform = `translate(${x}px, ${y}px)`
})

})

const flash = document.querySelector(".glitch-flash")

function glitchFlash(){

flash.style.opacity = Math.random() * 0.6

setTimeout(()=>{
flash.style.opacity = 0
},80)

}

setInterval(()=>{
if(Math.random() > 0.7){
glitchFlash()
}
},800)