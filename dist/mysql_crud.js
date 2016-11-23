
function all(con, db) {
	con.connect();
	connection.query("SELECT * from "+db+" WHERE 1", function(error, rows, fields) {
		if (error) {
			return error;
		} else {
			return rows;
		}
	});
	con.end();
}

function selectSimple(con, table, hash, key) {
	con.connect();
	con.query("SELECT * FROM "+ table + " WHERE " + hash + "=" + key, function(error, rows, fields) {
		if (error) {
			return error;
		} else {
			return rows;		}
	});
	con.end();
}

function login(con, table, username, password) {
	var query = "SELECT * FROM "+ table + " WHERE username = '" + username + "' AND password = '" + password+ "'";
	console.log(query);
	con.query(query, function(error, rows, fields) {
		if (error) {
			res.send(error);
		} else {
			if (rows.length === 0) {
				console.log(rows.length);
				return false;
			}
			else {
				console.log(rows.length);
				return true;
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
			return error
		} else {
			return rows;
		}
	});
}

function showTables(con) {
	console.log("Hello!");
}

module.exports = {
	all, 
	selectSimple, 
	login, 
	insert, 
	showTables
};