import { useState } from 'react'
import axios from './config/axios';

function App() {

  const [values, setValues] = useState({ fecha: "2024" });

  function submitForm(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const form = document.getElementById("myForm");
    const formData = new FormData(form);
    formData.append("fecha",values.fecha);
    const inputFile = document.getElementById("imageNoticia");

    let newErrors = {};

    // validationsAltaNoticias(values, setErrors, newErrors, lengthFile);

    if (Object.keys(newErrors).length === 0) {
      axios
        .post(form.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Manejar la respuesta del servidor
          // setValues({ fecha: "" });

          alert("archivo enviado");
          // inputFile.value = "";
        })
        .catch((error) => {
          // toast.error("Algo salio mal :(")
          console.log(error(error));
        });
    }
  }

  const handleChange = (e) => {
    if(cantidadMaximaDeArchivos(e)){

      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });

    }else alert("no puede adjuntar tantos archivos")
  };

  const cantidadMaximaDeArchivos = ()=>{
    const input = event.target;
    const files = input.files;
  
    // Verificar si se seleccionaron más de 5 archivos
    if (files.length > 5) {
      // input.value = "";
     return false
    }else return true
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
      <h2>Transferencia de archivos con NodeJS y Multer</h2>
      <form
        id="myForm"
        action="http://localhost:4000/noticias/alta"
        enctype="multipart/form-data"
        method="POST"
        onSubmit={submitForm}
        className='mt-4 d-flex flex-column'
      >
      
        <input
          type="file"
          name="files"
          multiple
          id="imageNoticia"
          required
          onChange={handleChange}
          value={values.files}
        />

        <button
          variant="success"
          className="btn btn-success mt-3"
          type="submit"
          value="Upload your files"
          // onClick={submitForm}
        >
          enviar archivos
        </button>
      </form>
    </div>
  );
}

export default App
