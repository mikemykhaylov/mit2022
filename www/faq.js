function open(question) {
    let star = question.parentElement.firstElementChild;
    let answer = question.parentElement.nextElementSibling;

    star.style.animation = "star-spin 0.5s linear";
    question.classList.add("clicked");
    answer.style.maxHeight = answer.scrollHeight + "px";
}

function close(question) {
    let star = question.parentElement.firstElementChild;
    let answer = question.parentElement.nextElementSibling;

    star.style.animation = "star-spin-back 0.5s linear";
    question.classList.remove("clicked");
    answer.style.maxHeight = "0";
}

// spinning flowers and opening answers when clicking question
let stars = document.getElementsByClassName('faq-question');

for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function(e) {
        if (! stars[i].classList.contains("clicked")) {
            open(stars[i]);

            // close other open answers
            for (let j = 0; j < stars.length; j++) {
                if (i !== j && stars[j].classList.contains("clicked")) {
                    close(stars[j]);
                }
            }

        } else {
            close(stars[i]);
        }
    })
}


