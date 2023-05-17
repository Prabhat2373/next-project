import InputField from "@/component/inputs/InputField";
import { ToastConfig } from "@/constant/constant";
import { useAuth } from "@/context/UserContext";
import { useSubmitForm } from "@/hooks/useSubmitForm";
import { loginValidatationSchema } from "@/validation/Validator";
import { FormikProps, FormikValues, useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Login() {
  const { signin } = useAuth();
  const { loading, submit } = useSubmitForm();
  const router = useRouter();
  const handleLogin = async (
    data: { email: string; password: string },
    action: any
  ) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await submit("POST", "login", formData, {
      "Content-Type": "multipart/formdata",
    });
    console.log("res", response);
    if (response.isSuccess) {
      toast.success("Logged in successfully!", ToastConfig);
      signin(response.data.user, response.data.token);
      action.resetForm({
        values: initialValues,
      });
      router.push("/");
    } else {
      toast.error(response?.data?.message, ToastConfig);
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (data, action) => handleLogin(data, action),
    validationSchema: loginValidatationSchema,
  });

  console.log("err", formik.errors);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            width={100}
            height={100}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <InputField
                type="email"
                error={formik.errors.email}
                label="Email"
                name="email"
                onBlur={() => console.log("blut")}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <InputField
                  name="password"
                  label="password"
                  value={formik.values.password}
                  type="password"
                  error={formik.errors.password}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading.." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
