//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
//만약에 유저가 램덤번호를 맞추면, 맞췄습니다!!
//랜덤번호가 < 유저번호 down!!
//램덤번호가 > 유저번호 up!!
//reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다(더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면 ,알려준다. 기회를 깍지 않는다


let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history=[]

playButton.addEventListener("click",play) //함수도 매개변수로 넘길 수 있다
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){userInput.value=""})


function pickRandomNum() {
    computerNum =Math.floor(Math.random()*50)+1
    console.log("정답",computerNum)

}

function play() {
   const userValue=userInput.value

   if(userValue<1 || userValue>50){
       resultArea.textContent ="1과 50사이 숫자를 입력해 주세요"
       return
   }

   if(history.includes(userValue)){
       resultArea.textContent ="이미 입력한 숫자입니다 다른 숫자를 입력해 주세요"
       return
   }

   chances --
   chanceArea.textContent=`남은기회:${chances}번`
   console.log("chance",chances)

   if(userValue < computerNum){
       resultArea.textContent ="UP!!!"
       
   }else if(userValue > computerNum){
       resultArea.textContent="DOWN!!!"
       
   }else{
       resultArea.textContent="딩동댕동~~"  
       gameOver = true
      
   }

   history.push(userValue)
   console.log(history)

       if(chances==0){
           gameOver=true
           
       }
       if(gameOver ==true){ 
           playButton.disabled =true
      
   }
}

function reset(){
    //user input 창이 깨끗하게 정리
    //새로운 번호가 생성
    userInput.value=""
    pickRandomNum()

    resultArea.textContent="게임을 시작하지"

    gameOver = false;
  playButton.disabled = false;
  chances = 5;
  history=[]
  chanceArea.textContent=`남은기회:${chances}번`


}

pickRandomNum()