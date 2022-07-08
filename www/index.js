var menu = document.getElementById("menu-btn")
var menu_items = document.getElementById("menu-items")
menu.addEventListener('click', () => {
  if(menu.classList.contains("is-active")){
    menu.classList.remove("is-active")
    menu_items.classList.remove("active")
  }
  else {
    menu.classList.add("is-active")
    menu_items.classList.add("active")
  }
})
let smallWhaleFin_forward = false;
let smallWhaleFin_current_rot = 0;

document.querySelector("#smallWhaleFin").addEventListener('click', function(){
    if (smallWhaleFin_forward) {
	    smallWhaleFin_current_rot += 15;
        smallWhaleFin_forward = false;
    } else {
        smallWhaleFin_current_rot -= 15;
        smallWhaleFin_forward = true;
    }
    document.querySelector("#smallWhaleFin").style.transform = 'rotate(' + smallWhaleFin_current_rot + 'deg)';
}   
);

let bigWhaleFin_forward = false;
let bigWhaleFin_current_rot = 0;

document.querySelector("#bigWhaleFin").addEventListener('click', function(){
    if (bigWhaleFin_forward) {
	    bigWhaleFin_current_rot += 15;
        bigWhaleFin_forward = false;
    } else {
        bigWhaleFin_current_rot -= 15;
        bigWhaleFin_forward = true;
    }
    document.querySelector("bigWhaleFin").style.transform = 'rotate(' + bigWhaleFin_current_rot + 'deg)';
}   
);

