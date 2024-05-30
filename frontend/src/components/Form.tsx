import { useForm } from "react-hook-form";

type FormData = {
  file: FileList;
};

type UploadResponse = {
  message: string;
  data: FileList;
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
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }
    try {
      const res = await fetch("http://localhost:3000/api/files", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Error Uploading the file: ${res.statusText}`);
      }

      console.log(res);
      const json: UploadResponse = await res.json();
      console.log(json.data);
      return json.data;
    } catch (error) {
      if (error instanceof Error) return error;
    }
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
