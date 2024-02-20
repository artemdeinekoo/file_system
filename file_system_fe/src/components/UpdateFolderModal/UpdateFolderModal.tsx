import { useForm } from "react-hook-form";
import InputModal from "../InputModal/InputModal";
import styles from "../AddFolderModal/AddFolderModal.module.scss";
import { useUpdateFolder } from "../../hooks/useUpdateFolder";

interface Props {
  visibility: boolean;
  close: () => void;
  folderId: number;
  defaultValue: string;
}

interface IFormInput {
  name: string;
}

const AddFolderModal = ({
  visibility,
  close,
  folderId,
  defaultValue,
}: Props) => {
  const { mutate: updateFolder } = useUpdateFolder();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    updateFolder({ name: data.name, id: folderId });
    close();
  };

  return (
    <InputModal visibility={visibility} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Folder Name</label>
        <input
          defaultValue={defaultValue}
          {...register("name", { required: true, maxLength: 100 })}
        />
        {errors.name && <p>This field is required!</p>}
      </form>

      <button onClick={handleSubmit(onSubmit)} className={styles.submit}>
        Edit Folder
      </button>
    </InputModal>
  );
};

export default AddFolderModal;
