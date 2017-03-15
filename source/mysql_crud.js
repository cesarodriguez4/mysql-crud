function all(con, db) {
	connection.query("SELECT * from "+db+" WHERE 1", function(error, rows, fields) {
		if (error) {
			return error;
		} else {
			return rows;
		}
	});
}

function allWRes(con, res, table) {
	var query = "SELECT * FROM `"+table+ "` WHERE 1";
	con.query(query, function(err, row) {
		if (err) {
			res.send(err);
		} else {
			res.send(row);
		}
	});
}

function exist(res, con, table, hash, key) {
	var query = "SELECT * FROM "+ table + " WHERE " + hash + " = " + con.escape(key);
	con.query(query, function(error, rows, fields) {
		if (error) {
			res.send(error);
		} else {
			if (rows.length === 0) {
				console.log(rows.length);
				res.send(false);
			}
			else {
				console.log(rows.length);
				res.send(true);
			}	}
	});
}

function selectWRes(res, con, table, hash,key) {
	var query = "SELECT * FROM "+ table + " WHERE `" + hash + "`= " + con.escape(key);
	con.query(query, function(error, rows, fields) {
		if (error) {
			res.send(error);
		} else {
			res.send(rows);		}
	});
}



function login(res,con, table, email, password) {
	var query = "SELECT * FROM "+ table + " WHERE email = " + con.escape(email) + " AND password = " + con.escape(password);
	console.log(query);
	con.query(query, function(error, rows, fields) {
		if (error) {
			res.send(error);
		} else {
			if (rows.length === 0) {
				res.send(false);
			}
			else {
				res.send(rows);
			}
		}
	});
}


// @array: a collection of properties you want to add in the table
//For example:
//{
//	first_name: 'Cesar',
//  last_name: 'Rodriguez'
//}
//@table: The table in mysql you want to add the data.

function insert(con, array, table) {
	console.log('tipo =>');
	console.log(typeof array);
	if (typeof array == 'string') {
		array = JSON.parse(array);
	}
	console.log('array aqui');
	console.log(array);
	var str = "INSERT INTO `"+ table +"` ( ";	
	var keys = Object.keys(array);

	for ( i = 0; i<keys.length; i++ ) {
		if(i !== keys.length - 1) {
			str+='`';
			str+= keys[i];
			str+='`';
			str+= ',';
		} else {
			str+='`';
			str+= keys[i];
			str+='`';
		}
	}
	str += ')';
	str += ' VALUES (';

	for ( i = 0 ; i < keys.length; i ++ ) {
		if(i !== keys.length - 1) {
			str+="'";
			str+= array[keys[i]];
			str+="'";
			str+= ',';
		} else {
			str+="'";
			str+= array[keys[i]];
			str+="'";
		}
	}

	str+= ' )';
	con.query(str, function(error, rows, fields) {
		if (error) {
			console.log(error);
		} else {
			console.log(rows);
		}
	});
}

function insertWRes(res, con, array, table) {
	var str = "INSERT INTO `"+ table +"` ( ";	
	var keys = Object.keys(array);

	for ( i = 0; i<keys.length; i++ ) {
		if(i !== keys.length - 1) {
			str+='`';
			str+= keys[i];
			str+='`';
			str+= ',';
		} else {
			str+='`';
			str+= keys[i];
			str+='`';
		}
	}
	str += ')';
	str += ' VALUES (';

	for ( i = 0 ; i < keys.length; i ++ ) {
		if(i !== keys.length - 1) {
			str+= con.escape(array[keys[i]]);
			str+= ',';
		} else {
			str+= con.escape(array[keys[i]]);
		}
	}

	str+= ' )';

	con.query(str, function(error, rows, fields) {
		if (error) {
			res.send(error);
		} else {
			res.json("ok");
		}
	});
}

function insertWNoExist(con, array, table) {
	var str = "INSERT INTO `"+ table +"` ( ";	
	var keys = Object.keys(array);
	for ( i = 0; i<keys.length; i++ ) {
		if(i !== keys.length - 1) {
			str+='`';
			str+= keys[i];
			str+='`';
			str+= ',';
		} else {
			str+='`';
			str+= keys[i];
			str+='`';
		}
	}
	str += ')';
	str += ' VALUES (';
	for ( i = 0 ; i < keys.length; i ++ ) {
		if(i !== keys.length - 1) {
			str+= con.escape(array[keys[i]]);
			str+= ',';
		} else {
			str+= con.escape(array[keys[i]]);
		}
	}
	str+= ' )';
}

function deleteAllWhere(con , table, hash, value) {
	query = "DELETE FROM `"+table+"` WHERE `"+hash+"` = " + con.escape(value);
	console.log(query);
	con.query(query, function(error, rows, field) {
		if (error) {
			console.log(error);
		} else {
			console.log(rows);
		}
	});
}

function updateWhere(con, table, hash, key, whash, wkey) {
	var query = "UPDATE `"+table+"` SET `"+hash+"` = "+con.escape(key)+"  WHERE `"+whash+"` = "+con.escape(wkey)+";";
	console.log(query);
	con.query(query, function(error, rows) {
		if (error) {
			console.log(error);
		} else {
			console.log(rows);
		}
	});
}


function updateValuesWhere(con, table, array, whash, wkey) {
	var str = "UPDATE `"+ table +"` SET ";	
	var keys = Object.keys(array);

	for ( i = 0; i<keys.length; i++ ) {
		if(i !== keys.length - 1) {
			str+='`';
			str+= keys[i];
			str+='`';
			str+= " = ";
			str+= "'";
			str += array[keys[i]];
			str += "'"
			str+= ',';
		} else {
			str+='`';
			str+= keys[i];
			str+='`';
			str+= " = ";
			str+= "'";
			str += array[keys[i]];
			str += "'"
		}
	}

	str += " WHERE ";
	str += "`" + whash + "`";
	str += " = ";
	str +=  wkey ;
	
	con.query(str, function(error, row) {
		if (error) {
			console.log(error)
		} else {
			console.log(row);
		}
	})
}

module.exports = {
	all,
	allWRes, 
	selectWRes, 
	login, 
	insertWRes,
	insertWNoExist, 
	exist, 
	distance, 
	deleteAllWhere, 
	insert, 
	updateWhere, 
	updateValuesWhere
};