import styles from "./InputModal.module.scss";

interface InputModalProps {
  children: React.ReactNode;
  visibility: boolean;
  close: () => void;
}

const InputModal = ({ children, visibility, close }: InputModalProps) => {
  return (
    <div
      style={{ display: visibility ? "flex" : "none" }}
      className={styles.modal}
    >
      <button onClick={close} className={styles.close}>
        X
      </button>
      {children}
    </div>
  );
};

export default InputModal;
