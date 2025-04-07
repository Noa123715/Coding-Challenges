import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main.js'
import './App.css';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* routes the page to the landing page */}
        <Main />
      </BrowserRouter>
    </div>
  );
}