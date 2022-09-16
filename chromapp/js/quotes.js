const quotes = [
  {
    quote: '하면 된다가 아니라 되면 한다',
    author: 'H yeji',
  },
  {
    quote: '고생끝에 골병난다',
    author: 'H yeji',
  },
  {
    quote: '눈치 챙겨라',
    author: 'anual84',
  },
  {
    quote: '좋은 수입만큼 좋은 약은 없다',
    author: 'H yeji',
  },
  {
    quote: '잠을 자면 꿈을 꾸지만, 안자면 졸리다',
    author: 'H yeji',
  },
  {
    quote: '열정이 식은줄 알았다 체력이 나빠진 거였다',
    author: 'H yeji',
  },
  {
    quote: '네 꿈이 널 두렵게 하지 않는다면 그 꿈은 충분히 크지 않은 것이다',
    author: 'Muhammad Ali',
  },
  {
    quote: '치킨은 가슴이 시킨다',
    author: 'H yeji',
  },
  {
    quote: 'B와 D사이에 C가 있다 즉, Birth와 Death사이에 Chicken이 있다',
    author: 'H yeji',
  },
  {
    quote:
      '우주에서 보면 난 그냥 우주먼지 중 하나라는데 먼지치고는 너무 고생이 많다',
    author: 'H yeji',
  },
];

const quote = document.querySelector('#quote span:first-child');
const author = document.querySelector('#quote span:last-child');

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
