const configs = {
  ENRICH_EXECUTED_VISISTS_URL: process.env.ENRICH_EXECUTED_VISISTS_URL || 'https://api.dev.carlsbergwebservices.com/services/{salesOrg}/enrichExecutedVisits',
};

const constants: string[] = [
  "D001",
  "F001",
  "C001",
  "E001",
  "L001",
  "A001"
];

function fetchUrl(salesOrg){
  var re = /{salesOrg}/;
  return configs.ENRICH_EXECUTED_VISISTS_URL.replace(re, salesOrg);
}

export {
  configs,
  constants,
  fetchUrl
}