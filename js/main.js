
window.addEventListener('load', (e) => {
    sidebarHideEvent();
    //hljs.configure({language: 'php'});
});

function sidebarHideEvent() {
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('.main-content');

    let btn = document.querySelector('.btn-bar');
    btn.addEventListener('click', (e) => {
        sidebar.classList.toggle('hide');
        btn.classList.toggle('hide');
        main.classList.toggle('hide');
    });

    if(window.matchMedia("(max-width: 767.98px)").matches) {
        sidebar.classList.toggle('hide');
        btn.classList.toggle('hide');
        main.classList.toggle('hide');
    }
}





