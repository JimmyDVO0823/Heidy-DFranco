import React, { useState, useEffect } from "react";

// Función auxiliar para saber cuántos días tiene un mes específico (considera bisiestos)
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

function calculateExactDuration(startDate) {
  const now = new Date();
  
  // Clonamos las fechas para no modificar las originales
  let start = new Date(startDate);
  let end = new Date(now);

  // Inicializamos diferencias
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();

  // 1. Ajuste de Segundos
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  // 2. Ajuste de Minutos
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  // 3. Ajuste de Horas
  if (hours < 0) {
    hours += 24;
    days--;
  }

  // 4. Ajuste de Días (La parte crítica)
  if (days < 0) {
    // Tomamos el mes anterior para saber cuántos días pedir prestados
    // (Si estamos en Marzo, pedimos prestados los días de Febrero)
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }

  // 5. Ajuste de Meses
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

export default function LoveCounter() {
  // CONFIGURA TU FECHA AQUÍ: (Año, Mes - 1, Día, Hora, Minuto)
  // Enero es 0, Febrero es 1, etc.
  // Ejemplo: 1 de Enero de 2024 a las 00:00
  const startDate = new Date(2024, 0, 25, 0, 0, 0); 

  const [duration, setDuration] = useState(calculateExactDuration(startDate));

  useEffect(() => {
    // Actualizar cada segundo
    const timer = setInterval(() => {
      setDuration(calculateExactDuration(startDate));
    }, 1000);

    // Limpiar intervalo al desmontar
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
      <h3>Tiempo juntos: Heidy & D'Franco</h3>
      
      {/* Vista Principal */}
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#d63384" }}>
        {duration.years} años, {duration.months} meses, {duration.days} días
      </div>

      {/* Vista Detallada (Segundero) */}
      <div style={{ fontSize: "1rem", color: "#555", marginTop: "10px" }}>
        {duration.hours} horas, {duration.minutes} minutos y {duration.seconds} segundos
      </div>

      <hr style={{ margin: "20px 0", borderTop: "1px solid #eee" }} />
      
      {/* Dato Curioso: Total de meses */}
      <small style={{ color: "#888" }}>
        Total de meses acumulados: {duration.years * 12 + duration.months} meses
      </small>
    </div>
  );
}