const { calculateMatchScore } = require("./calculateMatchScore.js");

// Se toma un array de perfiles y un perfil base
const matcher = (users, target) => {
  const matches = [];

  // Se filtra al propio usuario para no matchear consigo mismo
  const filteredUsers = users.filter((user) => user.id !== target.id);

  // Por cada perfil del arreglo se llama a calculateMatchScore
  for (const user of filteredUsers) {
    const matchScore = calculateMatchScore(user, target);
    matches.push({ user, matchScore });
  }

  // Se ordena las coincidencias según el match score
  matches.sort((a, b) => b.matchScore - a.matchScore);

  if (!matches.length) return matches;

  // Se retorna un arreglo con los perfiles que hicieron match
  const filteredMatches = matches.filter((user) => user.matchScore !== 0);
  return filteredMatches;
};

module.exports = { matcher };
