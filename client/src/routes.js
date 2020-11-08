import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage, LinksPage, DetailPage, CreatePage } from "./pages";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links">
          <LinksPage />
        </Route>

        <Route path="/create">
          <CreatePage />
        </Route>

        <Route path="/detail/:id">
          <DetailPage />
        </Route>

        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};
