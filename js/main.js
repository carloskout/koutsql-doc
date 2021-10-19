let links = undefined;
let navBarLinkClicked = undefined;

let currentPage = 'Página inicial';
let currentPageElem = undefined;

const container = document.querySelector('#container');
const fragDir = './fragments';

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

function updateBreadCrumbs() {
    currentPageElem = document.querySelector('#current-page');
    currentPageElem.textContent = currentPage;
    currentPageElem.href = '#link-top';
}

function updateNavbar(path) {

    /* Method Aux
     * Identifica qual link do menu lateral será marcado
     * como ativo. verifica tambem se o accordion esta estendido,
     * se nao estiver ele o estende
     * 
     * O parametro 'id' pode ser tanto um nome de classe com um id
     */
    function aux(id) {
        let parent = document.querySelector(id);
        let link = parent.querySelector("a[href='" + path + "']");

        if(link) {
            link.classList.toggle('active');
            if(parent.classList.remove('collapse')) {
                parent.classList.add('collapsed');
            }
            return true;
        } else {
            return false;
        }
    }

    let activeLink = document.querySelector('.active');
    if(activeLink) {
        activeLink.classList.remove('active');
    }

    if(navBarLinkClicked) {
        //checa se o evento de click foi disparado por um link
        // auxiliar. os links auxiliares são os que ficam dentro
        // do conteudo que servem para redirecionar o usuario
        // para outras paginas.
        if (/link-aux/.test(navBarLinkClicked.className)) {
            if(!aux('#howToUse')) {
                aux('#lib');
            }
        } else {
            navBarLinkClicked.classList.add('active');
        }
    }

}

function resolveRoute(path) {
    request(path)
        .then((content) => {
            updateContent(content);
            updateLinks();
            updateBreadCrumbs();
            updateNavbar(path);
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
        currentPage = e.target.title;
        navBarLinkClicked = e.target;
        resolveRoute(path);
    }

}

window.onload = (e) => {
    resolveRoute('/home');
    updateBreadCrumbs();
};



