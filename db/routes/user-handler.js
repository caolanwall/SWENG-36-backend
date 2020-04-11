const path = require('path')

const User = require(path.join(__dirname, '..', 'models', 'user-model.js'))

const createNewUser = async ( userName, Pass, Modules, Role, callback) => {
	try {
		const user = new User({
			name: userName,
			pass: Pass,
			modules: Modules,
			role: Role,
		});
		user
			.save()
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			});
		callback(user);
	} catch (e) {
		console.log(e);
	}
};

//works
const updateUser = async ( userName, Id, Pass, Modules, Role, callback) => {
	try {
		const dummy = await User.updateOne({"_id": Id }, {$set:
			{
				"name": userName,
				"pass": Pass,
				"modules": Modules,
				"role": Role,
			}
		});
		const ret = await User.find({"_id": Id});
		callback(ret);
	} catch (e) {
		console.log(e);
	}
};

const addModuleToUser = async (id, module, callback) => {
	try {
		const ret = await User.findOne({ _id :id });
		if (ret != null){
			console.log(ret);
			const data = new User(ret);
			data.modules.push(module);
			data
				.save()
				.then(result => {
					console.log(result);
				})
				.catch(err => {
					console.log(err);
				});
			callback(data);
		} else {
			callback("User not found");
		}
	} catch (e) {
		error();
	}
};

const removeModuleUser = async (id, module, callback) => {
	try {
		const ret = await User.findOne({ _id :id });
		if (ret != null){
			console.log(ret);
			const data = new User(ret);
			for( var i = 0; i < data.modules.length; i++){
				console.log(data.modules[i])
				if ( data.modules[i] === module) {
					data.modules.splice(i, 1);
				}
			}
			data
				.save()
				.then(result => {
					console.log(result);
				})
				.catch(err => {
					console.log(err);
				});
			callback(data);
		} else {
			callback("User not found");
		}
	} catch (e) {
		error();
	}
};

//works
const getUserById = async (id, callback) => {
	try {
		const ret = await User.find({ "_id":id });
		callback(ret);
	} catch (e) {
		callback({})
		console.log(e)
	}
};

const getUserByRole = async (role, callback) => {
	try {
		const ret = await User.find({ "role":role });
		callback(ret);
	} catch (e) {
		callback({})
		console.log(e)
	}
};

const getUserByModule = async (module, callback) => {
	try {
		const ret = await User.find().where('modules').in(
		[module]).exec();
		callback(ret);
	} catch (e) {
		callback({})
		console.log(e)
	}
};

//TODO:returned empty array
const getUser = async (callback) => {
	try {
		const ret = await json(User.find({}));
		callback(ret);
	} catch (e) {
		error();
	}
};

//works
const deleteUser = async (id, callback)=>{
	try{
		const ret = await User.deleteOne({ "_id": id});
		callback(ret);
	}catch(e){
		callback(e);
	}
}

module.exports = {
	createNewUser: createNewUser,
	updateUser: updateUser,
	getUser: getUser,
	getUserById: getUserById,
	getUserByRole: getUserByRole,
	getUserByModule: getUserByModule,
	deleteUser:deleteUser,
	addModuleToUser: addModuleToUser,
	removeModuleUser: removeModuleUser
};
