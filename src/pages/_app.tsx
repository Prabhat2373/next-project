import { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ToastConfig } from "@/constant/constant";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserContextProvider, useAuth } from "@/context/UserContext";
import { getToken } from "@/utils/getToken";

const App = ({ children }: { children: any }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!window) return;
    const HAS_TOKEN = window.localStorage.getItem("token");
    console.log("token", HAS_TOKEN);
    if (!isLoggedIn && !HAS_TOKEN) {
      console.log("islogg", isLoggedIn);
      router.push("/login");
      toast.error("Please log in to access", ToastConfig);
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextProvider>
        <App>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </App>
      </UserContextProvider>
    </>
  );
}
