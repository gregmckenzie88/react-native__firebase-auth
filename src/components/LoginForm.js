import React, { Component } from "react";
import { Text } from "react-native";
import { Button, Card, CardSection, Input, Spinner } from "./common";
import firebase from "firebase";

class LoginForm extends Component {
  state = { email: "", password: "", error: "", loading: false };
  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }
  onLoginFail() {
    this.setState({ error: "authentication failed", loading: false });
  }
  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      text: "",
      loading: false,
      error: ""
    });
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner size={"small"} />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={"user@email.com"}
            label={"Email"}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder={"password"}
            label={"Password"}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

export default LoginForm;
