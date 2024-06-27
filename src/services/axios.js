import axios from "axios";
// import { toast } from "react-toastify";
// import { store } from "../redux/store";
// import { useNavigate } from "react-router-dom";

//Create an instance of axios
const instance = axios.create({
  baseURL: "http://188.166.185.29/api/v1", // Kết nối be server
  // baseURL: "http://localhost:3107/api/v1",   // Kết nối be local
});

instance.defaults.withCredentials = true;

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response.data);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    console.log("🚀 ~ status:", status)
    // switch (status) {
    //   case 401: {
    //     toast.error("Không xác thực người dùng. Vui lòng đăng nhập...");
    //     return Promise.reject(error);
    //   }

    //   case 403: {
    //     toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
    //     return Promise.reject(error);
    //   }

    //   case 400: {
    //     toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
    //     return Promise.reject(error);
    //   }

    //   case 404: {
    //     toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
    //     return Promise.reject(error);
    //   }

    //   case 409: {
    //     toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
    //     return Promise.reject(error);
    //   }

    //   case 422: {
    //     toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
    //     return Promise.reject(error);
    //   }
    //   default: {
    //     toast.error("Lỗi ở server");
    //     return Promise.reject(error);
    //   }
    // }
  }
);
// instance.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.user?.token}`

//Add a request interceptor
// instance.interceptors.request.use(
//     (config) => {
//         const bearerToken = `Bearer ${store.getState().auth.user?.token}`;

//         return {
//             ...config,
//             headers: {
//                 ...(bearerToken !== null && { Authorization: `${bearerToken}` }),
//                 ...config.headers,
//             },
//         };
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

//Add a response interceptor
// instance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     console.log(">>> error", error);
//     const status = error.response?.status || 500;

//   }
// );

export default instance;
