import IconBtn from "./IconBtn";
import "./ConfirmationModal.css"; // Import custom CSS

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-title">{modalData?.text1}</p>
        <p className="modal-text">{modalData?.text2}</p>
        <div className="modal-actions">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cancel-button"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
