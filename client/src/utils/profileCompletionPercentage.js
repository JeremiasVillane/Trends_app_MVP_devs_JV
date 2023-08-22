const profileCompletionPercentage = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  const excludedProperties = ['info_company_name', 'info_position'];
  const totalKeys = Object.keys(obj).length;

  let notNullKeys = 0;

  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== null &&
      obj[key] !== undefined &&
      !excludedProperties.includes(key)
    ) {
      notNullKeys++;
    }
  }

  const totalPercentage = (notNullKeys / totalKeys) * 100;
  
  return totalPercentage.toFixed(0);
};

export default profileCompletionPercentage;
