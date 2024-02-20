import styles from "../AddFolderModal/AddFolderModal.module.scss";
import { useAddFile } from "../../hooks/useAddFile";
import { useForm } from "react-hook-form";
import InputModal from "../InputModal/InputModal";

interface Props {
  visibility: boolean;
  close: () => void;
  parentFolderId: number | null;
}

interface IFormInput {
  name: string;
  content: string;
}

const AddFileModal = ({ visibility, close, parentFolderId }: Props) => {
  const { mutate: addFile } = useAddFile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    addFile({
      name: data.name,
      content: data.content,
      parentFolderId: parentFolderId,
    });
    close();
  };

  return (
    <InputModal visibility={visibility} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">File Name</label>
        <input {...register("name", { required: true, maxLength: 100 })} />
        {errors.name && <p>This field is required!</p>}

        <label htmlFor="content">File Content</label>
        <input {...register("content", { required: true })} />
        {errors.content && <p>This field is required!</p>}
      </form>

      <button onClick={handleSubmit(onSubmit)} className={styles.submit}>
        Add File
      </button>
    </InputModal>
  );
};

export default AddFileModal;
