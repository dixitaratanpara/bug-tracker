
function DeleteModal({ showModal, setShowModal, handleDelete }) 
{

    if (!showModal) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Delete Bug</h2>
                <p>
                    Are you sure you want to delete this bug?
                </p>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="delete-btn-modal"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )


}

export default DeleteModal;