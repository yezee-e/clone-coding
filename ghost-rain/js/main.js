document.addEventListener('keydown', keydownHero);

function keydownHero(e) {
  const heroLeft = getComputedStyle(heroElement).left; //dom의 css가져오기
  const heroLeftWithoutPx = parseInt(heroLeft.split('px')[0]);

  if (
    (heroLeftWithoutPx - 10 <= 0 && e.keyCode === 37) ||
    (heroLeftWithoutPx + 10 > BG_WIDTH - HERO_WIDTH && e.keyCode === 39)
  ) {
    return;
  }

  if (e.keyCode === 37) {
    //왼쪽키
    heroElement.style.left = heroLeftWithoutPx - 10 + 'px';
  } else if (e.keyCode === 39) {
    //오른쪽키
    heroElement.style.left = heroLeftWithoutPx + 10 + 'px';
  }
}
