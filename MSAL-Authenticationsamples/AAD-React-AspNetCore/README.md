# AAD-React-AspNetCore
ASP.NET Core 3.0 project with React SPA and MSAl.JS authentication.

## Without your Azure AD application
You can already start the app. We created a multi-tenant application that is associated with that web application.

## With your own Azure AD application
### Register your app
- Go to the (https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)[App Registration in Azure AD]
- Press *New registration*
- Specify a name and choose the desired account types (Single tenant, Multitenant) and then press *Register*
- Copy the *Application (client) ID* (**yourClientID**) and *Directory (tenant) ID* (**yourTenantID**)
- Go to *Authentication*
  - Under *Redirect URIs* create two entries: https://localhost:44321/signin-oidc, https://localhost:44366/
  - Under *Implicit grant* select *Access tokens* and *ID tokens* 

## Configure Visual Studio
- Go under *ClientApp* -> *src* -> *msal* -> *MsalConfig.js*
  - Replace the *clientId* value with **yourClientID**
  - In case you configured a single tenant application, replace *common* in the *authority* value with **youTenantID**
    

