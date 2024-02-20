import file from "../../icons/file.png";
import trash from "../../icons/trash.svg";
import edit from "../../icons/edit.svg";
import styles from "./File.module.scss";
import { File as FileInterface } from "../../interfaces/File";
import ContentModal from "../ContentModal/ContentModal";
import { useState } from "react";
import { useDeleteFile } from "../../hooks/useDelteFile";
import UpdateFileModal from "../UpdateFileModal/UpdateFileModal";
import { useFormatDateTime } from "../../hooks/useForrmatDateTime";

const File = ({
  id,
  name,
  content,
  createdAt,
  updatedAt,
  byteSize,
}: FileInterface) => {
  const [contentWindow, setContentWindow] = useState<boolean>(false);
  const [updateFileModal, setUpdateFileModal] = useState<boolean>(false);
  const { mutate: deleteFile } = useDeleteFile();

  return (
    <>
      <div className={styles.obj}>
        <div className={styles.buttons}>
          <button onClick={() => deleteFile(id)}>
            <img src={trash} alt="" />
          </button>
          <button onClick={() => setUpdateFileModal(true)}>
            <img src={edit} alt="" />
          </button>
        </div>

        <img
          onClick={() => setContentWindow(true)}
          className={styles.icon}
          src={file}
          alt=""
        />
        <h4 onClick={() => setContentWindow(true)}>{name}</h4>

        <div className={styles.metadata}>
          <span>created at: {useFormatDateTime(createdAt)}</span>
          <span>edited at: {useFormatDateTime(updatedAt)}</span>
          <span>size: {byteSize} bytes</span>
        </div>
      </div>

      <ContentModal
        content={content}
        visibility={contentWindow}
        closeWindow={() => setContentWindow(false)}
      />

      <UpdateFileModal
        visibility={updateFileModal}
        close={() => setUpdateFileModal(false)}
        folderId={id}
        defaultNameValue={name}
        defaultContentValue={content}
      />
    </>
  );
};

export default File;
