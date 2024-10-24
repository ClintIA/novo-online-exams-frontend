import { Route, Routes } from 'react-router-dom'

import { Exames } from './pages/Exames'
import { DadosCadastrais } from './pages/DadosCadastrais'



export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={< Exames />} />
        <Route path="/dadoscadastrais" element={< DadosCadastrais />} />
      </Route>
    </Routes>
  )
}