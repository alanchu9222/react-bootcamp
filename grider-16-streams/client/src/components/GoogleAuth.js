import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "720958182445-n558eqc0o59m16o36solb2hsu1btq7f3.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          alert("First Time");
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      alert("Sign In");
      this.props.signIn();
    } else {
      alert("Sign Out");
      this.props.signOut();
    }
  };
  // if (isSignedIn) {
  //   this.props.signIn(this.auth.currentUser.get().getId());
  // } else {
  //   this.props.signOut();
  // }

  onSignInClick = () => {
    this.auth.signIn();
    alert("signin click");
  };

  onSignOutClick = () => {
    this.auth.signOut();
    alert("signout click");
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
