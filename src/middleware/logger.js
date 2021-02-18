'use strict';

module.exports = function(request, response,  next) {
 
  console.log(`${request.method} :: ${request.path}`);

  next();
};