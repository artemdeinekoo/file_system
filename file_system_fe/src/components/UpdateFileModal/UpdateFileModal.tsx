import { useForm } from "react-hook-form";
import InputModal from "../InputModal/InputModal";
import styles from "../AddFolderModal/AddFolderModal.module.scss";
import { useUpdateFile } from "../../hooks/useUpdateFile";

interface Props {
  visibility: boolean;
  close: () => void;
  folderId: number;
  defaultNameValue: string;
  defaultContentValue: string;
}

interface IFormInput {
  name?: string;
  content?: string;
}

const AddFolderModal = ({
  visibility,
  close,
  folderId,
  defaultNameValue,
  defaultContentValue,
}: Props) => {
  const { mutate: updateFile } = useUpdateFile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    updateFile({ id: folderId, updateFile: data });
    close();
  };

  return (
    <InputModal visibility={visibility} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">File Name</label>
        <input
          defaultValue={defaultNameValue}
          {...register("name", { required: false, maxLength: 100 })}
        />
        {errors.name && <p>This field is required!</p>}

        <label htmlFor="content">File Content</label>
        <input
          defaultValue={defaultContentValue}
          {...register("content", { required: false })}
        />
        {errors.name && <p>This field is required!</p>}
      </form>

      <button onClick={handleSubmit(onSubmit)} className={styles.submit}>
        Edit File
      </button>
    </InputModal>
  );
};

export default AddFolderModal;
