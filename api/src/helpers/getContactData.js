/**
 * Este helper toma los datos del chat, el nombre de la 
 * propiedad deseada y el objeto de chat como entrada.
 * 
 * Identifica el tipo de usuario (Usuario o Empresa) para 
 * el remitente y el destinatario del chat.
 * 
 * Luego, extrae los valores de la propiedad especificada 
 * de ambos tipos de usuarios y filtra cualquier repetición.
 * Devuelve el valor de contacto único, si existe; de lo contrario, 
 * devuelve el primer valor de contacto encontrado.
 *
 * @param {string} data - Dato específico de contacto a buscar.
 * @param {string} prop - Propiedad específica de contacto ("username", "name", "profile_image").
 * @param {object} chat - Objeto de chat que contiene información sobre los remitentes y destinatarios.
 * @returns {string} - Valor de contacto único o el primer valor de contacto encontrado.
 */

const getContactData = (data, prop, chat) => {
  // Determinamos el tipo de usuario (Usuario o Empresa) 
  // para el remitente y el destinatario del chat.
  let typeReceived;
  let typeSent;

  chat.UserReceived
    ? (typeReceived = "UserReceived")
    : (typeReceived = "CompanyReceived");
  chat.UserSent 
    ? (typeSent = "UserSent") 
    : (typeSent = "CompanySent");

  // Obtenemos los valores de la propiedad especificada para ambos tipos de usuarios.
  const datas = [chat[typeReceived][prop], chat[typeSent][prop]];

  // Filtramos y eliminamos cualquier repetición del valor de contacto.
  const output = datas.filter((ele) => ele !== data);

  // Si no hay valores filtrados, devolvemos el primer valor de contacto encontrado.
  // Esto considera el caso de imágenes o nombres repetidos
  if (!output.length) {
    return datas[0];
  }

  // Devolvemos el valor de contacto único, si existe; 
  // de lo contrario, el primer valor de contacto encontrado.
  return output[0];
};

module.exports = getContactData;
