import React from "react";
import { User } from "../models/Models";
import { AuthService } from "../services/AuthService";
import { Login } from "./Login";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    this.setUser = this.setUser.bind(this);
  }

  private authService: AuthService = new AuthService();

  private setUser(user: User) {
    this.setState({
      user: user
    });
    console.log('setting the user: ', user);
  }

  render() {
    return (
      <div>
        App is here!
        <Login authService={this.authService} setUser={this.setUser} />
      </div>
    );
  }
}
