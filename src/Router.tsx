import { Route, Routes } from 'react-router-dom'

import { Exames } from './pages/Exames'
import { DadosCadastrais } from './pages/DadosCadastrais'
import { LoginPatient } from './pages/LoginPatient'



export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={< LoginPatient />} />
        <Route path="/dadoscadastrais" element={< DadosCadastrais />} />
        <Route path="/exames" element={< Exames />} />
      </Route>
    </Routes>
  )
}