'use strict'
import queryString from 'query-string';
import _ from 'lodash';

import config from './config';

var request = {}

request.get = function(api,params){
	if(params){
		api += '?'+queryString.stringify(params)
	}
	return fetch(config.api.base+api)
		.then((response) => response.json())
}

request.post = function(api,params){
	return fetch(config.api.base+api+'?'+queryString.stringify(params), {
	  method: config.header.method,
	  headers: config.header.headers
	}).then(response => response.json());
}


module.exports = request