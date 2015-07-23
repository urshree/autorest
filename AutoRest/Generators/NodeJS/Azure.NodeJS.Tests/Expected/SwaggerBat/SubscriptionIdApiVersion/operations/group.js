
'use strict';

var util = require('util');
var msRest = require('ms-rest');
var msRestAzure = require('ms-rest-azure');
var ServiceClient = msRest.ServiceClient;
var WebResource = msRest.WebResource;

var models = require('../models');

/**
 * @class
 * Group
 * __NOTE__: An instance of this class is automatically created for an
 * instance of the MicrosoftAzureTestUrl.
 * Initializes a new instance of the Group class.
 * @constructor
 *
 * @param {MicrosoftAzureTestUrl} client Reference to the service client.
 */
function Group(client) {
  this.client = client;
}

/**
 * Provides a resouce group with name 'testgroup101' and location 'West US'.
 * @param {String} [resourceGroupName] Resource Group name 'testgroup101'.
 *
 * @param {object} [options]
 *
 * @param {object} [options.customHeaders] headers that will be added to
 * request
 *
 * @param {function} callback
 *
 * @returns {Stream} The Response stream
 */
Group.prototype.getSampleResourceGroup = function (resourceGroupName, options, callback) {
  var client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  // Validate
  try {
    if (this.client.subscriptionId === null || this.client.subscriptionId === undefined) {
      throw new Error('\'this.client.subscriptionId\' cannot be null');
    }
    if (this.client.subscriptionId !== null && this.client.subscriptionId !== undefined && typeof this.client.subscriptionId !== 'string') {
      throw new Error('this.client.subscriptionId must be of type string.');
    }
    if (resourceGroupName === null || resourceGroupName === undefined) {
      throw new Error('\'resourceGroupName\' cannot be null');
    }
    if (resourceGroupName !== null && resourceGroupName !== undefined && typeof resourceGroupName !== 'string') {
      throw new Error('resourceGroupName must be of type string.');
    }
    if (this.client.apiVersion === null || this.client.apiVersion === undefined) {
      throw new Error('\'this.client.apiVersion\' cannot be null');
    }
    if (this.client.apiVersion !== null && this.client.apiVersion !== undefined && typeof this.client.apiVersion !== 'string') {
      throw new Error('this.client.apiVersion must be of type string.');
    }
    if (this.client.acceptLanguage !== null && this.client.acceptLanguage !== undefined && typeof this.client.acceptLanguage !== 'string') {
      throw new Error('this.client.acceptLanguage must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  var requestUrl = this.client.baseUri + 
                   '//subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}';
  requestUrl = requestUrl.replace('{subscriptionId}', encodeURIComponent(this.client.subscriptionId));
  requestUrl = requestUrl.replace('{resourceGroupName}', encodeURIComponent(resourceGroupName));
  var queryParameters = [];
  queryParameters.push('api-version=' + encodeURIComponent(this.client.apiVersion));
  if (queryParameters.length > 0) {
    requestUrl += '?' + queryParameters.join('&');
  }
  // trim all duplicate forward slashes in the url
  var regex = /([^:]\/)\/+/gi;
  requestUrl = requestUrl.replace(regex, '$1');

  // Create HTTP transport objects
  var httpRequest = new WebResource();
  httpRequest.method = 'GET';
  httpRequest.headers = {};
  httpRequest.url = requestUrl;
  // Set Headers
  httpRequest.headers['x-ms-client-request-id'] = msRestAzure.generateUuid();
  if (this.client.acceptLanguage !== null) {
    httpRequest.headers['accept-language'] = this.client.acceptLanguage;
  }
  if(options) {
    for(var headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  httpRequest.body = null;
  httpRequest.headers['Content-Length'] = 0;
  // Send Request
  return client.pipeline(httpRequest, function (err, response, responseBody) {
    if (err) {
      return callback(err);
    }
    var statusCode = response.statusCode;
    if (statusCode !== 200) {
      var error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = httpRequest;
      error.response = response;
      if (responseBody === '') responseBody = null;
      var parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        error.body = parsedErrorResponse;
        if (error.body !== null && error.body !== undefined) {
          error.body = client._models['ErrorModel'].deserialize(error.body);
        }
      } catch (defaultError) {
        error.message = util.format('Error "%s" occurred in deserializing the responseBody - "%s" for the default response.', defaultError, responseBody);
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    var result = new msRest.HttpOperationResponse();
    result.request = httpRequest;
    result.response = response;
    if (responseBody === '') responseBody = null;
    result.requestId = response.headers['x-ms-request-id'];
    // Deserialize Response
    if (statusCode === 200) {
      var parsedResponse;
      try {
        parsedResponse = JSON.parse(responseBody);
        result.body = parsedResponse;
        if (result.body !== null && result.body !== undefined) {
          result.body = client._models['SampleResourceGroup'].deserialize(result.body);
        }
      } catch (error) {
        var deserializationError = new Error(util.format('Error "%s" occurred in deserializing the responseBody - "%s"', error, responseBody));
        deserializationError.request = httpRequest;
        deserializationError.response = response;
        return callback(deserializationError);
      }
    }

    return callback(null, result);
  });
};


module.exports = Group;