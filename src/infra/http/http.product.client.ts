import axios from "axios";

export const makeHttpProductClient = () => {
    return axios.create({
        baseURL: 'https://challenges.coode.sh/food/data/json/'
    });
}