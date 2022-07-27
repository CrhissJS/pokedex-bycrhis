import './App.css'
import {HashRouter, Route, Routes} from 'react-router-dom'
import UserInput from './components/UserInput'
import Pokedex from './components/Pokedex'
import PokemonInfo from './components/PokemonInfo'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {



  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UserInput />}/>
        <Route element ={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />}/>
          <Route path="/pokedex/:id" element={<PokemonInfo />}/>
        </Route>
      </Routes>
    </HashRouter>

  )
}

export default App
