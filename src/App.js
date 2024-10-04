import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  </Provider>
  );
}

export default App;
