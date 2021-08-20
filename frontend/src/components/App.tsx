import React from "react";
import { User } from "../models/Models";
import { AuthService } from "../services/AuthServices";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, {}> {
  private authService: AuthService = new AuthService();

  render() {
    return <div>App is here!</div>;
  }
}
