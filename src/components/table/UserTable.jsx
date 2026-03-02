import { useState, useRef } from "react";
import UserModal from "../modals/UserModal";
import "../../styles/table.css";
import "../../styles/loader.css";
import Pagination from "./Pagination";
import { useUsers } from "./useUsers";
import HeaderCell from "./HeaderCell";
import { useColumnResize } from "./useColumnResize";

const COLUMNS = [
    {
        label: 'Фамилия',
        field: 'lastName',
        sortable: true,
        className: 'col-lastname',
        resizable: true,
    },
    {
        label: 'Имя',
        field: 'firstName',
        sortable: true,
        className: 'col-firstname',
        resizable: true,
    },
    {
        label: 'Возраст',
        field: 'age',
        sortable: true,
        className: 'col-age',
        resizable: true,
    },
    {
        label: 'Пол',
        field: 'gender',
        sortable: true,
        filtrable: true,
        render: (value) => <div className={value}>{value}</div>,
        filterOptions: ["male", "female"],
        resizable: true,
    },
    {
        label: 'Номер телефона',
        field: 'phone',
        sortable: true,
        resizable: true,
    },
    {
        label: 'Email',
        field: 'email',
        sortable: false,
        className: 'col-email',
        resizable: true,
    },
    {
        label: 'Страна',
        field: 'country',
        sortable: false,
        resizable: true,
    },
    {
        label: 'Город',
        field: 'city',
        sortable: false,
        resizable: false,
    },
];

export default function UserTable() {

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openFilterField, setOpenFilterField] = useState(null);
    const {
        users,
        page,
        totalPages,
        sortField,
        loading,
        setPage,
        changeSorting,
        changeFiltering,
        filter
    } = useUsers();

    const tableRef = useRef(null);
    useColumnResize(tableRef);

    return (
        <>
            {loading && <div className="loader-container"><div className="loader"></div></div>}
            {openFilterField && <div className="overlay" onClick={() => setOpenFilterField(null)} />}
            <div class="table-wrapper">
                <div class="table-scroll">
                    <table className='users-table' ref={tableRef}>
                        <thead>
                            <tr>
                                {COLUMNS.map((column) => {
                                    const sortOrder =
                                        sortField?.field === column.field
                                            ? sortField.order
                                            : "none";

                                    const isFilterOpen =
                                        openFilterField === column.field;

                                    const isFilterActive =
                                        filter?.fieldName === column.field;

                                    const handleSort = () => {
                                        changeSorting(column.field);
                                    };

                                    const handleToggleFilter = () => {
                                        setOpenFilterField((prev) =>
                                            prev === column.field ? null : column.field
                                        );
                                    };

                                    const handleFilterChange = (value) => {
                                        changeFiltering(column.field, value);
                                    };

                                    return (
                                        <HeaderCell
                                            key={column.field}
                                            column={column}
                                            sortOrder={sortOrder}
                                            isFilterOpen={isFilterOpen}
                                            isFilterActive={isFilterActive}
                                            onSort={handleSort}
                                            onToggleFilter={handleToggleFilter}
                                            onFilterChange={handleFilterChange}
                                            filter={filter}
                                        />
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} onClick={() => setSelectedUserId(user.id)}>
                                    {COLUMNS.map((col) => (
                                        <td key={col.field} className={col.className}>
                                            {col.render
                                                ? col.render(user[col.field], user)
                                                : user[col.field]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
            {selectedUserId && <UserModal userId={selectedUserId} close={() => setSelectedUserId(null)} />}
        </>
    )
}