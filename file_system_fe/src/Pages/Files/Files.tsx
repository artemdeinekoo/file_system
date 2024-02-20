import styles from "./Files.module.scss";
import search from "../../icons/search.svg";
import { useGetFilesStructure } from "../../hooks/useGetFilesStructure";
import Folder from "../../components/Folder/Folder";
import File from "../../components/File/File";

import { File as FileInterface } from "../../interfaces/File";
import { useState, useEffect } from "react";
import AddFolderModal from "../../components/AddFolderModal/AddFolderModal";
import AddFileModal from "../../components/AddFileModal/AddFileModal";
import { Link } from "react-router-dom";
import Sort from "../../components/Sort/Sort";

const Files = () => {
  const [folderId, setFolderId] = useState<number | null>(null);
  const { data, isFetching, isError, refetch } = useGetFilesStructure(folderId);
  const [addFolder, setAddFolder] = useState<boolean>(false);
  const [addFile, setAddFile] = useState<boolean>(false);
  const [sorting, setSorting] = useState<string>("");

  useEffect(() => {
    refetch();
  }, [folderId]);

  const handleSetFolderId = (id: number) => {
    setFolderId(id);
  };

  return (
    <div className={styles.files}>
      <div className={styles.top}>
        <h2>{data?.name}</h2>
        <div className={styles.buttons}>
          <button onClick={() => setAddFile(true)}>New File</button>
          <button onClick={() => setAddFolder(true)}>New Folder</button>
          <button onClick={() => setSorting("name")}>Sort by name</button>
          <button onClick={() => setSorting("")}>Sort by size</button>
          <Link to={"/search"}>
            <img src={search} alt="" />
          </Link>
        </div>
      </div>

      <span className={styles.divider}></span>

      {folderId && (
        <button
          onClick={() => {
            setFolderId(data?.parentFolderId);
            refetch();
          }}
          className={styles.back}
        >
          Back
        </button>
      )}

      <div className={styles.main}>
        {isFetching ? (
          <h2>Loading...</h2>
        ) : isError ? (
          <h2>An error occured</h2>
        ) : data.items.length === 0 ? (
          <p>The currrent folder is empty</p>
        ) : (
          <Sort by={sorting}>
            {data.items.map((obj: FileInterface) =>
              obj.isFolder ? (
                <Folder
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  parentFolderId={obj.parentFolderId}
                  isFolder={obj.isFolder}
                  createdAt={obj.createdAt}
                  updatedAt={obj.updatedAt}
                  byteSize={obj.byteSize}
                  setFolderId={handleSetFolderId}
                />
              ) : (
                <File
                  key={obj.id}
                  id={obj.id}
                  content={obj.content}
                  name={obj.name}
                  parentFolderId={obj.parentFolderId}
                  isFolder={obj.isFolder}
                  createdAt={obj.createdAt}
                  updatedAt={obj.updatedAt}
                  byteSize={obj.byteSize}
                />
              )
            )}
          </Sort>
        )}
      </div>

      <AddFolderModal
        visibility={addFolder}
        close={() => {
          setAddFolder(false);
        }}
        parentFolderId={folderId}
      />

      <AddFileModal
        visibility={addFile}
        close={() => {
          setAddFile(false);
        }}
        parentFolderId={folderId}
      />
    </div>
  );
};

export default Files;
