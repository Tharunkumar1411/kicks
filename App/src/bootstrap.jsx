import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(<App />);
