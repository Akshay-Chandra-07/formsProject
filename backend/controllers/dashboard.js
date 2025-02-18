const Users = require("../models/users");
const ExcelJs = require('exceljs')


exports.users = async (req, res) => {
  console.log("dashboard users")
  try {
    const users = await Users.query().select(
      "id",
      "name",
      "email",
      "username",
      "role",
    );
    res.status(200).json(users);
  } catch (error) {
    next(error); //global error handler
  }
};


exports.downloadExcel = async (req,res)=>{
  try{
    const data = await Users.query().select("id","username","name","email","role")
    const newExcel = new ExcelJs.Workbook()
    const newSheet = newExcel.addWorksheet('users')
    newSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Username', key: 'username', width: 20 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Role', key: 'role', width: 15 },
    ];
    newSheet.addRows(data)

    res.setHeader(
      "content-disposition","attachment; filename='database users.xlsx'"
    )

    res.setHeader(
      "content-type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    await newExcel.xlsx.write(res)
    res.end()
  }catch(error){
    console.log(error);
    res.status(400).json({msg:"Error downloading excel file"})
  }
}

