import React from "react";
import { ArticlesProvider } from "./context/articles/context";
import router from "./routes"
import { RouterProvider } from "react-router-dom";
import './App.css'

const App = () => {

  return (
    <ArticlesProvider>
      <RouterProvider router={router} />
    </ArticlesProvider>

  )
}

export default App
