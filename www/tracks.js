// modals in preview order
const modalArr = ["edu", "new", "ent", "sus"];
const navbarArr = ["desc", "questions", "resources"];

const modals = [...document.getElementsByClassName("tracks-modal")];
const navbars = document.getElementsByClassName('modal-navbar');

function closeAllTabs(modalInd) {
  const allTabs = [...modals[modalInd].getElementsByClassName("modal-text")];
  allTabs.forEach((tab) => {
    tab.style.display = "none";
  })
  const allTabHeaders = [...navbars[modalInd].children];
  allTabHeaders.forEach((header) => {
    header.classList.remove("selected");
  })
}

// open modal when track preview clicked, description tab is automatically selected
const previews = document.getElementsByClassName('tracks-preview');
for (let i = 0; i < previews.length; i++) {
  previews[i].addEventListener("click", e => {
    // desktop
    if (screen.width > 576) {
      const modal = document.getElementById(`${modalArr[i]}-modal`);
      const navbar = document.getElementsByClassName('modal-navbar')[i];

      document.querySelector("html").style.overflow = "hidden";
      modal.style.display = "block";
      modal.classList.add("modal-open");
      navbar.firstElementChild.classList.add("selected");

      // only show tab's content
      const desc = document.getElementById(`${modalArr[i]}-desc`);
      desc.style.display = "block";
    } 
    // mobile
    else {
      const modal = document.getElementById(`${modalArr[i]}-modal-mobile`);
      document.querySelector("html").style.overflow = "hidden";
      modal.style.display = "block";
      modal.classList.add("modal-open-mobile");
    }
    
  })
}

// close modal when X is clicked, desktop
const exits = document.getElementsByClassName('modal-exit');
for (let i = 0; i < exits.length; i++) {
  exits[i].addEventListener("click", e => {
    const modal = document.getElementById(`${modalArr[i]}-modal`);
    closeAllTabs(i);
    modal.style.display = "none";
    document.querySelector("html").style.overflowY = "scroll";
  })
}

// close modal when X is clicked, mobile
const exitMobiles = document.getElementsByClassName('modal-exit-mobile');
for (let i = 0; i < exitMobiles.length; i++) {
  exitMobiles[i].addEventListener("click", e => {
    const modalMobile = document.getElementById(`${modalArr[i]}-modal-mobile`);
    modalMobile.style.display = "none";
    modalMobile.classList.remove("modal-open-mobile");
    document.querySelector("html").style.overflowY = "scroll";
  })
}

// close modal when click outside modal
modals.forEach((modal, ind) => {
  modal.addEventListener("click", e => {
    if (modal.classList.contains("modal-open")) {
      modal.style.display = "none";
      document.querySelector("html").style.overflowY = "scroll";
      closeAllTabs(ind);
    }
  })

  const modalContents = [...document.getElementsByClassName('modal-content')];
  modalContents[ind].addEventListener("click", e => {
    e.stopPropagation();
  })
})

// navigate navbar
for (let i = 0; i < navbars.length; i++) {
  for (let j = 0; j < navbarArr.length; j++) {
    navbars[i].children[j].addEventListener("click", e => {
      if (modals[i].classList.contains("modal-open")) {
        // deselect other tabs
        closeAllTabs(i);
        console.log("click");

        // select new tab and show content
        const newTab = document.getElementById(`${modalArr[i]}-${navbarArr[j]}`);
        newTab.style.display = "block";
        navbars[i].children[j].classList.add("selected");
      }
    })
  }
}
