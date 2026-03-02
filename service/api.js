const BASE_URL = 'https://dummyjson.com';
const USER_FIELDS = 'lastName,firstName,age,gender,phone,email,address';
const USER_DETAILS = 'lastName,firstName,age,gender,phone,email,address,height,weight,image';

export const MAX_ROWS = 30;
const TIMEOUT = 10_000;

// if field names change on the server, only constants and this mapper need to change
const userMapper = (user) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        phone: user.phone,
        email: user.email
    }
}

async function fetchWithTimeout(url, options = {}, timeout = TIMEOUT) {
    const controller = new AbortController();
    const signal = controller.signal;

    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        const res = await fetch(url, { ...options, signal }); // options in case they are needed in the future
        if (!res.ok) throw new Error(`HTTP error, status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (e) {
        if (e.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw e;
    } finally {
        clearTimeout(timer);
    }
}

export async function fetchUsersData(page = 0, sortBy, order, filterField, filterValue) {
    const url = new URL(`${BASE_URL}/users${filterField && filterValue ? '/filter' : ''}`);

    const params = new URLSearchParams();

    if (filterField && filterValue) {
        params.append("key", filterField);
        params.append("value", filterValue);
    }

    params.append("limit", MAX_ROWS);
    params.append("skip", page * MAX_ROWS);
    params.append("select", USER_FIELDS);

    if (sortBy && order) {
        params.append("sortBy", sortBy);
        params.append("order", order === "ascending" ? "asc" : "desc");
    }

    url.search = params.toString();

    try {
        const data = await fetchWithTimeout(url);
        return {
            users: data.users.map(user => ({
                ...userMapper(user),
                country: user.address?.country || "",
                city: user.address?.city || ""
            })),
            total: data.total,
            skip: data.skip
        };
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function fetchSingleUser(id) {
    console.log(id);
    let url = `${BASE_URL}/users/${id}?select=${USER_DETAILS}`;

    try {
        const data = await fetchWithTimeout(url);
        const userData = {
            ...userMapper(data),
            height: data.height,
            weight: data.weight,
            avatar: data.image,
            address: data.address
        }
        return userData;
    } catch (e) {
        console.log(e);
        return null;
    }
}