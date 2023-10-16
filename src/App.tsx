import React from "react";
import { ArticlesProvider } from "./context/articles/context";
import router from "./routes"
import { RouterProvider } from "react-router-dom";
import './App.css'
import { TokenProvider } from "./context/authToken";

const App = () => {

  return (
    <ArticlesProvider>
      <TokenProvider>
        <RouterProvider router={router} />
      </TokenProvider>
    </ArticlesProvider>
  )
}

export default App
