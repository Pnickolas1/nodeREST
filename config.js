// create and export configuration variables
// container 

var environments = {};

// staging 

environments.staging = {
  'httpPort' : 3000,
  'httpsPort': 3001,
  'envName': 'staging',
};

environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName' : 'production',
};


// determine which should be exported out
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ?
  process.env.NODE_ENV.toLowerCase()
  : '';

// check that the current environment is one of the environments above , if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object'
  ? environments[currentEnvironment]
  : environments.staging


// export the module
module.exports = environmentToExport