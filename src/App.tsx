import React from "react";
import Articles from './pages/articles/index';
import { ArticlesProvider } from "./context/articles/context";


const App = () => {

  return (
    <ArticlesProvider>
      <Articles />
    </ArticlesProvider>

  )
}

export default App
