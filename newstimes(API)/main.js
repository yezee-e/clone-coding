let news =[]

const getLatestNews =async() =>{
    let url = new URL("https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10")
    let header =new Headers({"x-api-key" : " Kv9UzlYUBPV4Sgn-uafeNpKG-v0K9x-HJGJiHzhbktE"})
    let response =await fetch(url,{headers:header})
    let data =await response.json() //response에서 결과물을 뽑아내는 작업 

    news =data.articles

    
}

getLatestNews()