import folder from "../../icons/folder.svg";
import trash from "../../icons/trash.svg";
import edit from "../../icons/edit.svg";
import styles from "./Folder.module.scss";
import { Folder as FolderInterface } from "../../interfaces/Folder";
import { useDeleteFolder } from "../../hooks/useDeleteFolder";
import { useState } from "react";
import UpdateFolderModal from "../UpdateFolderModal/UpdateFolderModal";
import { useFormatDateTime } from "../../hooks/useForrmatDateTime";

const Folder = ({
  id,
  name,
  createdAt,
  updatedAt,
  byteSize,
  setFolderId,
}: FolderInterface) => {
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

        <img
          onClick={() => setFolderId(id)}
          className={styles.icon}
          src={folder}
          alt=""
        />
        <h4 onClick={() => setFolderId(id)}>{name}</h4>

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

export default Folder;
