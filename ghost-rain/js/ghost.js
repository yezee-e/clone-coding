let createGhost = () => {
  const ghostElement = document.createElement('div');

  ghostElement.style.position = 'absolute';
  ghostElement.style.top = '0px';

  let randomLeft = randomRange(0, BG_WIDTH - GHOST_WIDTH);
  ghostElement.style.left = randomLeft + 'px';

  ghostElement.style.width = GHOST_WIDTH + 'px';
  ghostElement.style.height = GHOST_HEIGHT + 'px';
  ghostElement.style.background = `url('./img/ghost.png') no-repeat`;

  ghostElement.className = 'ghost';

  bgElement.appendChild(ghostElement);

  setInterval(function () {
    //1. 고스트 요소 접근
    console.log(ghostElement);
    //2.top가져온다
    //3.2번에서 숫자 추출, 1+px
    let ghostTopNum = parseInt(ghostElement.style.top.split('px')[0]) + 10;
    let ghostLeftNum = parseInt(ghostElement.style.left.split('px')[0]);
    let heroLeftNum = parseInt(hero.style.left.split('px')[0]);
    if (ghostTopNum > BG_HEIGHT - (GHOST_HEIGHT + HERO_WIDTH)) {
      if (
        ghostLeftNum < heroLeftNum &&
        heroLeftNum < ghostLeftNum + GHOST_HEIGHT
      ) {
        killGhost(ghostElement);
        return;
      }
    }

    if (ghostTopNum > BG_HEIGHT - GHOST_HEIGHT) {
      ghostElement.remove();
      return;
    }
    ghostElement.style.top = ghostTopNum + 'px';

    //4.다시할당
  }, 100);
};

function killGhost(ghostElement) {
  ghostElement.classList.add('die');

  setTimeout(function () {
    ghostElement.remove();
  }, 3000);
}

createGhost();

setInterval(createGhost, 3000);

function randomRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
