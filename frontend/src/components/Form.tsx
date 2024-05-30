import { useForm } from "react-hook-form";

type FormData = {
  file: FileList;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    formData.append("file", data);
    try {
      const res = await fetch("//localhost:3000/api/files", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Error Uploading the file: ${res.statusText}`);
      }
    } catch (error) {}
    reset();
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("file")} type="file" accept=".csv" name="file" />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Uploading" : "Upload"}
      </button>
      {errors.file && <p>Some errors</p>}
    </form>
  );
};

export default Form;
