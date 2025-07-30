import './styles/ModalContainer.css'

function ModalContainer({ children, onClose, title = null }) {
    return (
        <div className="modal-container">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                &times;
                </button>
                <div className="modal-body">
                    {title && <h2>{title}</h2>}
                    {children}
                </div>
            </div>
        </div>
    );
}
export default ModalContainer;
