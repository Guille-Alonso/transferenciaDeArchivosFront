import axiosOriginal from "axios";

const axios = axiosOriginal.create({
   baseURL: "https://estadisticas.smt.gob.ar:1200",
});


export default axios;