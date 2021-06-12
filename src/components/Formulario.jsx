import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

//craer estado de las citas
const [cita, setCita] = useState({
    mascota: '',
    dueño:'',
    fecha:'',
    hora:'',
    sintomas:''
});


//creamdo el estado del error
const [error, setError] = useState(false);

//generar estado para dar mensaje al usurio de todo ok

const [mensajeEnviado, setMensajeEnviado] = useState(false);

const handlerState = (e) =>{
    setCita({
        ...cita,
        [e.target.name] : e.target.value
    })
}

//extraer valores de las citas

const {mascota, dueño, fecha, hora, sintomas} = cita;

//cuando el usuario presione agregar cita

const submitCita = (e) =>{
    e.preventDefault()
    //validar el formulario
    //el trim elimina los espacios vacios
    if(mascota.trim() === ''|| dueño.trim() === ''|| fecha.trim() === ''|| hora.trim() === ''|| sintomas.trim() === ''){
        setError(true)
        return;
    }
    setError(false)


//agregar un id
    cita.id = uuidv4(); 
//crear una cita
    crearCita(cita)
 //mostramos mensaje de exito
   setMensajeEnviado(true)

//ocultando mensaje de exito
    setTimeout(() =>{
    setMensajeEnviado(false)
   },3000)
//limpiar el formulario
    setCita({
        mascota: '',
        dueño:'',
        fecha:'',
        hora:'',
        sintomas:''
    })
    
}


    return(
        <>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            {mensajeEnviado ? <p className="alerta-mensaje">Mensaje enviado con exito</p> : null}
            <form 
                onSubmit={submitCita}
            >
                <label>Nombre de Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de Mascota"
                    value={mascota}
                    onChange={handlerState}
                 />
                 <label>Nombre del Dueño</label>
                <input 
                    type="text"
                    name="dueño"
                    className="u-full-width"
                    placeholder="Nombre del Dueño"
                    value={dueño}
                    onChange={handlerState}
                 />
                 <label>Fecha de Ingreso</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    value={fecha}
                    onChange={handlerState}
                 />
                <label>Hora de Ingreso</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                     value={hora}
                    onChange={handlerState}
                 />
                <label>Síntomas</label>
                <textarea 
                    name="sintomas"
                    className="u-full-width"
                    placeholder="¿Cual es tus síntomas?"
                    value={sintomas}
                    onChange={handlerState}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                    >
                    Agregar Cita
                </button>
            </form>
        </>
    );
  };
  

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
}

  export default Formulario;
  