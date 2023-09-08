const Timestamp = ({ timestamp }) => {
  const formattedTimestamp = formatTimestamp(timestamp);

  return <span>{formattedTimestamp}</span>;
};

export { Timestamp };

const formatTimestamp = (timestamp) => {
  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const hoy = new Date();
  const date = new Date(timestamp);
  const nombreDiaSemana = diasSemana[date.getDay()];
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const anio = date.getFullYear();
  const hora = date.getHours();
  let minutos = date.getMinutes();
  minutos = minutos < 10 ? `0${minutos}` : minutos;

  if (esMismoDia(date, hoy)) {
    return `hoy ${hora}:${minutos}`;
  } else if (esMismoDia(date, new Date(hoy.getTime() - 86400000))) {
    return `ayer ${hora}:${minutos}`;
  } else if (esMismaSemana(date, hoy)) {
    return `${nombreDiaSemana} ${hora}:${minutos}`;
  } else {
    return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
  }
};

const esMismoDia = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const esMismaSemana = (date1, date2) => {
  const diff = Math.abs(date1 - date2);
  const unaSemanaEnMilisegundos = 7 * 24 * 60 * 60 * 1000;
  return diff < unaSemanaEnMilisegundos;
};
