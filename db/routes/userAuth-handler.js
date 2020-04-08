const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user-model.js'));

const auth = async (username, role, callback) => {
	try {
		console.log("Trying to validate username");
		const found = await User.findOne({name: username})
		if(found == null) {
			console.log("Did not find username!", username, role);
			callback(false);
		}
		else if(role === found.role) callback(true, found.pass);
		else {
			console.log("Username doesn't match, role: ", role, " found: ", found.role);
			callback(false);
		}
	} catch (e) {
		console.log(e)
	}
};


module.exports = auth
