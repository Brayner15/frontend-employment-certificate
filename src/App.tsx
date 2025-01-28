import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { UsersTable } from './components/UsersTable';
import { Layout } from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<UsersTable />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App
