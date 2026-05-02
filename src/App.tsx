import { Navigate, Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};
