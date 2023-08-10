import axios from "axios";
import { students, professionals, companies, jobs } from "./mockUsers.js";
const users = [...students, ...professionals];


// // Función para extraer el token de la cookie del usuario
// function extractTokenFromSetCookie(setCookie) {
//   const tokenStartIndex = setCookie.indexOf("token=") + "token=".length;
//   const tokenEndIndex = setCookie.indexOf(";");
//   const token = setCookie.slice(tokenStartIndex, tokenEndIndex);
//   return token;
// }


(async () => {
  // Se crean los usuarios
  for (const user of users) {
    await axios.post(`http://localhost:3001/userTest`, user);
  }

  // Se crean las empresas y se les asocian trabajos al azar
  const jobKeys = Object.keys(jobs);
  const companyCount = companies.length;
  let companyId;

  for (let i = 0; i < companyCount; i++) {
    const company = companies[i];
    const createdCompany = await axios.post(
      `http://localhost:3001/userTest`,
      company
    ).then((data) => companyId = data.data.id)

    // // Se recupera el id desde la cookie
    // const cookieHeader = createdCompany.headers["set-cookie"][0];
    // const companyToken = extractTokenFromSetCookie(cookieHeader);
    // const companyId = await axios.get(
    //   `http://localhost:3001/userTest/${companyToken}`,
    //   company
    // ).then((data) => data.data.id);

    // Se asocian trabajos al azar a la empresa actual

    const randomJobIndex = i % jobKeys.length;
    const randomJobKey = jobKeys[randomJobIndex];
    const randomCompanyJobs = jobs[randomJobKey];

    // Se crean los trabajos para la empresa actual
    if (randomCompanyJobs) {
      for (const job of randomCompanyJobs) {
        job.companyId = companyId;
        await axios.post(`http://localhost:3001/userTest`, job);
      }
    }
  }
})();
