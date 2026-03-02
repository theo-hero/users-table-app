import { useCallback, useEffect, useState } from "react";
import { fetchUsersData, MAX_ROWS } from "../../../service/api";
import { useError } from "../../context/ErrorContext";

const ORDER = Object.freeze({
    ASC: "ascending",
    DESC: "descending"
});

export function useUsers() {
    const [users, setUsers] = useState([]);

    const [sortField, setSortField] = useState(null);
    // current api doesn't allow multiple filters -> this filter state only stores one field and its value
    const [filter, setFilter] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const { setError } = useError();

    useEffect(() => {
        fetchUsersData(page - 1, sortField?.field, sortField?.order, filter?.fieldName, filter?.value)
            .then(data => {
                if (!data) return;
                setUsers(data.users);
                setTotalPages(Math.ceil(data.total / MAX_ROWS));
            })
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }, [page, sortField, filter, setError]);

    const changeSorting = useCallback((fieldName) => {
        setLoading(true);
        if (!sortField || sortField.field !== fieldName) {
            setSortField({ field: fieldName, order: ORDER.DESC });
        } else if (sortField.order === "descending") {
            setSortField(prev => ({ ...prev, order: ORDER.ASC }));
        } else {
            setSortField(null);
        }
    }, [sortField]);

    const changeFiltering = (fieldName, value) => {
        setLoading(true);
        if (value === null) {
            setFilter(null);
        } else {
            setFilter({ fieldName, value });
        }
        setPage(1);
    };

    return {
        users,
        page,
        totalPages,
        sortField,
        loading,
        setPage,
        changeSorting,
        changeFiltering,
        filter
    }
}