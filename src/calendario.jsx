import React, { useState, useRef } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FaCalendarAlt } from 'react-icons/fa';

const Calendario = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayText, setDisplayText] = useState(
    new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  const calendarRef = useRef(null);
  
  const openCalendar = () => {
    setShowCalendar(true); // Asegurar que el calendario se muestre al abrirlo
  };

  const closeCalendar = () => {
    setShowCalendar(false); // Ocultar el calendario al cerrarlo
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDisplayText(date.format('DD.MM.YYYY'));
    closeCalendar(); // Cerrar el calendario después de seleccionar la fecha
  };

  return (
    <div className="calendario-container"  style={{ position: 'relative' }}>
      <FaCalendarAlt className="calendar-icon" onClick={openCalendar} />
      <span className="selected-date">{displayText}</span>
      {showCalendar && (
        <div className="calendar-wrapper" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, }} onBlur={closeCalendar}> 
          <Datetime
            input={false}
            value={selectedDate}
            onChange={handleDateChange}
            className="custom-datetime"
            closeOnClickOutside={true}
            dateFormat="DD.MM.YYYY"
            timeFormat={false}
            locale="es"
            months={[
              'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ]}
            weekdays={[
              'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
            ]}
            inputProps={{ style: { fontSize: '14px' } }} // Cambia el tamaño de la fuente
            renderDay={(props, currentDate) => (
                <td {...props} style={{ fontSize: '12px' }}>
                  {currentDate.date()}
                </td>
              )}
          />
        </div>
      )}
    </div>
  );
};

export default Calendario;

