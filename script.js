document.addEventListener('DOMContentLoaded', () => {
    let center = document.getElementById('centre')
    let lines = document.getElementById('lines')

    if (localStorage.getItem("pageCount") == -1) {
        localStorage.setItem("pageCount", Number(localStorage.getItem("pageCount")) + 1)
    }
    var pageCount = 0
    var thisPage = 0

    pageAdd()

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === "visible") {
            pageAdd()
        } else {
            localStorage.removeItem('page' + thisPage)
            localStorage.removeItem('page' + thisPage + "-Center")
            let pageCount = Number(localStorage.getItem("pageCount")) - 1
            localStorage.setItem("pageCount", pageCount)
            localStorage.setItem('toDelete', thisPage)
        }
    })

    window.addEventListener('keypress', (e) => {
        if (e.key == 'p') {
            if (pageCount == 1) {
                window.open('index.html', '_blank', "width=600px,height=350px,top=0px,left=0px")
            } else if (pageCount == 2) {
                window.open('index.html', '_blank', "width=600px,height=350px,top=0px,left=600px")
            } else if (pageCount == 3) {
                window.open('index.html', '_blank', "width=600px,height=350px,top=400px,left=0px")
            } else if (pageCount == 4) {
                window.open('index.html', '_blank', "width=600px,height=350px,top=400px,left=600px")
            }
        }
    })

    function pageAdd() {
        thisPage = 0
        pageCount = Number(localStorage.getItem("pageCount")) + 1
        if (pageCount == 1) { localStorage = '' }
        localStorage.setItem("pageCount", pageCount);

        for (let i = 1; i < (pageCount + 1); i++) {
            if (!localStorage.getItem("page" + i) == true) {
                thisPage = i
                localStorage.setItem("page" + i, true)
                break
            }
        }
        document.title = thisPage
    }

    setInterval(() => {
        setCENTER()
    }, 10)
    setInterval(() => {

    }, 100)

    function setCENTER() {
        let thisCenter = (window.innerWidth / 2 + window.screenX) + "|" + (window.innerHeight / 2 + window.screenY)
        localStorage.setItem('page' + thisPage + "-Center", thisCenter);
        center.style.top = (window.innerHeight / 2) + 'px'
        center.style.left = (window.innerWidth / 2) + 'px'

        Object.keys(localStorage).forEach(function (key) {
            if (key == 'toDelete') {
                if (document.getElementById('canva' + localStorage.getItem(key)) != null) { document.getElementById('canva' + localStorage.getItem(key)).remove() }
                if (document.getElementById('CENTRE' + localStorage.getItem(key)) != null) { document.getElementById('CENTRE' + localStorage.getItem(key)).remove() }
                setTimeout(() => {
                    localStorage.removeItem(key)
                }, 10)
                return
            }
            if (key.endsWith('-Center')) {
                if (!key.startsWith("page" + thisPage)) {

                    let ident = key.replace('-Center', '').replace('page', '')
                    if (document.getElementById('canva' + ident) != null) { document.getElementById('canva' + ident).remove() }
                    let tempX = localStorage.getItem(key).split('|')[0]
                    let tempY = localStorage.getItem(key).split('|')[1]

                    let div = document.createElement('div')
                    div.id = 'canva' + ident
                    div.classList.add('LIGNES')
                    lines.appendChild(div)

                    if (document.getElementById('CENTRE' + ident) != null) { document.getElementById('CENTRE' + ident).remove() }
                    let centreDIV = document.getElementById('centreDIV')
                    let CENTRE = document.createElement('div')
                    CENTRE.id = 'CENTRE' + ident
                    centreDIV.appendChild(CENTRE)
                    CENTRE.classList.add('centre')
                    CENTRE.style.top = (tempY - window.screenY) + 'px'
                    CENTRE.style.left = (tempX - window.screenX) + 'px'

                    let hypothenuse = calcHypotenuse(Math.abs((window.innerWidth / 2 + window.screenX) - tempX), Math.abs((window.innerHeight / 2 + window.screenY) - tempY))
                    div.style.height = hypothenuse + 'px'

                    div.style.top = (window.innerHeight / 2 + 5) + 'px'
                    div.style.left = (window.innerWidth / 2 + 5) + 'px'

                    let ANGLE = Math.floor(angle360((window.innerWidth / 2 + window.screenX), (window.innerHeight / 2 + window.screenY), tempX, tempY)) - 90
                    div.style.transform = 'rotateZ(' + ANGLE + 'deg)'
                }
            }
        });
    }

    function angle(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); 
        theta *= 180 / Math.PI;
        return theta;
    }
    function angle360(cx, cy, ex, ey) {
        var theta = angle(cx, cy, ex, ey);
        if (theta < 0) theta = 360 + theta;
        return theta;
    }
    function calcHypotenuse(a, b) {
        return Math.sqrt(a * a + b * b);
    }
})