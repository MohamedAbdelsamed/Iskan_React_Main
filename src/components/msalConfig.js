// src/msalConfig.js

export const msalConfig = {
  auth: {
    clientId: "45b4f9ec-320e-4a87-b30c-31cf1c193fe3",
    authority: "https://login.microsoftonline.com/5231574d-3a42-49a3-9cd8-5991d97b05e7", // your tenant
    redirectUri: "http://localhost:3000", // or your own frontend redirect URI
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "api://45b4f9ec-320e-4a87-b30c-31cf1c193fe3/.default",
  ],
  extraQueryParameters: {
    login_hint: "rhabbal@mbrhe.ae",
  },
};

