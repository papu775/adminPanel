import React, { useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { addCategory } from "../api/category";

toast.configure();

const AddCategory = () => {
  const history = useHistory();
  const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const ADD_CATEGORY = async () => {
    try {
      const form = document.getElementById("save-category");
      const formData = new FormData(form);
      console.log(formData);
      const res = await addCategory(formData);
      if(res.ok){
        reset();
        toast.success(res.data.msg);
        history.push('/manage-category');
      }else{
        toast.error(res.data.msg)
      }
      // addCategory
      // const res = await addCategory(data);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* {startCheck && <CheckLogin isLoggedIn={isLoggedIn} />} */}
      <div className="bg-white px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
          <CardHeader contentPosition="none" className="bg-blue">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">Add New Category</h2>
            </div>
          </CardHeader>
          <CardBody>
            <form
              className="w-full"
              id="save-category"
              onSubmit={handleSubmit(ADD_CATEGORY)}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="categoryTitle"
                  >
                    Category Title
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="categoryTitle"
                    type="text"
                    placeholder="Enter Category Title"
                    {...register("categoryTitle", {
                      required: "Category Title Is Required! ",
                    })}
                    onKeyUp={() => {
                      trigger("categoryTitle");
                    }}
                  />
                  {errors.categoryTitle && (
                    <p className="text-red-600">
                      {errors.categoryTitle.message}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="categoryBottomText"
                  >
                    Bottom Text
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="categoryBottomText"
                    type="text"
                    placeholder="Enter Category Bottom Text"
                    {...register("categoryBottomText", {
                      required: "category Bottom Text Is Required! ",
                    })}
                    onKeyUp={() => {
                      trigger("categoryBottomText");
                    }}
                  />
                  {errors.categoryBottomText && (
                    <p className="text-red-600">
                      {errors.categoryBottomText.message}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="categoryBottomText"
                  >
                    Image
                  </label>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      {file && <img src={file} className="mb-3 w-10 h-10" alt='...' />}
                      <svg
                        aria-hidden="true"
                        className="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          // stroke-linecap="round"
                          // stroke-linejoin="round"
                          // stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      {...register("image", {
                        required: "Image Is Required! ",
                      })}
                      onKeyUp={() => {
                        trigger("image");
                      }}
                      onChange={handleChange}
                    />
                  </label>
                  {errors.image && (
                    <p className="text-red-600">{errors.image.message}</p>
                  )}
                </div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-blue hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AddCategory;
