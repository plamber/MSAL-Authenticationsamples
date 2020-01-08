import React, { Component } from 'react';
import { msalAuth } from '../msal/MsalAuthProvider'
import { getUserDetails } from '../graph/GraphService'

export class GraphData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isLoading: true,
            error: null
        };
    }

    async componentDidMount() {
        try {
            const accessTokenRequest = {
                scopes: ["user.read"]
            }
            var accessToken = null;
            try {
                accessToken = await msalAuth.acquireTokenSilent(accessTokenRequest);
            }
            catch (error) {
                console.log("AquireTokenSilent failure");
                accessToken = await msalAuth.acquireTokenPopup(accessTokenRequest);
            }

            if (accessToken) {
                var user = await getUserDetails(accessToken);
                this.setState({
                    user: user,
                    isLoading: false,
                    error: null
                });
            }
            else {
                this.setState({
                    user: null,
                    isLoading: false,
                    error: "No access token..."
                });
            }
        }
        catch (err) {
            var error = {};
            if (typeof (err) === 'string') {
                var errParts = err.split('|');
                error = errParts.length > 1 ?
                    { message: errParts[1], debug: errParts[0] } :
                    { message: err };
            } else {
                error = {
                    message: err.message,
                    debug: JSON.stringify(err)
                };
            }

            this.setState({
                user: {},
                isLoading: false,
                error: error
            });
        }
    }

    render() {
        let contents = this.state.isLoading
            ? <p><em>Loading...</em></p>
            : <div><pre>{JSON.stringify(this.state.user, null, 2)}</pre></div>;

        return (
            <div>
                <h1 id="tabelLabel" >Graph info</h1>
                <p>This information comes from graph.</p>
                {contents}
            </div>
        );
    }
}
