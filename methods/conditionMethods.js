function addCondition(data, pool, res) {

  pool.query(
    "INSERT INTO Conditions (condition_name) \
    VALUES (?)",
     [data.add_cond]
   )
    .then( confirmation => {
      console.log(confirmation);
      res.render('success');                                 //Confirmation console logginf for debug
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Condition failed with error: " + err);
      res.render('failure');
    });
};

function deleteConditionFromTable(id, pool, res){
  title = "Remove Condition From Table";
  action="/deleteConditionFromTable";
  sqlQuery = "DELETE FROM Conditions WHERE condition_id = ?";
  console.log('inside deleteConditionFromTable and printing id', id);
  pool.query(sqlQuery, id)
    .then( response => {
      res.render('success');
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Delete Condition From Table failed with error: " + err);
      res.render('failure');
    })
  }








function getConditions(data, pool, res) {
  //log data for debug
  console.log('inside viewAllConditions method');
  console.log(data);
  pool.query(
    "SELECT * from Conditions")
    .then( response => {
      console.log(response);    //Confirmation console logging for debug
      let returnData = {};
      let list = [];
      for(var i=0; i<response.length; i++)
      {
        list.push(response[i]);
      }
      returnData.response = list;
      res.render('viewallconditions', returnData);
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Condition failed with error: " + err);
    });

  pool.release;

  //Return failure or success
  return true;

};


function updateConditionFromTable(id, pool, res) {
  title = "Update Condition From Table";
  action = "/updateConditionFromTable";
  console.log('inside updateConditionFromTable and printing id', id);
  let sqlQuery = "SELECT * FROM Conditions WHERE condition_id = ?";

  pool.query(sqlQuery, id)
    .then(response => {

      let condition = response[0];
      res.render('updateConditionFromTable', condition);
    })
    .catch(err => { //Error Catching
      console.log("FAILED: Update Client From Table failed with error: " + err);
      res.render('failure');
    })
}


function updateConditionFromTableDatabase(data, pool, res) {
  title = "Update Condition From Table - Database";
  action = "/updateConditionFromTableDatabase";
  console.log('inside updateconditionfromdatabase');
  console.log('data ', data);
  let query = `UPDATE Conditions SET condition_name = "${data.condition_name}"\
     WHERE condition_id= ${parseInt(data.condition_id)};`;
   pool.query(query)
    .then(response => {
      res.render('success');
    })
    .catch(err => { //Error Catching
      console.log("FAILED: Update Condition From Table Database failed with error: " + err);
      res.render('failure');
    })
}

exports.updateConditionFromTable = updateConditionFromTable;
exports.updateConditionFromTableDatabase = updateConditionFromTableDatabase;

exports.addCondition = addCondition;
exports.deleteConditionFromTable = deleteConditionFromTable;
exports.getConditions = getConditions;
