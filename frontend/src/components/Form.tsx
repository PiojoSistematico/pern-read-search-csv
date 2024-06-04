import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";

type FormData = {
  file: FileList;
};

type UploadResponse = {
  message: string;
  data?: FileList;
};

type formProps = {
  setData: React.Dispatch<React.SetStateAction<any>>;
};

const Form: React.FunctionComponent<formProps> = ({ setData }) => {
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
      const json: UploadResponse = await res.json();
      if (!res.ok) {
        toast({ variant: "destructive", description: json.message });
        throw new Error(`Error Uploading the file: ${res.statusText}`);
      }
      toast({ variant: "default", description: json.message });
      setData(json.data);
    } catch (error) {
      if (error instanceof Error) return error;
    }
    reset();
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("file")} type="file" accept=".csv" name="file" />
        <button disabled={isSubmitting}>
          {isSubmitting ? "Uploading" : "Upload"}
        </button>
        {errors.file && <p>Some errors</p>}
      </form>
      <Toaster />
    </>
  );
};

export default Form;
