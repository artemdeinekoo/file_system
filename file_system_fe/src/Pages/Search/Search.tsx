import { Link } from "react-router-dom";
import styles from "./Search.module.scss";
import { useSearchForObjects } from "../../hooks/useSearchForObjects";
import { useEffect, useState } from "react";
import { File as FileInterface } from "../../interfaces/File";
import File from "../../components/File/File";
import FolderWithouOnClick from "../../components/FolderWithouOnClick/FolderWithouOnClick";

const Search = () => {
  const [query, setQuery] = useState<string | null>("");
  const { data, isFetching, isError, refetch } = useSearchForObjects(query);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <div className={styles.files}>
      <div className={styles.top}>
        <Link className={styles.back} to={"/"}>
          Back
        </Link>
        <input onChange={(e) => setQuery(e.target.value)} type="text" />
        <span></span>
      </div>

      <span className={styles.divider}></span>

      <div className={styles.main}>
        {isFetching ? (
          <h2>Loading...</h2>
        ) : isError ? (
          <h2>An error occured</h2>
        ) : data.length === 0 && query ? (
          <p>There is no files or folders matching this query</p>
        ) : (
          <>
            {data.map((obj: FileInterface) =>
              obj.isFolder ? (
                <FolderWithouOnClick
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  isFolder={obj.isFolder}
                  createdAt={obj.createdAt}
                  updatedAt={obj.updatedAt}
                  byteSize={obj.byteSize}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
