
window.addEventListener('load', (e) => {
    sidebarHideEvent();
    //hljs.configure({language: 'php'});
});

function sidebarHideEvent() {
    let sidebar = document.querySelector('.sidebar');

    let btn = document.querySelector('.btn-bar');
    btn.addEventListener('click', (e) => {
        sidebar.classList.toggle('sidebar-hide');
        btn.classList.toggle('btn-sidebar-hide');
    });

    if(window.matchMedia("(max-width: 767.98px)").matches) {
        sidebar.classList.toggle('sidebar-hide');
        btn.classList.toggle('btn-sidebar-hide');
        console.log('wawes');
    }
}





