import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import ListarClientes from './Pages/listar';
import CadastroCliente from './Pages/cadastro';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listar" element={<ListarClientes />} />
          <Route path="/cadastro" element={<CadastroCliente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
