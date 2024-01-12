document.addEventListener('DOMContentLoaded', () => {

    let thisPage = 0
    let pageCount = Number(localStorage.getItem("pageCount")) + 1
    localStorage.setItem("pageCount", pageCount);

    for (let i = 1; i < (pageCount + 1); i++) {
        if (!localStorage.getItem("page" + i) == true) {
            thisPage = i
            localStorage.setItem("page" + i, true)
            break
        }
    }

    let pageDIV = document.getElementById('page')
    pageDIV.innerHTML = thisPage


    window.addEventListener("beforeunload", function (e) {
        let pageCount = Number(localStorage.getItem("pageCount")) - 1
        localStorage.setItem("pageCount", pageCount);
        this.localStorage.removeItem('page' + thisPage)
    });


    window.addEventListener('keypress', (e) => {
        if (e.key == 'p') {
            window.open('index.html', '_blank')
        }
    })

})


// document.addEventListener("visibilitychange", () => {
//   if (document.visibilityState === "visible") {
//     backgroundMusic.play();
//   } else {
//     backgroundMusic.pause();
//   }
// })
