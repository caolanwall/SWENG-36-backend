const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user-model.js'));

const authenticateUser = async (userName, Pass, Role, callback) => {
	try {
		console.log(Role);
		const ret = await User.findOne({ name: userName });
		if (ret != null){

			var comp = Pass.localeCompare(ret.pass);
			var roleCmp = Role.localeCompare(ret.role);
			console.log(roleCmp);
			if (comp != 0 || roleCmp == -1){
				console.log("Incorrect password or role");
				callback(0);
			} else {
				console.log("Password correct");
				callback(1);
			}
		} else {
			callback("User not found");
		}
	} catch (e) {
		console.log(e);
	}
};

const validateUsername = async (username, role, callback) => {
	try {
		const found = await User.findOne({name: username})
		if(found == null) callback(false);
		else if(role === found.role) callback({success: true, hash: found.pass});
		else callback(false);
	} catch (e) {
		console.log(e)
	}
};


module.exports = {
	authenticateUser,
	validateUsername
}
