//Button Up
$('.back-to-top').click(function () {
  $('body,html').animate({ scrollTop: 0}, 800); // 800 - Скорость анимации
});

$(window).scroll(function() { // Отслеживаем начало прокрутки
  let scrolled = $(window).scrollTop(); // Вычисляем сколько было прокручено.

  if(scrolled > 3) { // Если высота прокрутки больше 3 - показываем кнопку
      $('.back-to-top').addClass('active');
  } else {
      $('.back-to-top').removeClass('active');
  }
});




function triggerDownload(fileName) {
    var element = document.createElement('a');
    element.setAttribute('href', fileName);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    // Происходит клик, словно совершил его сам программирующий ниндзя
    element.click();
    document.body.removeChild(element);
  }

