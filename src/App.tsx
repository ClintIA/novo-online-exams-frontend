import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import AuthProvider from "../src/contexts/AuthContext";
import { CpfProvider } from '../src/contexts/CpfContext'; 


export function App() {
  return (
    <CpfProvider>
      <AuthProvider>
        <BrowserRouter>
            <Router />

        </BrowserRouter>
      </AuthProvider>
    </CpfProvider>
  )
}