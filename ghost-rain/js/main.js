document.addEventListener('keydown', function (e) {
  //키 누르면 발생할 동작

  const heroLeft = getComputedStyle(hero).left;
  const heroLeftWithoutPx = parseInt(heroLeft.split('px')[0]);

  if (
    (heroLeftWithoutPx - 10 <= 0 && e.keyCode === 37) ||
    (heroLeftWithoutPx + 10 < BG_WIDTH - HERO_WIDTH && e.keyCode === 39)
  ) {
    return;
  }

  if (e.keyCode === 37) {
    //왼쪽키
    hero.style.left = heroLeftWithoutPx - 10 + 'px';
    console.log(heroLeftWithoutPx - 10 + 'px');
  } else if (e.keyCode === 39) {
    //오른쪽키
    hero.style.left = heroLeftWithoutPx + 10 + 'px';
    console.log(heroLeftWithoutPx + 10 + 'px');
  }
});
