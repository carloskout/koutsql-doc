let links = null;
const fragDir = './fragments';
const container = document.querySelector('#container');

window.onload = (e) => {
    loadHomePage();
}



function loadHomePage() {
    resolveRoute('/home');
}

function request(path) {
    path = fragDir + path + '.html';
    let req = new XMLHttpRequest();
    req.open('GET', path);
    req.send();

    return new Promise((resolve, reject) => {
        req.onload = (e) => {
            if(e.target.status == 200) {
                resolve(e.target.response);
            } else {
                reject(e.target.status);
            }
        };
        req.onerror = reject;
    });
}

function updateContent(content) {
    container.replaceChildren();
    container.innerHTML = content;
}

function updateLinks() {
    links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', checkRoute, false);
    });
}

function resolveRoute(path) {
    request(path)
        .then((content) => {
            updateContent(content);
            updateLinks();
        })
        .catch(() => {
            resolveRoute('/404');
        });
}

function checkRoute(e) {
    console.log(e.target.href);
    if (/route/.test(e.target.className)) {
        e.preventDefault();
        resolveRoute(e.target.href);
    }
}
