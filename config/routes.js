/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /api/authentication/check-username': {action: 'authentication/check-username'},
  'POST /api/authentication/signin': {action: 'authentication/signin'},
  'POST /api/authentication/register': {action: 'authentication/register'},
  'POST /api/authentication/token': {action: 'authentication/token'},
  'POST /api/authentication/ganti': {action: 'authentication/ganti'}
};
