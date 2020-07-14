const getConvertionFactors = (unit) => {
  let convertionToMt;
  let convertionToKm;
  let convertionToMi;
  if (unit === 'mi') {
    convertionToMt = 1609.34;
    convertionToKm = 1.60934;
    convertionToMi = 1;
  } else if (unit === 'km') {
    convertionToMt = 1000;
    convertionToKm = 1;
    convertionToMi = 1 / 1609.34;
  } else {
    throw new Error('getPopularAlbums: Invalid units');
  }
  return { convertionToMt, convertionToKm, convertionToMi };
};

module.exports = getConvertionFactors;
