let news =[]
let page =1
let total_pages =1
let menus =document.querySelectorAll(".menus button")
let searchButton =document.querySelector("#search-button")


//각 함수에서 필요한 url을 만든다
//api호출 함수를 부른다

const getNews =async()  =>{
    try{
        let header =new Headers({"x-api-key" : " Kv9UzlYUBPV4Sgn-uafeNpKG-v0K9x-HJGJiHzhbktE"})
        url.searchParams.set('page',page) //&page
        console.log("url은?" ,url);
        let response =await fetch(url,{headers:header})
        let data =await response.json() //response에서 결과물을 뽑아내는 작업 
        if(response.status == 200){
            if(data.total_hits ==0){
                throw new Error("검색된 결과값이 없습니다 ")
            }
            news =data.articles
            total_pages =data.total_pages
            page=data.page
            console.log(news)
            render()
            pagenation()
        }else{
            throw new Error(data.message)
        }
    }catch(error){
        console.log("잡힌에러는",error.message);
        errorRender(error.message)
    }

}

const errorRender =(message) =>{
    let errorHTML =`<div class="alert alert-danger text-center" role="alert">
    ${message}
  </div>`
    document.getElementById("news-board").innerHTML =errorHTML
}

menus.forEach(menu => menu.addEventListener("click", (event)=> getNewsByTopic(event)))
let url


const getLatestNews =async() =>{
    url = new URL("https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10")
    getNews()
}

const getNewsByKeyWord=async () =>{
    //1.검색 키워드 읽어오기
    //2.url에 검색 키워드 붙이기
    //3.헤더준비
    //4.url부르기
    //5.데이터 가져오기
    //6. 데이터 보여주기

    let keyword =document.getElementById("search-input").value
    console.log("keyword",keyword);
    url =new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    getNews()
}

const getNewsByTopic = async (event) =>{
    console.log("클릭됨", event.target.textContent)
    let topic = event.target.textContent.toLowerCase()

    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
    getNews()
}


const render =() => {
    let newsHTML =""
    newsHTML= news.map(item =>{
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${item.media||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" alt="">
        </div>
        <div class="col-lg-8">
            <h2> ${item.title} </h2>
            <p>${
                item.summary == null || item.summary == ""
                  ? "내용없음"
                  : item.summary.length > 200
                  ? item.summary.substring(0, 200) + "..."
                  : item.summary
           }</p>
            <div> ${item.rights|| "no source"} * ${moment(item.published_date).fromNow()}</div>
        </div>
    </div>`
    }).join("")





    document.getElementById("news-board").innerHTML =newsHTML
}

searchButton.addEventListener("click", getNewsByKeyWord)


getLatestNews()

const pagenation =() => {
    let pagenationHTML =``
    // total_page
    // page
    // page group
    let pageGroup =Math.ceil(page/5)
    //last
    let last = pageGroup*5
    //first
    let first = last-4
    //first~last 페이지 프린트


    if (first >=6) {
    pagenationHTML =`<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(1)">
    <span aria-hidden="true">&lt&lt;</span>
    </a>
    </li>
    <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous"onclick="moveToPage(${page-1})">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li>`
}
    for(let i=first; i<=last; i++){
        pagenationHTML+= ` <li class="page-item ${page==i?"active":""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }
 
    if (last < total_pages) {
    pagenationHTML +=`<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+1})">
      <span aria-hidden="true">&gt;</span>
    </a>
  </li><li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${total_pages})">
  <span aria-hidden="true">&gt&gt;</span>
  </a>
  </li>`
}
   


     document.querySelector(".pagination").innerHTML =pagenationHTML
}

const moveToPage =(pageNum) =>{
    //1.이동하고 싶은 페이지를 알기
    page =pageNum
    console.log("클릭",page);
    //2.이동하고 싶은 페이지를 가지고 api를 다시 호출하기 
    getNews()
}

