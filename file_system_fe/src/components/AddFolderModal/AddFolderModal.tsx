import { useForm } from "react-hook-form";
import InputModal from "../InputModal/InputModal";
import styles from "./AddFolderModal.module.scss";
import { useAddFolder } from "../../hooks/useAddFolder";

interface Props {
  visibility: boolean;
  close: () => void;
  parentFolderId: number | null;
}

interface IFormInput {
  name: string;
}

const AddFolderModal = ({ visibility, close, parentFolderId }: Props) => {
  const { mutate: addFolder } = useAddFolder();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    addFolder({ name: data.name, parentFolderId: parentFolderId });
    close();
  };

  return (
    <InputModal visibility={visibility} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Folder Name</label>
        <input {...register("name", { required: true, maxLength: 100 })} />
        {errors.name && <p>This field is required!</p>}
      </form>

      <button onClick={handleSubmit(onSubmit)} className={styles.submit}>
        Add Folder
      </button>
    </InputModal>
  );
};

export default AddFolderModal;
