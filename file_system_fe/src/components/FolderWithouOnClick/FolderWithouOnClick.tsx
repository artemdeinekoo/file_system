import folder from "../../icons/folder.svg";
import trash from "../../icons/trash.svg";
import edit from "../../icons/edit.svg";
import styles from "../Folder/Folder.module.scss";
import { useDeleteFolder } from "../../hooks/useDeleteFolder";
import { useState } from "react";
import UpdateFolderModal from "../UpdateFolderModal/UpdateFolderModal";
import { useFormatDateTime } from "../../hooks/useForrmatDateTime";

interface FolderWithouOnClickInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  byteSize: number;
  isFolder: boolean;
}

const FolderWithouOnClick = ({
  id,
  name,
  createdAt,
  updatedAt,
  byteSize,
}: FolderWithouOnClickInterface) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { mutate: deleteFolder } = useDeleteFolder();

  return (
    <>
      <div className={styles.obj}>
        <div className={styles.buttons}>
          <button onClick={() => deleteFolder(id)}>
            <img src={trash} alt="" />
          </button>
          <button onClick={() => setEditing(true)}>
            <img src={edit} alt="" />
          </button>
        </div>

        <img className={styles.icon} src={folder} alt="" />
        <h4>{name}</h4>

        <div className={styles.metadata}>
          <span>created at: {useFormatDateTime(createdAt)}</span>
          <span>edited at: {useFormatDateTime(updatedAt)}</span>
          <span>size: {byteSize} bytes</span>
        </div>
      </div>

      <UpdateFolderModal
        visibility={editing}
        close={() => setEditing(false)}
        folderId={id}
        defaultValue={name}
      />
    </>
  );
};

export default FolderWithouOnClick;
