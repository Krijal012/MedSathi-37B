// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <PublicRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
