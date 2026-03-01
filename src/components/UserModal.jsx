import { useEffect, useState } from "react"
import { fetchSingleUser } from "../../service/api";
import "../styles/modal.css";

//'lastName,firstName,age,gender,phone,email,address,height,weight,image'

export default function ({ userId, close }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!userId) return;

        fetchSingleUser(userId).then(data => {
            console.log(data);
            setUser(data);
        });
    }, [userId]);

    return (
        <div id="user-modal" className={`modal ${userId ? "shown" : ""}`} onClick={close}>
            <div className="modal-content">
                <div className="close-container" onClick={close}>
                    <span className="close">&times;</span>
                </div>
                {user &&
                    <>
                        <img src={user.avatar} />
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>Gender: {user.gender}</p>
                        <p>Age: {user.age}</p>
                        <p>Height: {user.height}</p>
                        <p>Weight: {user.weight}</p>
                    </>}
            </div>
        </div>
    )
}