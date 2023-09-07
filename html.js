
// メニューボタンをクリックした際にメニューを閉じる関数
function closeMenu() {
    const menuBtnCheck = document.getElementById('menu-btn-check');
    if (menuBtnCheck) {
        menuBtnCheck.checked = false;
    }
}

// メニューボタンをクリックした際にメニューを閉じる関数をリンクに関連付ける
const navLinks = document.querySelectorAll('.nav_item a');

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});