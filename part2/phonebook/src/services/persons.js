import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  console.log(newObject);
  const request = axios.post(baseURL, newObject);
  return request.then((response) => {
    return response.data;
  });
};

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => {
    return response.data;
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  getAll,
  create,
  remove,
  update,
};
