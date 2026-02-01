// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PublicRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
