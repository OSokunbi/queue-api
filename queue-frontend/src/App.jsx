import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { DequeuePage } from './pages/DequeuePage';
import { EnqueuePage } from './pages//EnqueuePage';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dequeue" element={<DequeuePage />} />
        <Route path="enqueue" element={<EnqueuePage />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex gap-10">
        <Link className="hover:font-bold text-green-500" to="enqueue">Enqueue</Link>
        <Link className="hover:font-bold text-red-500" to="dequeue">Dequeue</Link>
        </div>
    </div>
  );
}