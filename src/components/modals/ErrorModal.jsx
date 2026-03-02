import { useError } from "../../context/ErrorContext";

// in the future may create a separate Modal component which will provide the basic html/css structure and accept content as props
export default function ErrorModal() {

    const { error, setError } = useError();

    const close = () => setError(null);

    return (
        <>
            {error && <div id="user-modal" className={`modal ${error ? "shown" : ""}`} onClick={close}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="close-container" onClick={close}>
                        <span className="close">&times;</span>
                    </div>

                    <h1>Oops! Some error occurred:</h1>
                    <p>{error.message}</p>
                </div>
            </div>}
        </>
    )
}