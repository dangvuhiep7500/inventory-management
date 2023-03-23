"use client"

import React, { useContext, useEffect, useMemo, useState } from "react";
import { MyDropzone } from "../file-upload/FileUpload";
import { ReactQuillEditor } from "../react-quill/ReactQuill";
import { GoPencil, GoTrashcan } from "react-icons/go";
import CurrencyInput from "react-currency-input-field";
import { NumericFormat } from "react-number-format";
import TagifyInput from "../tagify/Tagify";
import { useThemeStore } from "@/store/colorTheme/colorTheme";
// import { useAppDispatch, useAppSelector } from "../../hooks";
// import {  setNum1, setNum2 } from "../../store/product/product.slice";
interface AvatarFile extends File {
  preview: string;
}
export default function PageProduct() {
  // const dispatch = useAppDispatch();
  const { colorTheme } = useThemeStore();
  const [avatar, setAvatar] = useState<AvatarFile | null>(null);
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const avatarFile: AvatarFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setAvatar(avatarFile);
    }
  };
  const handleRemoveAvatar = () => {
    setAvatar(null);
  };
  const [checked, setChecked] = useState(false);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
  };
  // const { num1, num2, profit, profitMargin } = useAppSelector(
  //   (state) => state.product
  // );
  // const memoizedProductValues = useMemo(
  //   () => ({ num1, num2, profit, profitMargin }),
  //   [num1, num2, profit, profitMargin]
  // );
  // console.log(memoizedProductValues);
  
  // const handleNum1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = Number(e.target.value);
  //   dispatch(setNum1(newValue));
  // };

  // const handleNum2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = Number(e.target.value);
  //   dispatch(setNum2(newValue));
  // };
 console.log(colorTheme);
 
  return (
    <div className="mx-auto max-w-screen-xl max-w-s p-4 lg:p-1">
      <h2 className="flex text-xl font-bold text-gray-900 dark:text-white">
        Add Product
      </h2>
      <nav className="flex mb-3" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-600 dark:hover:text-sky-500"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-600 dark:hover:text-sky-500"
              >
                Projects
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-600">
                Flowbite
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <div className="md:col-span-1">
            <div className="sm:px-0 mb-10">
              <div className="px-8 py-10 w-full max-w-sm bg-white rounded-lg shadow dark:bg-[#1E1E2D]">
                <div className="flex justify-start">
                  <h2 className="flex text-lg font-bold text-gray-900 dark:text-white">
                    Ảnh Nền
                  </h2>
                </div>
                <div className="flex flex-col items-center my-6">
                  <div className="relative">
                    {avatar ? (
                      <>
                        <img
                          className="block rounded-lg  p-2.5 h-48 w-48 object-cover"
                          src={avatar.preview}
                        />
                        <button
                          onClick={handleRemoveAvatar}
                          className="absolute bottom-0 right-0 p-1.5 bg-gray-800 text-white rounded-full"
                        >
                          <GoTrashcan className="text-sm" />
                        </button>
                      </>
                    ) : (
                      <img
                        className="block rounded-lg p-1 h-48 w-48 shadow-2xl object-cover "
                        src={`${colorTheme === "dark" ? "/blank-image-dark.svg" : "/blank-image.svg" }`} 
                      />
                    )}
                    <label
                      htmlFor="avatar-upload"
                      className="absolute top-[-0.2rem] right-[-0.2rem] p-1.5 bg-gray-800 text-white rounded-full cursor-pointer"
                    >
                      <GoPencil className="text-sm" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      onChange={handlePreviewAvatar}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:px-0">
              <div className="px-8 py-10 w-full max-w-sm bg-white dark:bg-[#1E1E2D] rounded-lg shadow">
                <div className="flex justify-start">
                  <h2 className="flex text-lg font-bold text-gray-900 dark:text-white">
                    Thông tin chi tiết sản phẩm
                  </h2>
                </div>
                <div className="flex flex-col justify-start my-6">
                  <h2 className="flex text-base font-medium text-gray-900 mb-1 dark:text-white">
                    Thể loại
                  </h2>
                  <select
                    id="countries"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                  >
                    <option >Chọn loại sản phẩm</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                  <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Thêm sản phẩm vào một danh mục.
                  </span>
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="rounded-md font-medium duration-200 bg-sky-50 dark:bg-[#212E48] py-2 px-5 text-sm text-sky-500 shadow-sm hover:bg-sky-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <span className="mr-2">+</span>
                    Tạo mới thể loại
                  </button>
                </div>
                <div className="flex flex-col justify-start">
                  <h2 className="flex text-base font-medium pb-1 text-gray-900 dark:text-white ">
                    Thẻ tags
                  </h2>
                  <div>
                    <TagifyInput
                      whitelist={[
                        "new",
                        "trending",
                        "sale",
                        "discounted",
                        "selling fast",
                        "last 10",
                      ]}
                    />
                  </div>
                  <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Thêm sản phẩm vào thẻ tags.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 px-4 py-5 sm:p-6 bg-white dark:bg-[#1E1E2D]">
                  <div className="">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="name-product"
                        className="block text-base font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Tên sản phẩm <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name-product"
                          id="name-product"
                          className="block w-full border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                          placeholder="Tên sản phẩm"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-base font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Mô tả sản phẩm
                    </label>
                    <ReactQuillEditor />
                    <p className="mt-2 text-sm text-gray-500">
                      Đặt mô tả cho sản phẩm
                    </p>
                  </div>
                </div>
              </div>

              <div className="shadow sm:overflow-hidden sm:rounded-md mt-10">
                <div className="space-y-6 px-4 py-5 sm:p-6 bg-white dark:bg-[#1E1E2D]">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block  text-base font-bold leading-6 text-gray-900 dark:text-white"
                    >
                      Hình ảnh sản phẩm
                    </label>
                    <div className="hidden sm:block" aria-hidden="true">
                      <div className="py-5">
                        <div className="border-t border-gray-300 dark:border-gray-700" />
                      </div>
                    </div>
                    <MyDropzone />
                  </div>
                </div>
              </div>

              <div className="shadow sm:overflow-hidden sm:rounded-md mt-10">
                <div className="space-y-6 px-4 py-5 sm:p-6 bg-white dark:bg-[#1E1E2D]">
                  <div className="col-span-3 sm:col-span-2">
                    <label className="block  text-base font-bold leading-6 text-gray-900 dark:text-white">
                      Giá sản phẩm
                    </label>
                    <div className="hidden sm:block" aria-hidden="true">
                      <div className="py-3">
                        <div className="border-t border-gray-300 dark:border-gray-700" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="price-product"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Giá bán
                        </label>
                        <NumericFormat
                          id="input-example"
                          name="input-1"
                          allowNegative={false}
                          className="block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                          customInput={CurrencyInput}
                          intlConfig={{ locale: "vi-VN", currency: "VND" }}
                          // value={0}
                          // defaultValue={0}
                          // onChange={handleNum1Change}
                          groupSeparator={","}
                          disableAbbreviations
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Giá so sánh
                        </label>
                        <NumericFormat
                          id="input-example"
                          name="input-1"
                          allowNegative={false}
                          className="block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                          customInput={CurrencyInput}
                          intlConfig={{ locale: "vi-VN", currency: "VND" }}
                          value={0}
                          groupSeparator={","}
                          disableAbbreviations
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow sm:overflow-hidden sm:rounded-md mt-10">
                <div className="space-y-6 px-4 py-5 sm:p-6 bg-white dark:bg-[#1E1E2D]">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block  text-base font-bold leading-6 text-gray-900 dark:text-white"
                    >
                      Quản lý tồn kho
                    </label>
                    <div className="hidden sm:block" aria-hidden="true">
                      <div className="py-3">
                        <div className="border-t border-gray-300 dark:border-gray-700" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Giá vốn
                        </label>
                        <NumericFormat
                          id="input-example"
                          name="input-1"
                          allowNegative={false}
                          className="block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                          customInput={CurrencyInput}
                          intlConfig={{ locale: "vi-VN", currency: "VND" }}
                          // value={0}
                          // defaultValue={0}
                          // onChange={handleNum2Change}
                          groupSeparator={","}
                          disableAbbreviations
                        />
                      </div>
                      <div className="flex flex-1 gap-6">
                        <div>
                          <label
                            htmlFor=""
                            className="block text-sm font-normal leading-6 text-gray-900 dark:text-white"
                          >
                            Biên lợi nhuận:
                          </label>
                          <NumericFormat
                            id="input-example"
                            name="input-1"
                            displayType="text"
                            disabled
                            className="block border-none w-36 p-0 py-2 dark:text-white dark:bg-[#1E1E2D]"
                            // value={profitMargin}
                            decimalScale={3}
                            suffix={"%"}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-normal leading-6 text-gray-900 dark:text-white"
                          >
                            Lợi nhuận:
                          </label>
                          <NumericFormat
                            id="input-example"
                            name="input-1"
                            disabled
                            className="block border-none w-36 p-0 py-2 dark:text-white dark:bg-[#1E1E2D]"
                            customInput={CurrencyInput}
                            intlConfig={{ locale: "vi-VN", currency: "VND" }}
                            groupSeparator={","}
                            // value={profit}
                            disableAbbreviations
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-3">
                      <div>
                        <label
                          htmlFor="price-product"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          SKU
                        </label>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="block w-full border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Barcode
                        </label>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="block w-full border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow sm:overflow-hidden sm:rounded-md mt-10">
                <div className="space-y-6 px-4 py-5 sm:p-6 bg-white dark:bg-[#1E1E2D]">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block text-base font-bold leading-6 text-gray-900 dark:text-white"
                    >
                      Biến thể
                    </label>
                    <div className="hidden sm:block" aria-hidden="true">
                      <div className="py-3">
                        <div className="border-t border-gray-300 dark:border-gray-700" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        onChange={handleCheck}
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Sản phẩm này có nhiều biến thể. Ví dụ như khác nhau về
                        kích thước, màu sắc
                      </label>
                    </div>
                    {!checked && (
                      <>
                        <div className="hidden sm:block" aria-hidden="true">
                          <div className="py-3">
                            <div className="border-t border-gray-300 dark:border-gray-700" />
                          </div>
                        </div>
                        <div className="px-3">
                          <label
                            htmlFor="company-website"
                            className="block mb-2 text-sm font-bold leading-6 text-gray-900 dark:text-white"
                          >
                            Thuộc tính 1
                          </label>
                          <div className="grid gap-6 mb-2 md:grid-cols-3">
                            <div className="">
                              <select
                                id="countries"
                                className=" block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:text-white dark:bg-[#1E1E2D]"
                              >
                                <option >Chọn thuộc tính</option>
                                <option value="US">Kích cỡ</option>
                                <option value="CA">Loại</option>
                                <option value="FR">Màu</option>
                                <option value="FR">Tùy chọn</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <div className="flex justify-between gap-6">
                                <TagifyInput
                                  whitelist={["chiếc", "đơn", "xl", "red"]}
                                />
                                <button className="text-center p-3 bg-red-500 text-white rounded-full">
                                  <GoTrashcan className="text-sm" />
                                </button>
                              </div>
                              <label
                                htmlFor="company-website"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                              >
                                Thêm nhãn đã có
                              </label>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="rounded-md font-medium duration-200 bg-sky-50 dark:bg-[#212E48] py-2 px-5 text-sm text-sky-500 shadow-sm hover:bg-sky-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          >
                            <span className="mr-2">+</span>
                            Thêm thuộc tính khác
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-4 py-6 text-right sm:px-6">
                <button
                  type="submit"
                  className="mr-2 inline-flex justify-center rounded-md font-bold bg-gray-200 py-2 px-5 text-sm text-gray-500 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md font-bold bg-sky-500 py-2 px-5 text-sm text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};