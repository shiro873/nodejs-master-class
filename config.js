/**
 * create and export confitguration variables
 */

// container for all the environments
var environments = {};

// stgaing object(default environment)
environments.staging = {
    'port': 3000,
    'envName': 'staging',
};

// production object
environments.production = {
    'port': 5000,
    'envName': 'production'
};

// determine which one to export as a command line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check the current envirnment is one of the environent object, default staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//  export the module
module.exports = environmentToExport;