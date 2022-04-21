import axios from "axios";

export function facebookLogin(accessToken) {
  axios
    .post(`http://127.0.0.1:8000/api-auth/convert-token/`, {
      token: accessToken,
      backend: "facebook",
      grant_type: "convert_token",
      client_id: "your client id",
      client_secret: "your client secret ",
    })
    .then((res) => {
        localStorage.setItem("socialTokens", JSON.stringify(res.data.access_token),JSON.stringify(res.data.refresh_token))
        // localStorage.setItem("social_refresh_token", JSON.stringify(res.refresh_token))
      console.log(res.data);
    });
}
export function googleLogin(accessToken) {
  axios
    .post(`http://127.0.0.1:8000/api-auth/convert-token/`, {
      token: accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id:
        "1089820763675-3e0km9kvu9alel0qr5cfv3ldi2gv6ig0.apps.googleusercontent.com",
      client_secret: "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",
    })
    .then((res) => {
        localStorage.setItem("socialTokens", JSON.stringify(res.data.access_token),JSON.stringify(res.data.refresh_token))
      // Save somewhere these access and refresh tokens
      console.log(res.data);
    });
}

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error;
//     console.log(originalRequest);

//     if (typeof error.response === "undefined") {
//       alert("a server error happNeD, we will fix it shortly");
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       !localStorage.getItem("social_refresh_token")
//     ) {
//       window.location.href = "/signin/";
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized" &&
//       localStorage.getItem("social_refresh_token") !== undefined
//     ) {
//       const refreshToken = localStorage.getItem("social_refresh_token");

//       return axios
//         .post("http://127.0.0.1:8000/api-auth/token", {
//           client_id: "Your client id ",
//           client_secret: "Your client secret",
//           grant_type: "refresh_token",
//           refresh_token: refreshToken,
//         })
//         .then((response) => {
//           localStorage.setItem("social_access_token", response.data.access_token);
//           localStorage.setItem("social_refresh_token", response.data.refresh_token);
//           window.location.reload();
//           axiosInstance.defaults.headers["Authorization"] =
//             "Bearer " + response.data.access_token;
//         })
//         .catch((err) => console.log(err));
//     }
//   }
// );
