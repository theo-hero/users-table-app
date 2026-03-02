import { useEffect, useState } from "react"
import { fetchSingleUser } from "../../../service/api";
import "../../styles/modal.css";
import { useError } from "../../context/ErrorContext";

//'lastName,firstName,age,gender,phone,email,address,height,weight,image'

export default function UserModal({ userId, close }) {

    const [user, setUser] = useState(null);

    const { setError } = useError();

    useEffect(() => {
        if (!userId) return;

        fetchSingleUser(userId)
        .then(data => {
            console.log(data);
            setUser(data);
        })
        .catch((e) => setError(e));
    }, [userId, setError]);

    return (
        <div id="user-modal" className={`modal ${userId ? "shown" : ""}`} onClick={close}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="close-container" onClick={close}>
                    <span className="close">&times;</span>
                </div>
                
                {!user && <div className="loader"></div>}
                {user && (
                    <>
                        <div className="modal-header">
                            <div className="avatar-wrapper">
                                <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                            </div>

                            <div>
                                <h2>{user.firstName} {user.lastName}</h2>
                                <span className={`gender-badge ${user.gender}`}>
                                    {user.gender}
                                </span>
                            </div>
                        </div>

                        <dl className="user-data">
                            <div><dt>Возраст</dt><dd>{user.age}</dd></div>
                            <div><dt>Рост</dt><dd>{user.height}</dd></div>
                            <div><dt>Вес</dt><dd>{user.weight}</dd></div>
                            <div><dt>Номер телефона</dt><dd>{user.phone}</dd></div>
                            <div>
                                <dt>Email</dt>
                                <dd>
                                    <a href={`mailto:${user.email}`} className="email-link">
                                        {user.email}
                                    </a>
                                </dd>
                            </div>
                            <div className="full">
                                <dt>Адрес</dt>
                                <dd>
                                    {user.address.address}, {user.address.city}, {user.address.state}
                                </dd>
                            </div>
                        </dl>
                    </>
                )}
            </div>
        </div>
    )
}