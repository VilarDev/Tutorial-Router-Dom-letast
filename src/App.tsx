import { Link } from 'react-router-dom'; 

import './App.css'; 

function App() {
  return (
    <> 
      <h1>Bookkeeper!</h1> {/* 👈 Corrigido o h1 */}
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/invoices">Invoices</Link> 
        <Link to="/expenses">Expenses</Link> 
      </nav>
      
    </>
  );
}

export default App;