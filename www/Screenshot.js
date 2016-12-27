var exec = require('cordova/exec'), formats = ['png','jpg'];
module.exports = {
	save:function(format,quality, filename) {
		var self = this;
		format = (format || 'png').toLowerCase();
		filename = filename || 'screenshot_'+Math.round((+(new Date()) + Math.random()));
		if(formats.indexOf(format) === -1){
			if (self.onFailed)
				self.onFailed();
		}
		quality = typeof(quality) !== 'number'?100:quality;
		exec(function(res){
			if (self.onSuccess)
				self.onSuccess();
		}, function(error){
			if (self.onFailed)
				self.onFailed();
		}, "Screenshot", "saveScreenshot", [format, quality, filename]);
	},

	URI:function(callback, quality){
		quality = typeof(quality) !== 'number'?100:quality;
		exec(function(res){
			callback && callback(null, res);
		}, function(error){
			callback && callback(error);
		}, "Screenshot", "getScreenshotAsURI", [quality]);

	},
	onSuccess : null,
	onFailed : null
};
