//캔버스세팅
//방향키를 누르면 우주선의 x,y좌표가 바뀌고 다시 render 그려준다
//총알만들기
//1.스페이스바를 누르면 총알 발사
//2.총알의 Y값은 --, 총알의 X값=스페이스를 누른 순간의 우주선의 X좌표
//3.발사된 총알들은 총알 배열에 저장을 한다
//4.모든 총알들은 X.Y좌표값이 있어야하고 총알배열을 render해준다

//적군의 위치가 랜덤하다
//적군은 밑으로 내려온다
//1초마다 하나씩 적군이 생성된다
//적군의 우주선이 바닥에 닿으면 게임오버
//적군과 총알이 만나면 우주선이 사라지고 점수 1점 획득

let canvas;
let ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 700;
const CAN_WIDTH = canvas.width;
const CAN_HEIGHT = canvas.height;

const SPACEWIDTH = 60;
const SPACEHEIGHT = 60;

document.body.appendChild(canvas);

let backgroundImage, spaceShipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false; //true이면 게임이 끝남
let score = 0;

//우주선 좌표
let spaceshipX = CAN_WIDTH / 2 - SPACEWIDTH / 2; //정중앙에 위치하기 위해서 컨버스크기 나누기2에서 우주선넓이/2한값
let spaceshipY = CAN_HEIGHT - SPACEHEIGHT; //우주선의 높이 60을 뺀값

let bulletList = []; //총알들을 저장하는 리스트
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 18;
    this.y = spaceshipY;
    this.alive = true; //true면 살아있는 총알, false면 죽은 총알

    bulletList.push(this);
  };

  this.update = function () {
    this.y -= 7; //총알발사 속도조절
  };

  this.checkHit = function () {
    //총알.y <=적군.y and 총알.x >= 적군.x and 총알.x <= 적군.x+적군의 넓이
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 40
      ) {
        //총알이 죽게됨, 적군의 우주선이 없어짐, 점수획득
        score++;
        this.alive = false; //죽은총알
        enemyList.splice(i, 1);
      }
    }
  };
}

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min; //최대와 최소값이 있는 램덤한 값 가지는 방법
  return randomNum;
}

let enemyList = []; //적군을 저장하는 리스트
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = generateRandomValue(0, CAN_WIDTH - 66);
    this.y = 0;

    enemyList.push(this);
  };

  this.update = function () {
    this.y += 1; //적군의 속도조절

    if (this.y >= CAN_HEIGHT - 40) {
      gameOver = true;
      console.log('gameover');
    }
  };
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = 'img/bg.png';

  spaceShipImage = new Image();
  spaceShipImage.src = 'img/spaceship.png';

  bulletImage = new Image();
  bulletImage.src = 'img/bullet.png';

  enemyImage = new Image();
  enemyImage.src = 'img/enemy.png';

  gameOverImage = new Image();
  gameOverImage.src = 'img/gameover.png';
}

//왼:37, 오:39, 스페이스바:32
let keysDown = {};
function setupkeyboardListener() {
  document.addEventListener('keydown', function (event) {
    keysDown[event.keyCode] = true;
  });
  document.addEventListener('keyup', function (event) {
    delete keysDown[event.keyCode];

    if (event.keyCode == 32) {
      createBullet(); //스페이스바가 올라올때 총알생성함수를 실행시킨다
    }
  });
}

function createBullet() {
  let b = new Bullet(); //총알이 하나 생성
  b.init();
}

function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1000); //1초마다 적군을 계속 생성
}

function update() {
  if (39 in keysDown) {
    //right
    spaceshipX += 5; //우주선속도조절
  }
  if (37 in keysDown) {
    //left
    spaceshipX -= 5;
  }

  //우주선이 캔버스 밖으로 나가지 않도록 하는 작업
  if (spaceshipX < 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= CAN_WIDTH - SPACEWIDTH) {
    spaceshipX = CAN_WIDTH - SPACEWIDTH;
  }

  //총알의 y좌표 업데이트하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  //적군의 y좌표 업데이트하는 함수 호출
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${score}`, 20, 20); //증가하는 점수 보여주는 방법
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      //총알이 살아있을 때만 보여줌
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameOver) {
    update(); //좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main); //canvas가 보여지도록 계속적으로 호출하는 역할을 한다
  } else {
    ctx.drawImage(gameOverImage, 10, 100, 380, 380);
  }
}

loadImage();
setupkeyboardListener();
createEnemy();
main();
