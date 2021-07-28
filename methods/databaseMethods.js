const mariadb = require('mariadb');
var dbconn = require('./dbconn.json');

function returnPool() {
  pool = mariadb.createPool({
    host: dbconn.host,
    user: dbconn.user,
    password: dbconn.password,
    database: dbconn.database,
    connectionLimit: 5,
    multipleStatements: true
  })
  return pool;
};

function multipleRecords(res, action, data) {
  val = [];
  for (let i = 0; i < res.length; i++) {
    val.push({
      value: res[i]
    });
  }
  returnData = {
    keys: Object.keys(res[0]),
    values: val,
    consultations: 0,
    action: action,
    supplements: 0,
    articles: 0,
    date: 0,
    time: 0,
    time_frame: 0,
    radio_client: 0,
    cosnultation_id: 0
  };

  if (data["consultations"]) {
    let consulData = data["consultations"];
    returnData.consultations = consulData;
  }

  if (data["supplements"]) {
    let suppData = data["supplements"];
    returnData.supplements = suppData;
  }

  if (data["articles"]) {
    let articleData = data["articles"];
    returnData.articles = articleData;
  }

  if (data["date"]) {
    let dateData = data["date"];
    returnData.date = dateData;
  }

  if (data["time"]) {
    let timeData = data["time"];
    returnData.time = timeData;
  }

  if (data["time_frame"]) {
    let timeFData = data["time_frame"];
    returnData.time_frame = timeFData;
  }

  if (data["radio_client"]) {
    let radioData = data["radio_client"];
    returnData.radio_client = radioData;
  }

  if (data["Consultation ID"]) {
    let conData = data["Consultation ID"];
    returnData.consultation_id = conData;
  }

  return returnData;
};


function multipleNameRecords(res, action, data) {
  val = [];
  for (let i = 0; i < res.length; i++) {
    val.push({
      value: res[i]
    });
  }
  returnData = {
    name: res[0]['First Name'] + " " + res[0]['Last Name'],
    keys: Object.keys(res[0]),
    values: val,
    consultations: 0,
    action: action,
    supplements: 0,
    articles: 0,
    date: 0,
    time: 0,
    time_frame: 0,
    radio_client: 0,
    cosnultation_id: 0
  };

  if (data["consultations"]) {
    let consulData = data["consultations"];
    returnData.consultations = consulData;
  }

  if (data["supplements"]) {
    let suppData = data["supplements"];
    returnData.supplements = suppData;
  }

  if (data["articles"]) {
    let articleData = data["articles"];
    returnData.articles = articleData;
  }

  if (data["date"]) {
    let dateData = data["date"];
    returnData.date = dateData;
  }

  if (data["time"]) {
    let timeData = data["time"];
    returnData.time = timeData;
  }

  if (data["time_frame"]) {
    let timeFData = data["time_frame"];
    returnData.time_frame = timeFData;
  }

  if (data["radio_client"]) {
    let radioData = data["radio_client"];
    returnData.radio_client = radioData;
  }

  if (data["Consultation ID"]) {
    let conData = data["Consultation ID"];
    returnData.consultation_id = conData;
  }

  return returnData;
};

function singleRecord(res, title) {
  val = [];
  for (let i = 0; i < res.length; i++) {
    val.push({
      value: Object.values(res[i])
    });
  }
  returnData = {
    title: title,
    keys: Object.keys(res[0]),
    values: val
  };
  return returnData;
};

async function condList(pool, params) {
  //Function to return a condition list based on params
  //Build Query string
  sqlQuery = "";
  searchList = [];

  if (params.inner_client_list) {
    sqlQuery += "SELECT condition_id, condition_name\
    FROM Conditions\
    JOIN Clients_Conditions\
    USING (condition_id)\
    WHERE client_id = ?;"

    searchList.push(params.client_id)
  }

  if (params.outer_client_list) {
    sqlQuery += "SELECT DISTINCT c.condition_id, c.condition_name\
    FROM Conditions c\
    LEFT JOIN (SELECT client_id, condition_id\
    FROM Clients_Conditions\
    WHERE client_id = ?) cc\
    ON (c.condition_id = cc.condition_id)\
    WHERE cc.client_id IS NULL;"

    searchList.push(params.client_id)
  }

  if (params.full_list) {
    sqlQuery += "SELECT *\
    FROM Conditions;"
  }

  return pool.query(
    sqlQuery,
    searchList
  )

}

async function nameRecords(pool, data) {
  //First call to check # of name Records
  console.log(data);
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  return pool.query(
    sqlQuery,
    [data.fname, data.lname, data.client_id]
  );
}




exports.returnPool = returnPool;
exports.multipleNameRecords = multipleNameRecords;
exports.singleRecord = singleRecord;
exports.condList = condList;
exports.nameRecords = nameRecords;
exports.multipleRecords = multipleRecords;
