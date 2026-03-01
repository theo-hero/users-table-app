import { useEffect, useState } from "react";
import { fetchUsersData } from "../../service/api";
import ArrowsIcon from "../assets/sorting.svg?react"
import UserModal from "./UserModal";
import "../styles/table.css";
import Pagination from "./Pagination";

const COLUMNS = [
  {
    label: 'Фамилия',
    field: 'lastName',
    sortable: true,
    className: 'col-lastname',
  },
  {
    label: 'Имя',
    field: 'firstName',
    sortable: true,
    className: 'col-firstname',
  },
  {
    label: 'Возраст',
    field: 'age',
    sortable: true,
    className: 'col-age',
  },
  {
    label: 'Пол',
    field: 'gender',
    sortable: true,
    render: (value) => <div className={value}>{value}</div>,
  },
  {
    label: 'Номер телефона',
    field: 'phone',
    sortable: true,
  },
  {
    label: 'Email',
    field: 'email',
    sortable: false,
    className: 'col-email',
  },
  {
    label: 'Страна',
    field: 'country',
    sortable: false,
  },
  {
    label: 'Город',
    field: 'city',
    sortable: false,
  },
];

export default function () {

    const [users, setUsers] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchUsersData(page - 1, sortField?.field, sortField?.order).then(data => {
            console.log("data: ", data);
            setUsers(data.users);
            setTotal(Math.ceil(data.total / 30));
        });
    }, [page]);

    const changeSorting = (fieldName) => {
        if (sortField === null || sortField.field !== fieldName) {
            setSortField({ field: fieldName, order: "desc" });
            fetchUsersData(page - 1, fieldName, "desc").then(data => {
                setUsers(data.users);
            });
        } else if (sortField.order === "desc") {
            setSortField(prev => ({ ...prev, order: "asc" }));
            fetchUsersData(page - 1, fieldName, "asc").then(data => {
                setUsers(data.users);
            });
        } else {
            setSortField(null);
            fetchUsersData(page - 1).then(data => {
                setUsers(data.users);
            });
        }
    }

    return (
        <>
            <table className='users-table'>
                <thead>
                    <tr>
                        {COLUMNS.map((col, key) => (
                            <th key={key}>
                                <span>{col.label}</span>
                                {col.sortable &&
                                    <ArrowsIcon
                                        onClick={() => changeSorting(col.field)}
                                        className={`sort-icon ${sortField?.field === col.field && sortField.order}`}
                                        width={24} height={24} />}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user.id} onClick={() => setSelectedUserId(user.id)}>
                            {COLUMNS.map((col, key) => (
                                <td key={key} className={col.className}>
                                    {col.render
                                        ? col.render(user[col.field], user)
                                        : user[col.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={page} totalPages={total} onChange={setPage} />
            <UserModal userId={selectedUserId} close={() => setSelectedUserId(null)} />
        </>
    )
}