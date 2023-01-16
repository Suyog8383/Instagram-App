import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import './index.css';
import BasicModal from './components/post/Post';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BasicModal />
  </>
);
