'use strict';
//var $ = require('jquery'); 

var https = require( 'https' );
var activityUtils = require('./activityUtils');
var httpExecute = process.env.REST_EXECUTE && process.env.REST_EXECUTE.length > 0? process.env.REST_EXECUTE : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/execute";
var httpSave = process.env.REST_SAVE && process.env.REST_SAVE.length > 0? process.env.REST_SAVE : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/save";
var httpPublish = process.env.REST_PUBLISH && process.env.REST_PUBLISH.length > 0? process.env.REST_PUBLISH : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/publish";
var httpValidate = process.env.REST_VALIDATE && process.env.REST_VALIDATE.length > 0? process.env.REST_VALIDATE : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/validate";
var configJSON = {
    "workflowApiVersion": "1.1",
		"metaData": {
			"icon": "images/sms.png",
			"iconSmall": "images/smsSmall.png",
			"category": "message"
		},
		"type": "REST",
		"lang": {
			"en-US": {
				"name": process.env.JB_ACTIVITY_NAME,
				"description": ""
			}
		},
		"arguments": {
			"execute": {
				"inArguments": [],
        "outArguments": [
        	{
        		"result":""
        	}
        ],
				"url": httpExecute,
				"useJWT": true
			}
		},
		"configurationArguments": {
			"applicationExtensionKey": process.env.JB_ACTIVITY_KEY,
			"save": {
				"url": httpSave
			},
			"publish": {
				"url": httpPublish
			},
			"validate": {
				"url": httpValidate
			}
		},
		"wizardSteps": [
			{ "label": "Step 1", "key": "step1" },
			{ "label": "Step 2", "key": "step2" },
			{ "label": "Step 3", "key": "step3" },
			{ "label": "Step 4", "key": "step4", "active": false }
		],
		"userInterfaces": {
			"configModal": {
				"height": 200,
				"width": 300,
				"fullscreen": true
			},
			"runningModal": {
				"url": "runningModal.html"
			},
			"runningHover": {
				"url": "runningHover.html"
			}
		},
		"schema": {
			"arguments": {
				"execute": {
					"inArguments": [],
					"outArguments": []
				}
			}
		},
		"sslNotRequired": true
	};

/**
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function( req, res ) {
	console.log('>>> EDIT <<<');
	console.log(req.body);
	// Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //activityUtils.logData( req );
    res.send( 200, 'Edit' );
};

/**
 * POST Handler for /save/ route of Activity.
 */
exports.save = function( req, res ) {
	console.log('>>> SAVE <<<');
	console.log(req.body);
	// Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //activityUtils.logData( req );
    res.send( 200, 'Save' );
};

/**
 * POST Handler for /publish/ route of Activity.*/

exports.publish = function( req, res ) {
	console.log('>>> PUBLISH <<<');
	console.log(req.body);
	// Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //activityUtils.logData( req.body );
    res.send( 200, 'Publish' );
};


/* POST Handler for /publish/ route of Activity.

exports.publish = function( req, res ) {
         console.log('>>> PUBLISH <<<');
         console.log(req.body);
         console.log("Task: " + req.body.Task);
    	 $.ajax({
             type: "POST",
             url: 'https://enelnotificacionesproactjava.herokuapp.com/rest-activity/publish',
             data: req.body.Task,
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (data) {
                      debugger;
                      console.log('>>> Llamada a aplicación de java correcta <<<')
             },
             error: function (msg, url, line) {
                      console.log('error trapped in error: function(msg, url, line)');
                      console.log('msg = ' + msg + ', url = ' + url + ', line = ' + line);
             }
    	 });    
}*/

/**
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function( req, res ) {
	console.log('>>> VALIDATE <<<');
	console.log(req.body);
	// Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //activityUtils.logData( req );
    res.send( 200, 'Validate' );
};

/**
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function( req, res ) {
	console.log('>>> EXECUTE <<<');
	console.log(req.body);
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //activityUtils.logData( req );
	
    var username = "enel";
    var password = "enel.-2017";
    var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    //var request = require('request');   
    var taskExternalID = "";
    
    for (var i = 0; i < req.body.inArguments.length; i++) {
              if(req.body.inArguments[i].taskExternalID!=undefined) {
                       taskExternalID=req.body.inArguments[i].taskExternalID;
              }        
    }
    console.log("taskExternalID: "+taskExternalID);
    
    var telefono = "";
    for (var i = 0; i < req.body.inArguments.length; i++) {
              if(req.body.inArguments[i].phone!=undefined) {
                       telefono=req.body.inArguments[i].phone;
              }        
    }
    console.log("telefono: "+telefono);
    
    var mensaje = "";
    for (var i = 0; i < req.body.inArguments.length; i++) {
              if(req.body.inArguments[i].message!=undefined) {
                       mensaje=req.body.inArguments[i].message;
              }        
    }
    console.log("mensaje: "+mensaje);
    
    
    var urlString ="http://ws.econecta.cl/api/citas/envio?tipo_campania=91&iso_3166=CHL&id_externo="+taskExternalID+"&telefono="+telefono+"&mensaje="+req.body.inArguments.mensaje;

//    https.get( {
//        url : urlString,
//        headers : {
//            "Authorization" : auth
//        }
//      }, function(error, response, body) {
//          console.log('body : ', body);
//          console.log('error : ', error);
//      } );
    
//    var options = {
//    		   host: 'test.example.com',
//    		   port: 443,
//    		   path: '/api/service/'+servicename,
//    		   // authentication headers
//    		   headers: {
//    		      'Authorization': auth
//    		   }   
//    		};
//    
//	//this is the call
//    request = https.get(options, function(res){
//       var body = "";
//       res.on('data', function(data) {
//          body += data;
//       });
//       res.on('end', function() {
//        //here we have the full response, html or json object
//          console.log(body);
//       })
//       res.on('error', function(e) {
//          onsole.log("Got error: " + e.message);
//       });
//	});
	
	res.send( 200, {"result":"0"});
};

/**
 *  GET config.json. Instead of using a static field, we build the initial config.json file using the variables from Heroku.
 */
exports.configJSON = function( req, res ) {
	console.log('>>> get _config.json <<<');
	res.send( 200, configJSON);
};




