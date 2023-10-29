import React from "react";
import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/matches/context";
import { SportsProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";
import router from "./routes"
import { RouterProvider } from "react-router-dom";
import './App.css'


const App = () => {

  return (
    <ArticlesProvider>
      <MatchesProvider>
        <SportsProvider>
          <TeamsProvider>
            <RouterProvider router={router} />
          </TeamsProvider>
        </SportsProvider>
      </MatchesProvider>
    </ArticlesProvider>
  )
}

export default App
