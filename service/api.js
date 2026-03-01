const BASE_URL = 'https://dummyjson.com';
const USER_FIELDS = 'lastName,firstName,age,gender,phone,email,address';
const USER_DETAILS = 'lastName,firstName,age,gender,phone,email,address,height,weight,image';

const LIMIT = 30;

const userMapper = (user) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
        country: user.address?.country || "",
        city: user.address?.city || "",

    }
}

export async function fetchUsersData(page = 0, sortBy, order) {
    let url = `${BASE_URL}/users?limit=${LIMIT}&skip=${page * LIMIT}&select=${USER_FIELDS}`;
    if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        return {users: data.users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            phone: user.phone,
            email: user.email,
            country: user.address?.country || "",
            city: user.address?.city || ""
        })),
            total: data.total,
            skip: data.skip};
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function fetchSingleUser(id) {
    console.log(id);
    let url = `${BASE_URL}/users/${id}?select=${USER_DETAILS}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const userData = {
            ...userMapper(data),
            height: data.height,
            weight: data.weight,
            avatar: data.image
        }
        return userData;
    } catch (e) {
        console.log(e);
        return null;
    }
}