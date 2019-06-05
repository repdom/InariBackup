// you will need to install via 'npm install jsonwebtoken' or in your package.json

var jwt = require('jsonwebtoken');

var METABASE_SITE_URL = 'http://localhost:3000';
var METABASE_SECRET_KEY = 'cbf586d0ad86d62cc26288a34f3d3b3db92078013aa40cfdd0e9085d06d03da0';

var payload = {
  resource: {question: 1},
  params: {},
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var iframeUrl = METABASE_SITE_URL + '/embed/question/' + token + '#bordered=true&titled=true';

function obtenerIframe() {
  return iframeUrl;
}
