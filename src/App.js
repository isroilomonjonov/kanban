import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context/AppContext";
import { useContext } from "react";
import BoardPage from "./pages/BoardPage";
function App() {
  const ctx = useContext(AppContext);
  return (
    <>
      <ToastContainer />
      <Routes>
        {ctx?.boards.map(({ id, href }) => (
          <Route
            key={id}
            path={href}
            element={<BoardPage id={id} href={href} />}
          />
        ))}
        <Route
          path="*"
          element={
            <BoardPage id={ctx.boards[0]?.id} href={ctx.boards[0]?.href} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
