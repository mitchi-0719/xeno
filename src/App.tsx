import { Navigate, Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Layout } from "./Layout";

export const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};
