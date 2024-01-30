import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home';
import ListarClientes from './Pages/Listar/listar';
import CadastroCliente from './Pages/Cadastrar/cadastro';

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
