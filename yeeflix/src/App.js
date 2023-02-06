import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;

//1. 3개의 펭지 필요(홈페이지, movie페이지, movieDetail페이지
//2. 홈페이지에서 배너를 볼 수 있다
//2-1. 3가지 섹션의 영화를 볼 수 있다(popular,top rated,upcoming)
//2-2. 각 영화에 마우스를 올려두면 (제목,장르,인기도,청불여부 )
//2-3. 영화를 슬라이드로 넘기면서 볼 수 있다
//3. 영화 디테일 페이지에서 영화에 대한 디테일한 정보확인
//4. trailer를 누르면 trailer 볼 수 있다
//5. 영화에 리뷰 볼 수 있다
//6. 관련된 영화 볼 수 있다
//7. 검색기능
//8. 영화를 정렬기능
//9. 영화필터링기능
