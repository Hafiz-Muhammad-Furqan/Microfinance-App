import React from "react";
import { UserProvider } from "./context/UserContext";
import { ToastContainer, Bounce } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <AppRoutes></AppRoutes>
    </UserProvider>
  );
}

export default App;
