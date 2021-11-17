// react
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios';

// page
import Home from './page/Home/Home';
import SearchResult from './page/SearchResult/SearchResult';
import Issues from './page/Issues/Issues';
import NotFound from './page/NotFound/NotFound';

const App = () => {

	// API 시간당 요청 횟수가 적어 빠르게 새로고침할 시 문제가 생길 수 있습니다. 
	// API 시간당 요청을 늘리기 원한다면 src와 같은 경로에 .env 파일을 만들고 'REACT_APP_KEY = 토큰'을 추가해주세요. 그리고 아래 주석을 해제해주세요. 
	// axios.defaults.headers.common["Authorization"] = `token ${process.env.REACT_APP_KEY}`;

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true} render={() => <Home />} />
				<Route path="/SearchResult" exact={true} render={() => <SearchResult />} />
				<Route path="/Issues" exact={true} render={() => <Issues />} />
				<Route exact={true} render={() => <NotFound  />} />
			</Switch>
		</BrowserRouter>
	)
  
}

export default App;
