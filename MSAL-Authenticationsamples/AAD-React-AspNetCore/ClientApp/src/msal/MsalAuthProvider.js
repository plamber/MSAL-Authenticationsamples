import React, { Component } from 'react';
import { msalConfig } from './MsalConfig';
import { UserAgentApplication } from 'msal';

export const msalAuth = new UserAgentApplication({
    auth: msalConfig
});

export function withAuth(HocComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isAuthenticated: false,
                user: {},
                renewIframe: false,
                hasError: false,
                errorMessage: null
            };
        }

        async componentWillMount() {
            msalAuth.handleRedirectCallback(() => {
                let userAccount = msalAuth.getAccount();

                this.setState({
                    isAuthenticated: true,
                    user: userAccount
                });
            }, (authErr, accountState) => {  // on fail
                console.log(authErr);

                this.setState({
                    hasError: true,
                    errorMessage: authErr.errorMessage
                });
            });

            if (msalAuth.isCallback(window.location.hash)) {
                this.setState({
                    auth: {
                        renewIframe: true
                    }
                });
                return;
            }

            let userAccount = msalAuth.getAccount();
            if (!userAccount) {
                msalAuth.loginRedirect({});
                return;
            } else {
                this.setState({
                    isAuthenticated: true,
                    user: userAccount
                });
            }
        }

        onSignIn() {
            msalAuth.loginRedirect({});
        }

        onSignOut() {
            msalAuth.logout();
        }

        render() {
            if (this.state.renewIframe) {
                return <div>hidden renew iframe - not visible</div>;
            }

            if (this.state.isAuthenticated) {
                return <HocComponent auth={this.state} onSignIn={() => this.onSignIn()} onSignOut={() => this.onSignOut() } {...this.props} />;
            }

            if (this.state.hasError) {
                return <div>{this.state.errorMessage}</div>;
            }

            return <div>Login in progress...</div>;
        }
    };
}
