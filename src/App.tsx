import { BrowserRouter, Routes } from 'react-router-dom';
import getAppRoutes from './appRoutes';

export default function App() {
  return (
    <div className="overflow-x-auto">
      <BrowserRouter>
        <Routes>
          {getAppRoutes()}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

