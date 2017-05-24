'use strict';
var https = require( 'https' );
var activityUtils = require('./activityUtils');
var httpExecute = process.env.REST_EXECUTE && process.env.REST_EXECUTE.length > 0? process.env.REST_EXECUTE : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/execute";
var httpSave = process.env.REST_SAVE && process.env.REST_SAVE.length > 0? process.env.REST_SAVE : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/save";
var httpPublish = process.env.REST_PUBLISH && process.env.REST_PUBLISH.length > 0? process.env.REST_PUBLISH : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/publish";
var httpValidate = process.env.REST_VALIDATE && process.env.REST_VALIDATE.length > 0? process.env.REST_VALIDATE : "https://" + process.env.JB_ACTIVITY_KEY + ".herokuapp.com/rest-activity/validate";
var configJSON = {	
		    "name": "CA-Some SMS",
		    "arguments": {
		        "executionMode": "{{Context.ExecutionMode}}",
		        "definitionInstanceId": "{{Context.DefinitionInstanceId}}",
		        "definitionId": "{{Context.DefinitionId}}",
		        "activityId": "{{Activity.Id}}",
		        "contactKey": "{{Contact.Key}}",
		        "execute": {
		            "inArguments": [
		                {
		                    "actualChoice": "{{Interaction.MULTICRITERIADECISION-1.actualChoice}}"
		                },
		                {
		                    "Task:WhoId": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:WhoId}}"
		                },
		                {
		                    "Task:Tipo_de_Tarea__c": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:Tipo_de_Tarea__c}}"
		                },
		                {
		                    "Task:RecordTypeId": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:RecordTypeId}}"
		                },
		                {
		                    "Task:AccountId": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:AccountId}}"
		                },
		                {
		                    "Task:OwnerId": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:OwnerId}}"
		                },
		                {
		                    "Task:EndDate__c": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:EndDate__c}}"
		                },
		                {
		                    "Task:Who:Contact:MobilePhone": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:Who:Contact:MobilePhone}}"
		                },
		                {
		                    "Task:Who:Contact:Country__c": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:Who:Contact:Country__c}}"
		                },
		                {
		                    "Task:Who:Contact:ExternalId__c": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:Who:Contact:ExternalId__c}}"
		                },
		                {
		                    "Task:What:PointofDelivery__c:Name": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:What:PointofDelivery__c:Name}}"
		                },
		                {
		                    "Task:Who:Contact:Email": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:Who:Contact:Email}}"
		                },
		                {
		                    "Task:Who:Contact:HasOptedOutOfEmail": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:Who:Contact:HasOptedOutOfEmail}}"
		                },
		                {
		                    "Task:Id": "{{Event.SalesforceObjd2012c3f3b07bbc1ce97df1f668355b2.Task:Id}}"
		                },
		                {
		                    "message": "someMessage"
		                }
		            ],
		            "outArguments": [
		                {
		                    "result": ""
		                }
		            ],
		            "url": "https://enelnotificacionesproact.herokuapp.com/rest-activity/execute",
		            "useJWT": true
		        },
		        "testExecute": ""
		    },
		    "configurationArguments": {
		        "save": {
		            "url": "https://enelnotificacionesproact.herokuapp.com/rest-activity/save"
		        },
		        "testSave": "",
		        "publish": {
		            "url": "https://enelnotificacionesproact.herokuapp.com/rest-activity/publish"
		        },
		        "testPublish": "",
		        "unpublish": "",
		        "stop": "",
		        "testStop": "",
		        "testUnpublish": "",
		        "partnerActivityId": "",
		        "validate": {
		            "url": "https://enelnotificacionesproact.herokuapp.com/rest-activity/validate"
		        },
		        "testValidate": "",
		        "outArgumentSchema": {
		            "result": {
		                "dataType": "Text",
		                "isNullable": false,
		                "direction": "Out",
		                "readOnly": false,
		                "access": "Visible"
		            }
		        }
		    },
		    "metaData": {
		        "icon": "images/sms.png",
		        "iconSmall": "images/smsSmall.png",
		        "category": "message",
		        "isConfigured": true
		    },
		    "schema": {
		        "arguments": {
		            "execute": {
		                "inArguments": [
		                    {
		                        "actualChoice": {
		                            "dataType": "Number",
		                            "isNullable": false,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:WhoId": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:Tipo_de_Tarea__c": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:RecordTypeId": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:AccountId": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:OwnerId": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:EndDate__c": {
		                            "dataType": "Date",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:Who:Contact:MobilePhone": {
		                            "dataType": "Phone",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:Who:Contact:Country__c": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:Who:Contact:ExternalId__c": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:What:PointofDelivery__c:Name": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:Who:Contact:Email": {
		                            "dataType": "Email",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:Who:Contact:HasOptedOutOfEmail": {
		                            "dataType": "Boolean",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "Task:Id": {
		                            "dataType": "Text",
		                            "isNullable": true,
		                            "direction": "in"
		                        }
		                    },
		                    {
		                        "message": {
		                            "dataType": "Text",
		                            "isNullable": false,
		                            "direction": "in"
		                        }
		                    }
		                ],
		                "outArguments": [
		                    {
		                        "result": {
		                            "dataType": "Text",
		                            "access": "visible",
		                            "direction": "out"
		                        }
		                    }
		                ]
		            }
		        }
		    },
		    "outcomes": [
		        {
		            "key": "725e981b-ff4d-4ca9-b692-ac04bb3954b4",
		            "next": "WAIT-4",
		            "arguments": {},
		            "metaData": {}
		        }
		    ]
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
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function( req, res ) {
	console.log('>>> PUBLISH <<<');
	console.log(req.body);
	// Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //activityUtils.logData( req.body );
    res.send( 200, 'Publish' );
};

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
	res.send( 200, {"result":"0"});
};

/**
 *  GET config.json. Instead of using a static field, we build the initial config.json file using the variables from Heroku.
 */
exports.configJSON = function( req, res ) {
	console.log('>>> get _config.json <<<');
	res.send( 200, configJSON);
};




