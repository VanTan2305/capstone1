import axios from "axios";

export const getQuestionQuery = (query, page) => axios.get(`http://localhost:3000/api/questions/getAll?sort=-createdAt&search=${query}&page=${page}`);

export const getTestQuery = (query, page) => axios.get(`http://localhost:3000/api/tests/getAll?sort=-createdAt&search=${query}&page=${page}`);
