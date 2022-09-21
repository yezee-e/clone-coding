const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //ctx=context
const lineWidth = document.getElementById('line-width');

const color = document.getElementById('color');
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
);

const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');

const fileInput = document.getElementById('file');
const textInput = document.getElementById('text');
const saveBtn = document.getElementById('save');

canvas.height = 800;
canvas.width = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round'; //lineCap은 선이 끝나는 지점을 어떻게 보일지 결정

let isPainting = false;
let isFilling = false;

let onMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY); //mousemove의 위치좌표
};

let cancelPainting = () => {
  isPainting = false;
  ctx.beginPath();
};

let onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};

let onColorChange = (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
};

let onColorClick = (event) => {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue; //사용자에게 선택한 컬러로 바뀌었다는 것을 알려주기 위해
};

let onModeClick = () => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Draw';
  } else {
    isFilling = true;
    modeBtn.innerText = 'Fill';
  }
};

let onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
};

let onDestroyClick = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 800);
};

let onEraserClick = () => {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = 'Draw';
};

let onFileChange = (event) => {
  const file = event.target.files[0]; //하나의 사진만 사용하기 때문에 파일배열에서 첫번째 파일만 필요
  const url = URL.createObjectURL(file);
  const image = new Image(); //생성자 함수로 object로 반환
  image.src = url; //img태그의 src속성을 브라우저에서 불로온 url로 설정
  image.onload = function () {
    ctx.drawImage(image, 0, 0, 800, 800);
  }; //addeventlistener를 만드는 다른 방법
  fileInput.value = none; //to show the file name as 'No file chosen' 그리고 이미지 위에 다른 이미지를 추가할 수 있다
};

let onDoubleClick = (event) => {
  const text = textInput.value;
  if (text !== '') {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = '48px serif';
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
};

let onSaveClick = () => {
  const url = canvas.toDataURL(); //url로 인코딩 시켜주는 canvas메서드
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click(); //링크를 클릭하면(버튼을 누르면) 파일이 다운로드 되게 함
};

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', function (event) {
  isPainting = true;
});
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);

fileInput.addEventListener('change', onFileChange); //change는 파일에 변화가 생기면 함수가 실행
canvas.addEventListener('dblclick', onDoubleClick);
saveBtn.addEventListener('click', onSaveClick);
