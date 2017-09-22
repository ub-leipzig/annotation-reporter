var express = require('express');
var router = express.Router();
const functions = require('../lib/functions');
var jsonMarkup = require('json-markup');
var $ = require("jquery");

router.get('/', function(req, res, next) {
    functions.getJsonLdDocument(req, res, function(statusCode, result, response) {
        if (statusCode === 200) {
            res.setHeader('Content-Type', 'text/html');
            var p = JSON.parse(result);
            var k = "svcs:has_fragment_service";
            var out = {anno: []};
            let manifest;
            let svc;
            let chars;
            let img;
            for (const key of Object.keys(p)) {
                if (key === "@graph") {
                    var objs = p[key];
                    for (const obj of objs){
                        manifest = "<hr><a href='" + obj["within"] + "'>" + obj["within"] + "</a><br>";
                        svc = obj["svcs:has_fragment_service"]["@id"];
                        chars = obj["chars"];
                        img = "<img src=" + svc + ">";
                        out.anno.push({
                            manifest: manifest,
                            annotation: chars,
                            image: img
                        })
                    }
                }
            }
            let html = "<h1>Handschriften Kurs 2017: Annotation List</h1>";
            for (i = 0; i < out.anno.length; i++  ) {
                let anno;
                let image;
                manifest = out.anno[i].manifest;
                anno = out.anno[i].annotation;
                image = out.anno[i].image;
                html += manifest + anno + image;
            }
            //var out = JSON.stringify(result, null, '\t');
            res.send(html);
        } else {
            response.status(statusCode);
        }
    });
});

module.exports = router;

