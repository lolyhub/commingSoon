$(document).ready(function() {
  $(".history-page #wishlist").stick_in_parent();
  $('#product-gallery li').click(function(){
    $(this).addClass('active').siblings('li').removeClass('active')
    var src= $(this).children('img').attr('src')
    $('#product-gallery .big-image').removeClass('active').children('img').attr('src',src)
    setTimeout(function() {
          $('#product-gallery .big-image').addClass('active');
        }.bind(this), 300); //Here delay in milliseconds
  })
  $('body').on('click','.lp-count .bttn' , function(){

    var currentValue = parseInt($(this).siblings('input').val());
    var plus= 1;
    if (currentValue > 100){
      plus=100;
    }
    if ($(this).hasClass('plus')){
      $(this).siblings('input').val(currentValue +plus)
    }
    else{
      $(this).siblings('input').val(currentValue -plus)
    }
    get_card_lp_count()
    get_lp_count()
    var eval=$(this).siblings('input').val()
    if(eval<=0 || isNaN(eval) || eval <=" "){$(this).siblings('input').val(0)}
  })
  $('#show-select-redeemable').click(function(){
    $('#select-redeemable').slideDown(600)
  })

  $('#select-redeemable .item').click(function(){
    var imgSrc = $(this).find('img').attr('src');
    var itemId = $(this).attr('data-id');
    $(this).toggleClass('active');

    $('#checkout-lp').slideDown('slow')
    if ($(this).hasClass('active')){
      $('#checkout-lp table').append(`<tr data-id="`+itemId+`">
        <td><img src="`+imgSrc +`" alt=""></td>
        <td><h3>8000</h3><p>LP 4800</p></td>
        <td>
          <div class="lp-count">
            <div class="bttn plus"><i class="fa fa-plus"></i></div>
            <input type="text" value="2000">
            <div class="bttn minus"><i class="fa fa-minus"></i></div>
          </div><!-- End .lp-count -->
        </td>
        <td>
          <h4>2000</h4>
          <a href="#" class="remove"><i class="fa fa-times-circle-o"></i></a>
          <a href="#" class="help"><i class="fa fa-info-circle"></i></a>
        </td>
      </tr>`)
    }
    else{
      $('#checkout-lp tr[data-id='+itemId+']').remove()
    }
    get_lp_count()
    return false;
  })
  $('body').on('click','#checkout-lp tr .remove', function(){
    var itemId = $(this).parents('tr').attr('data-id')

    $('#select-redeemable .item[data-id='+itemId+']').removeClass('active')
    $(this).parents('tr').fadeOut(5000).delay(800).remove()
    get_lp_count()
    return false;
  })
  // start main slider
  $('#da-slider').slick({
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
  	// easing: 'easeInOutSine',
  	// prevArrow: $('#main-slider-navs .prev') ,
  	// nextArrow: $('#main-slider-navs .next')

  });
  // end main slider
  $('#show-select-redeemable').click(function(){
    $('html,body').animate({
        scrollTop: $("#select-redeemable").offset().top},
        'slow');
  })



      $('body').on('keydown','.lp-count input', function(e){
        var eval=$(this).val()
        if(eval<=0 || isNaN(eval) || eval <=" "){$(this).val(0)}
         // Allow: backspace, delete, tab, escape, enter and .
          if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
               // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
               // Allow: Ctrl+C
              (e.keyCode == 67 && e.ctrlKey === true) ||
               // Allow: Ctrl+X
              (e.keyCode == 88 && e.ctrlKey === true) ||
               // Allow: home, end, left, right
              (e.keyCode >= 35 && e.keyCode <= 39)) {
                   // let it happen, don't do anything
                   return;
          }
          // Ensure that it is a number and stop the keypress
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
          }
      })
      $('body').on('keyup',' .lp-count input', function(e){
         // Allow: backspace, delete, tab, escape, enter and .
        get_lp_count()
        get_card_lp_count()

      })
      function get_lp_count() {
        var arrNumber = new Array();
        $('#checkout-lp table tr  input').each(function(){
        arrNumber.push($(this).val());
        })
        var result = arrNumber.map(function (x) {
            return parseInt(x, 10);
        });
        var total = 0;
        for (var i = 0; i < arrNumber.length; i++) {
            total += arrNumber[i] << 0;
        }
        $('#checkout-lp .lp-num b').text(total)

      }

      function get_card_lp_count() {
        var arrNumber = new Array();
        $('.card-items .item  input').each(function(){
          var price = $(this).parents('.item').find('.price-lp h4').text()
        arrNumber.push($(this).val() * price);
        })
        var result = arrNumber.map(function (x) {
            return parseInt(x, 10);
        });
        var totalLp = 0;
        for (var i = 0; i < arrNumber.length; i++) {
            totalLp += arrNumber[i] << 0;
        }
        $('.total-count-items .number').text(totalLp)
        if ($('.total-count-items .number').text()==0){$('.total-count-items').fadeOut(500)}else{$('.total-count-items').fadeIn(500)}
        $('#wishlist .total .number').text($('.total-count-items .number').text())
        $('.card-page #wishlist .title .number').text($('.card-items .item').length + 'Items')
      }

$('.card-items .remove-item,.history-day .item .remove-item a').click(function(){
  $(this).parents('.item').remove()
  get_card_lp_count()

  return false;
})
$('.history-day .item .remove-item a').click(function(){
  $(this).parents('.col-sm-6.col-md-4').remove()
  get_date_redeemed()
  return false;
})
  get_card_lp_count()
  get_date_redeemed()
  $(function () {
              $('#datetimepicker1').datetimepicker();
          });

  $('.checkout-count .proceed').click(
    function(e){$('#select-redeemable,#checkout-lp').slideUp('slow')
    $('html,body').animate({
        scrollTop: $(".product-details").offset().top},'slow');
        $('.redeem-det div,.redeem-det button').fadeOut('slow')
        $('.redeem-det').append('<h3 style="color:#ec203a">Thank You For Proced </h3>')
    e.preventDefault()
  })

});
get_date_redeemed()
$('#wishlist .total .num').text($('.history-day:first-of-type .count .num').text());
$('#wishlist .title span').text('(' + $('.history-day:first-of-type').attr('data-date') +')');
function get_date_redeemed() {
  var totalAll=0;
  $('.history-day').each(function(){
    var arrNumber = new Array();
    $(this).find('.item').each(function(){
      var price = $(this).find('.price .num').text()
      arrNumber.push( price);
    })

    var totalLp = 0;
    for (var i = 0; i < arrNumber.length; i++) {
        totalLp += arrNumber[i] << 0;
    }
    totalAll += totalLp;
    $(this).find('.count .num').text(totalLp)

    $('#wishlist .total-all').text(totalAll +' LP');

    if ($(window).scrollTop() +50 >= $(this).offset().top ) {
      $('#wishlist .total .num').text($(this).find('.count .num').text());
      $('#wishlist .title span').text('(' + $(this).attr('data-date') +')');
        return; //break the loop
    }
  })

  // $('.total-count-items .number').text(totalLp)
  // if ($('.total-count-items .number').text()==0){$('.total-count-items').fadeOut(500)}else{$('.total-count-items').fadeIn(500)}
  // $('#wishlist .total .number').text($('.total-count-items .number').text())
  // $('.card-page #wishlist .title .number').text($('.card-items .item').length + 'Items')
  //
}

$(window).load(function () {

    $(window).on("scroll resize load", function () {
      get_date_redeemed()
    });

    $(document).ready(function () {
        $(window).trigger('scroll'); // init the value
    });

})
