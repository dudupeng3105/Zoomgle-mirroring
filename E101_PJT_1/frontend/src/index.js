// 프로젝트의 엔트리 파일임 src/index.js
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/index';
import { BrowserRouter } from 'react-router-dom';
import { authActions } from './store/auth-slice'

function loadUser() {
  try {    
    const user = localStorage.getItem('user');
    if(!user) return;

    store.dispatch(authActions.setUser(JSON.parse(user)));
  } catch (e) {
    console.log('localStorage is not working');
  }
}

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
