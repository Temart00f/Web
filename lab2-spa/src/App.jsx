import { Routes, Route, NavLink } from "react-router-dom";
import PrizesPage from "./pages/PrizesPage";
import LaureatesPage from "./pages/LaureatesPage";

function navLinkClass({ isActive }) {
  return isActive ? "active" : "";
}

export default function App() {
  return (
    <>
      <header>
        <h1>Нобелевская премия</h1>
        <p>История, категории и лауреаты</p>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <nav>
        <NavLink to="/" end className={navLinkClass}>
          Категории премий
        </NavLink>
        <NavLink to="/laureates" className={navLinkClass}>
          Лауреаты
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<PrizesPage />} />
        <Route path="/laureates" element={<LaureatesPage />} />
      </Routes>

      <footer>
        <p>© 2026 ООО «ТМЫВ ДЕНЕГ» · Все права не защищены</p>
      </footer>
    </>
  );
}
