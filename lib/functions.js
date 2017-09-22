const config = require('config');
const jsonld = require('./jsonld');

module.exports.getJsonLdDocument = function(request, response, callback) {
    const context = config.get('iiif.context');
    jsonld.compact("http://localhost:3000/fragment.json", context, function(error, compacted) {
        const out = JSON.stringify(compacted, null, 2);
        if (typeof callback === "function") {
            response.set('Content-Type', "application/ld+json");
            callback(response.statusCode, out, response);
        }
    });
};
