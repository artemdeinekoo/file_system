import styles from "./ContentModal.module.scss";

interface Props {
  content: string;
  visibility: boolean;
  closeWindow: () => void;
}

const ContentModal = ({ content, closeWindow, visibility }: Props) => {
  return (
    <div
      style={{ display: visibility ? "block" : "none" }}
      className={styles.modal}
    >
      <button onClick={closeWindow}>X</button>
      <p>{content}</p>
    </div>
  );
};

export default ContentModal;
