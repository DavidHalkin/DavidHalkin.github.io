$(function(){

$('.go-comment').on('click', function(e){
  $('html,body').stop().animate({ scrollTop: $('#go-comment').offset().top }, 1000);
  e.preventDefault();
});

});
// kill  autoFocus in fancybox
$("[data-fancybox]").fancybox({
	autoFocus : false
});