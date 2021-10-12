const fragDir = './fragments/';
const container = document.querySelector('#container');

window.onload = (e) => {
    loadHomePage();
    initRoutes();
}



function loadHomePage() {
    resolveRoute('home');
}

function request(path) {
    path = fragDir + path + '.html';
    let req = new XMLHttpRequest();
    req.open('GET', path);
    req.send();
    
    return new Promise((resolve, reject) => {
        req.onload = (e) => {
            resolve(e.target.response);
        };
        req.onerror = reject;
    });
}

function updateContent(content) {
    container.replaceChildren();
    container.innerHTML = content;
}

function resolveRoute(path) {
    request(path)
    .then((content) => {
        updateContent(content);
    })
    .catch(() => {
        resolveRoute('404');
    });
}

function initRoutes() {

    const checkRoute = function(e) {
        /*if(e.target.className.contains('route')) {
            e.target.preventDefault();
            resolveRoute(e.target.href);
        }*/

        console.log(e.target.className);
    }

    const links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', checkRoute);
    });
}
