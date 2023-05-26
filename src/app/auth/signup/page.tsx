"use client";

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useAuthStore } from "@/store/auth/auth";
import { Checkbox, Typography } from "@material-tailwind/react";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmpassword: "",
  acceptTerms: false,
};

const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Nhập họ"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Nhập một địa chỉ Email"),
  username: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Nhập tên đăng người dùng"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Nhập tên"),
  password: Yup.string()
    .min(6, "Minimum 6 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Nhập mật khẩu"),
  confirmpassword: Yup.string()
    .required("Nhập xác nhận mật khẩu")
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Mật khẩu và xác nhận mật khẩu không khớp"
      ),
    }),
  acceptTerms: Yup.bool().required("Bạn phải chấp nhận các điều khoản và điều kiện"),
});
function Page() {
  const { isLoading, error, successRegister, register } = useAuthStore((state) => (state));
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        register(values)
      } catch (error) {
        setStatus(error);
      }
      setSubmitting(false);
      setStatus(" ");
    },
  });
  return (
    <>
      {/* <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p> */}
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="flex flex-col gap-4 w-[25rem]"
      >
        <Typography variant="h3" className="text-center mb-5">
          Đăng ký tài khoản
        </Typography>

        {error && (
          <div
            className="flex p-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
        <div className="grid gap-2 md:grid-cols-2">
          <div className="block">
            <input
              placeholder="Họ"
              {...formik.getFieldProps("firstName")}
              className="placeholder:text-gray-500 border border-gray-200 bg-gray-50 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              autoComplete="off"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.firstName}
              </p>
            )}
          </div>
          <div className="block">
            <input
              placeholder="Tên"
              {...formik.getFieldProps("lastName")}
              className="placeholder:text-gray-500 border border-gray-200 bg-gray-50  text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              autoComplete="off"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="block">
          <input
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className="placeholder:text-gray-500 border border-gray-200 bg-gray-50  text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            autoComplete="off"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="flex flex-col">
              <p className="text-sm text-red-600">{formik.errors.email}</p>
            </div>
          )}
        </div>
        <div className="block">
          <input
            placeholder="Tên đăng nhập"
            {...formik.getFieldProps("username")}
            className="placeholder:text-gray-500 border border-gray-200 bg-gray-50  text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            autoComplete="off"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div className="block">
          <input
            type="password"
            placeholder="Mật khẩu"
            {...formik.getFieldProps("password")}
            className="placeholder:text-gray-500 border border-gray-200 bg-gray-50  text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            autoComplete="off"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="block">
          <input
            type="password"
            placeholder="Xác nhận lại mật khẩu"
            {...formik.getFieldProps("confirmpassword")}
            className="placeholder:text-gray-500 border border-gray-200 bg-gray-50 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            autoComplete="off"
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.confirmpassword}
            </p>
          )}
        </div>
        <Checkbox
        className="w-4 h-4 rounded-sm"
        required
            label={
              <Typography color="blue-gray" className="font-semibold flex text-sm">
                Tôi đồng ý với các
                <Typography
                  as="a"
                  href="#"
                  color="blue"
                  className="font-semibold hover:text-blue-700 transition-colors text-sm"
                >
                  &nbsp;điều khoản và điều kiện
                </Typography>
                .
              </Typography>
            }
          />
        {/* <div className="flex items-start mb-4">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Tôi đồng ý với các{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              điều khoản và điều kiện
            </a>
            .
          </label>
        </div> */}
        <button
          className="font-bold bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 hover:scale-105 duration-300"
          type="submit"
        >
          {!isLoading && <span>Đăng kí</span>}
          {isLoading && (
            <span>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Đang tải...
            </span>
          )}
        </button>
      </form>

      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">Hoặc</p>
        <hr className="border-gray-400" />
      </div>

      <button className="font-bold bg-gray-200 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-gray-600">
        <svg
          className="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="25px"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        Đăng kí với Google
      </button>
      <div className="ml-2 text-base font-medium text-gray-500 text-center mt-4">
        Bạn đã có sẵn một tài khoản?{" "}
        <Link
          href={"/auth/signin"}
          className=" text-blue-500 transition-colors hover:text-blue-700"
        >
          Đăng nhập
        </Link>
        .
      </div>
    </>
  );
}
export default Page;