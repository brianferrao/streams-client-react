import React from 'react';
import { connect } from 'react-redux';
import { signOut, signIn } from '../actions';


class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: '530213929434-9q8a4io5k5frgcoprvjh88i47cjc40gp.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth2Client = window.gapi.auth2.getAuthInstance();
                this.onSignedInChange(this.auth2Client.isSignedIn.get());
                this.auth2Client.isSignedIn.listen(this.onSignedInChange);
            })
        });
    }

    onSignedInChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth2Client.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignOutClick = () => {
        this.auth2Client.signOut();
    }

    onSignInClick = () => {
        this.auth2Client.signIn();
    }

    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return null;
        }else if (this.props.isSignedIn) {
            return (
                <div>
                    <button className="ui google button red" onClick={this.onSignOutClick}>
                        <i className="google icon"></i>
                        Sign Out
                    </button>
                </div>
            );
        }else {
            return (
                <div>
                    <button className="ui google button red" onClick={this.onSignInClick}>
                        <i className="google icon"></i>
                        Sign In with Google
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn : state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);