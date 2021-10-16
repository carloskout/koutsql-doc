

let links = null;
const fragDir = './fragments';
const container = document.querySelector('#container');


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
    
    if (/route/.test(e.target.className)) {
        e.preventDefault();
        let index = e.target.href.lastIndexOf('/');
        path = e.target.href.substring(index);
        resolveRoute(path);
    }

}

window.onload = (e) => {
    resolveRoute('/home');
};



