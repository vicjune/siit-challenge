import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { Path } from './Path';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.HOME} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
