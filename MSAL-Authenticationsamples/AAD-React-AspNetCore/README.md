# AAD-React-AspNetCore - How do I authenticate against Azure AD using React SPA and ASP.NET Core?
More instructions can be found [here](https://www.nubo.eu/How-do-I-authenticate-against-Azure-AD-using-React-SPA-and-ASP-NET-Core/).

This sample shows how you force an authentication against Azure AD using React SPA and ASP.NET Core. You can use this project and extend it to more complex scenarios if required.

The solution uses ASP.NET Core 3.0, MSAL.JS and React SPA. Authentication was tested with a single tenant and multitenant application. 

## Getting started
You can just try it out or configure ith with your own Azure AD application.

### Without your Azure AD application
You can already start the app. We created a multi-tenant application that is associated with that web application.

### With your own Azure AD application
#### Register your app
- Go to the [App Registration in Azure AD](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)
- Press *New registration*
- Specify a name and choose the desired account types (Single tenant, Multitenant) and then press *Register*
- Copy the *Application (client) ID* (**yourClientID**) and *Directory (tenant) ID* (**yourTenantID**)
- Go to *Authentication*
  - Under *Redirect URIs* create two entries: https://localhost:44321/signin-oidc, https://localhost:44366/
  - Under *Implicit grant* select *Access tokens* and *ID tokens* 

### Configure Visual Studio
- Go under *ClientApp* -> *src* -> *msal* -> *MsalConfig.js*
  - Replace the *clientId* value with **yourClientID**
  - In case you configured a single tenant application, replace *common* in the *authority* value with **youTenantID**
    

