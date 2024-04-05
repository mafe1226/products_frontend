import axios from "axios";

const BASE_URL = "https://slimmom-backend.onrender.com/api/";

async function getProductsByQuery(endpoint, token) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener datos de la API: ${error.message}`);
  }
}

async function sendFormData(endpoint, data, token) {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al enviar datos a la API: ${error.message}`);
  }
}

export { getProductsByQuery, sendFormData };
