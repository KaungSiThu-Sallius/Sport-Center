import React from "react";
import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/matches/context";
import { SportsProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";
import { UserPreferencesProvider } from "./context/userPreferences/context";
import router from "./routes"
import { RouterProvider } from "react-router-dom";
import './App.css'


const App = () => {

  return (
    <UserPreferencesProvider>
      <ArticlesProvider>
        <MatchesProvider>
          <SportsProvider>
            <TeamsProvider>
              <RouterProvider router={router} />
            </TeamsProvider>
          </SportsProvider>
        </MatchesProvider>
      </ArticlesProvider>
    </UserPreferencesProvider>
  )
}

export default App
