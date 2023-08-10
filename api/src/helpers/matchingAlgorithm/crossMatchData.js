const { countCommonElements } = require("./countCommonElements.js");
const { crossMatchDataOptions } = require("./crossMatchDataOptions.js");

function countCommonElementsForJob(regularUser, job) {
  const {
    academic_area,
    info_skills,
    info_languages,
    info_availability,
    academic_level,
    info_contract,
    info_interests,
  } = regularUser;

  const {
    studyArea,
    skillsRequired,
    languagesRequired,
    availability,
    levelRequired,
    contractOffered,
    industry,
  } = job;

  let commonElements = 0;
  commonElements += countCommonElements(academic_area, studyArea);
  commonElements += countCommonElements(info_skills, skillsRequired);
  commonElements += countCommonElements(info_languages, languagesRequired);
  commonElements += countCommonElements(info_availability, availability);
  commonElements += countCommonElements(academic_level, levelRequired);
  commonElements += countCommonElements(info_contract, contractOffered);
  commonElements += countCommonElements(info_interests, industry);

  return commonElements;
}

// Se toma al usuario objetivo y a su potencial match
const crossMatchData = (user, target) => {
  // Se verifica si alguno de los usuarios es de tipo empresa
  let company = user.type === "company" 
    ? user 
    : target.type === "company" 
      ? target 
      : null;

  // Se verifica que el otro sea un usuario regular
  let regularUser = ["student", "professional"].includes(user.type)
    ? user
    : ["student", "professional"].includes(target.type)
    ? target
    : null;

  let job = target.jobName ? target : null;

  //--- Se extraen los campos a usar:

    if ((company && regularUser) || job) {
      if (!company?.jobs?.length) {
        if (job) {
          return countCommonElementsForJob(regularUser, job);
        } else {
          return 0;
        }
      } else {
        let commonElements = 0;
        const jobs = company.jobs;

        for (const job of jobs) {
          commonElements += countCommonElementsForJob(regularUser, job);
        }
        return commonElements;
      }
    }

  //--- Usuario principal ---//
  const {
    info_problematic: targetProblematic,
    info_goals: targetGoals,
    info_career: targetCareer,
    info_skills: targetSkills,
    info_interests: targetInterests,
    academic_area: targetAcademicArea,
  } = target;

  //--- Potencial match ---//
  const {
    info_problematic: userProblematic,
    info_goals: userGoals,
    info_career: userCareer,
    info_skills: userSkills,
    info_interests: userInterests,
    academic_area: userAcademicArea,
  } = user;

  // Se cuentan los elementos en común
  const commonCareerCount = countCommonElements(userCareer, targetCareer);
  const commonAcademicAreaCount = countCommonElements(
    userAcademicArea,
    targetAcademicArea
  );
  const commonGoalsCount = countCommonElements(userGoals, targetGoals);
  const commonSkillsCount = countCommonElements(userSkills, targetSkills);
  const commonInterestsCount = countCommonElements(
    userInterests,
    targetInterests
  );

  // Se verifican y establecen valores por defecto a los campos
  // a los que se les va a hacer el matcheo cruzado
  const targetData = [...(targetGoals || []), ...(targetProblematic || [])];
  const userData = [...(userGoals || []), ...(userProblematic || [])];

  // Se definen los puntajes correspondientes:

  // Usuario principal
  const scoreTargetUser = crossMatchDataOptions(
    targetData,
    userData,
    commonCareerCount,
    commonAcademicAreaCount,
    commonGoalsCount,
    commonSkillsCount,
    commonInterestsCount,
    Number(user.profile_support)
  );

  // Potencial match
  const scoreUser = crossMatchDataOptions(
    userData,
    targetData,
    commonCareerCount,
    commonAcademicAreaCount,
    commonGoalsCount,
    commonSkillsCount,
    commonInterestsCount,
    Number(target.profile_support)
  );

  // Se retorna el máximo entre ambos
  return Math.max(scoreUser, scoreTargetUser);
};

module.exports = { crossMatchData };
