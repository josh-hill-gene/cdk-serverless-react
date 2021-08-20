import React from "react";
import { User } from "../models/Models";
import { AuthService } from "../services/AuthService";
import { Login } from "./Login";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, {}> {
  private authService: AuthService = new AuthService();

  render() {
    return (
      <div>
        App is here!
        <Login authService={this.authService} />
      </div>
    );
  }
}
