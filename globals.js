'use strict'
const nodejs_argv = require("nodejs-argv");

/* In nightwatch/globals.js */
var HtmlReporter = require('nightwatch-html-reporter-JC');
var reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: "reports",
    uniqueFilename: false,
    reportFilename: "generatedTestResults.html",
    themeName: "cover",
    hideSuccess: false,
    relativeScreenshots: false
});

const argv = nodejs_argv.new();

argv.option([
    ["-s", "--scope",   "str=develop",  "Scope to run the tests [dev, qa, prod]"],
    ["-h", "--help",                    "Display help"]
]);

try {
    argv.parse()
}catch (e) {
    console.log("Error:", e)
}


module.exports = {
    reporter: reporter.fn,

    baseUrl : function(){
		switch(argv.get("scope")) {
		    case "qa":
		        return "http://contact_list_app:3000";
		        break;
		    case "prod":
		        return "http://contact_list_app:3000";
		        break;
		    case "dev":
		        return "http://localhost:3000";
		        break;
		    default:
		        return "http://contact_list_app:3000";
		        break;
		}
		return ;
	},

    beforeEach: function (browser, done) {
        require('nightwatch-video-recorder').start(browser, done)
    },
    afterEach: function (browser, done) {
        require('nightwatch-video-recorder').stop(browser, done)
    }
};
