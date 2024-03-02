// App.js
import { HomePage } from "./pages/home";
import { HistoryPage } from "./pages/history";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./styles/Header/styles.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
