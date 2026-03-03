import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AgentsPage } from './pages/AgentsPage';
import { FlowPage } from './pages/FlowPage'
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Агенты</Link>
        <Link to="/flow" className={styles.link}>Редактор графа</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<AgentsPage />} />
        <Route path="/flow" element={<FlowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;