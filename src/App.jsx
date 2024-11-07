import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { LayOut } from './LayOut'
import { Home } from './pages/Home';
import { MovieProvider, SearchProvider, UIProvider, SelectedProvider, SearchedProvider } from './context/moviesContext';
import { Search } from './pages/Search';
import { Watch } from './pages/Watch';
import { Shows } from './pages/Shows';

function App() {

  return <MovieProvider>
    <UIProvider>
      <SelectedProvider>
        <BrowserRouter>
          <SearchProvider>
            <SearchedProvider>
              <Routes>
                <Route path='/' element={<LayOut />}>
                  <Route index element={<Navigate to="browse" />} />
                  <Route path='browse' element={<Home />} />
                  <Route path="search" element={<Search />} />
                  <Route path='/browse/genre/83' element={<Shows />} />
                </Route>
                <Route path="/watch" element={<Watch />} />
              </Routes>
            </SearchedProvider>
          </SearchProvider>
        </BrowserRouter>
      </SelectedProvider>
    </UIProvider>
  </MovieProvider >
}

export default App
