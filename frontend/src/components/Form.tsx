import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("file")} type="file" accept=".csv" name="file" />
      <button>Upload</button>
    </form>
  );
};

export default Form;
