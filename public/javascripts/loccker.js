$(document).ready(() => {
  $('.toast').toast('show');
  $('[data-toggle=popover]').popover();
  modifyNavbar();

});
function modifyNavbar() {
  console.log("yo");
  if (window.innerHeight > window.innerWidth) {
    document.getElementById('mainNavbar').style.display = 'none';
    document.getElementById('mainNavbarMobile').style.display = 'initial';
  } else {
    document.getElementById('mainNavbarMobile').style.display = 'none';
    document.getElementById('mainNavbar').style.display = 'initial';
  }
  
}
$(window).resize(() => {
  modifyNavbar();
});
