const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

//전체 row 갯수
const getTotal = async () => {
  // const getTotal = async function () {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.PTUP}`;
    const [[{ cnt }]] = await db.execute(query);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

// row 존재유무
const getSelectOne = async (id) => {
  // const getTotal = async function () {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.PTUP} WHERE id=?`;
    const values = [id];
    const [[{ cnt }]] = await db.execute(query, values);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

// 페이징으로 가져오기
const getList = async (req) => {
  try {
    // 마지막 id, len 갯수
    const lastId = parseInt(req.query.lastId) || 0;
    const len = parseInt(req.query.len) || 10;

    let where = "";
    if (lastId) {
      // 0은 false
      where = `WHERE id < ${lastId}`;
    }
    const query = `SELECT * FROM ${TABLE.PTUP} ${where} order by id desc limit 0, ${len}`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

const getTimeAverages_A = async () => {
  try {
    const query = `
      SELECT
      AVG(CASE WHEN age >= 0 AND age < 10 AND utilization = 'yes' THEN m ELSE NULL END) AS 0_10,
      AVG(CASE WHEN age >= 10 AND age < 20 AND utilization = 'yes' THEN m ELSE NULL END) AS 10_20,
      AVG(CASE WHEN age >= 20 AND age < 30 AND utilization = 'yes' THEN m ELSE NULL END) AS 20_30,
      AVG(CASE WHEN age >= 30 AND age < 40 AND utilization = 'yes' THEN m ELSE NULL END) AS 30_40,
      AVG(CASE WHEN age >= 40 AND age < 50 AND utilization = 'yes' THEN m ELSE NULL END) AS 40_50,
      AVG(CASE WHEN age >= 50 AND age < 60 AND utilization = 'yes' THEN m ELSE NULL END) AS 50_60,
      AVG(CASE WHEN age >= 60 AND age < 70 AND utilization = 'yes' THEN m ELSE NULL END) AS 60_70,
      AVG(CASE WHEN age >= 70 AND age <= 80 AND utilization = 'yes' THEN m ELSE NULL END) AS 70_80
      FROM ${TABLE.PTUP};
    `;
    const [rows] = await db.execute(query);
    const row = rows[0];
    const formattedRow = Object.entries(row).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = parseFloat(value).toFixed(0) + ' minute';
      }
      return acc;
    }, {});
    return formattedRow;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

const getTimeAverages_G = async () => {
  try {
    const query = `
      SELECT
      AVG(CASE WHEN gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS Male,
      AVG(CASE WHEN gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS Female
      FROM ${TABLE.PTUP};
    `;
    const [rows] = await db.execute(query);
    const row = rows[0];
    const formattedRow = Object.entries(row).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = parseFloat(value).toFixed(0) + ' minute';
      }
      return acc;
    }, {});
    return formattedRow;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

const getTimeAverages_M = async () => {
  try {
    const query = `
      SELECT
        AVG(CASE WHEN age >= 0 AND age < 10 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 00_10,
        AVG(CASE WHEN age >= 10 AND age < 20 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 10_20,
        AVG(CASE WHEN age >= 20 AND age < 30 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 20_30,
        AVG(CASE WHEN age >= 30 AND age < 40 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 30_40,
        AVG(CASE WHEN age >= 40 AND age < 50 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 40_50,
        AVG(CASE WHEN age >= 50 AND age < 60 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 50_60,
        AVG(CASE WHEN age >= 60 AND age < 70 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 60_70,
        AVG(CASE WHEN age >= 70 AND age <= 80 AND gender = 'M' AND utilization = 'yes' THEN m ELSE NULL END) AS 70_80
      FROM ${TABLE.PTUP};
    `;
    const [rows] = await db.execute(query);
    const row = rows[0];
    const formattedRow = Object.entries(row).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = parseFloat(value).toFixed(0) + ' minute';
      }
      return acc;
    }, {});
    return formattedRow;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

const getTimeAverages_F = async () => {
  try {
    const query = `
      SELECT
        AVG(CASE WHEN age >= 0 AND age < 10 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 00_10,
        AVG(CASE WHEN age >= 10 AND age < 20 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 10_20,
        AVG(CASE WHEN age >= 20 AND age < 30 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 20_30,
        AVG(CASE WHEN age >= 30 AND age < 40 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 30_40,
        AVG(CASE WHEN age >= 40 AND age < 50 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 40_50,
        AVG(CASE WHEN age >= 50 AND age < 60 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 50_60,
        AVG(CASE WHEN age >= 60 AND age < 70 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 60_70,
        AVG(CASE WHEN age >= 70 AND age <= 80 AND gender = 'F' AND utilization = 'yes' THEN m ELSE NULL END) AS 70_80
      FROM ${TABLE.PTUP};
    `;
    const [rows] = await db.execute(query);
    const row = rows[0];
    const formattedRow = Object.entries(row).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = parseFloat(value).toFixed(0) + ' minute';
      }
      return acc;
    }, {});
    return formattedRow;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

const getUtilizationRatio_Y = async () => {
  try {
    const query = `
      SELECT
        SUM(utilization = 'yes' AND age >= 0 AND age < 10) / SUM(age >= 0 AND age < 10) * 100 AS 0_10,
        SUM(utilization = 'yes' AND age >= 10 AND age < 20) / SUM(age >= 10 AND age < 20) * 100 AS 10_20,
        SUM(utilization = 'yes' AND age >= 20 AND age < 30) / SUM(age >= 20 AND age < 30) * 100 AS 20_30,
        SUM(utilization = 'yes' AND age >= 30 AND age < 40) / SUM( age >= 30 AND age < 40) * 100 AS 30_40,
        SUM(utilization = 'yes' AND age >= 40 AND age < 50) / SUM(age >= 40 AND age < 50) * 100 AS 40_50,
        SUM(utilization = 'yes' AND age >= 50 AND age < 60) / SUM(age >= 50 AND age < 60) * 100 AS 50_60,
        SUM(utilization = 'yes' AND age >= 60 AND age < 70) / SUM(age >= 60 AND age < 70) * 100 AS 60_70,
        SUM(utilization = 'yes' AND age >= 70 AND age <= 80) / SUM(age >= 70 AND age < 80) * 100 AS 70_80
      FROM ${TABLE.PTUP}
      WHERE 
        age >= 0 AND age <= 80;
    `;
    const [rows] = await db.execute(query);
    const row = rows[0];
    const formattedRow = Object.entries(row).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = parseFloat(value).toFixed(1) + ' %';
      }
      return acc;
    }, {});
    return formattedRow;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

const getUtilizationRatio_N = async () => {
  try {
    const query = `
      SELECT
        SUM(utilization = 'no' AND age >= 0 AND age < 10) / SUM(age >= 0 AND age < 10) * 100 AS 0_10,
        SUM(utilization = 'no' AND age >= 10 AND age < 20) / SUM(age >= 10 AND age < 20) * 100 AS 10_20,
        SUM(utilization = 'no' AND age >= 20 AND age < 30) / SUM(age >= 20 AND age < 30) * 100 AS 20_30,
        SUM(utilization = 'no' AND age >= 30 AND age < 40) / SUM(age >= 30 AND age < 40) * 100 AS 30_40,
        SUM(utilization = 'no' AND age >= 40 AND age < 50) / SUM(age >= 40 AND age < 50) * 100 AS 40_50,
        SUM(utilization = 'no' AND age >= 50 AND age < 60) / SUM(age >= 50 AND age < 60) * 100 AS 50_60,
        SUM(utilization = 'no' AND age >= 60 AND age < 70) / SUM(age >= 60 AND age < 70) * 100 AS 60_70,
        SUM(utilization = 'no' AND age >= 70 AND age <= 80) / SUM(age >= 70 AND age < 80) * 100 AS 70_80
      FROM ${TABLE.PTUP}
      WHERE 
        age >= 0 AND age <= 80;
    `;
    const [rows] = await db.execute(query);
    const row = rows[0];
    const formattedRow = Object.entries(row).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = parseFloat(value).toFixed(1) + ' %';
      }
      return acc;
    }, {});
    return formattedRow;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};



const PTUPController = {
  // create
  create: async (req) => {
    const { age, gender, utilization, M  } = req.body;
    if (isEmpty(age) || isEmpty(gender) || isEmpty(utilization) || isEmpty(M)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }

    try {
      const query = `INSERT INTO PTUP (age, gender, utilization, M) VALUES (?,?,?,?)`;
      const values = [age, gender, utilization, M];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format('LT'),
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  // list
  list: async (req) => {
    // 화살표함수는 es6문법 this접근안됨
    const totalCount = await getTotal();
    const list = await getList(req);
    if (totalCount > 0 && list.length) {
      return resData(
        STATUS.S200.result,
        STATUS.S200.resultDesc,
        moment().format('LT'),
        { totalCount, list }
      );
    } else {
      return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
    }
  },

  ATA: async (req) => {
    try {
      const totalCount = await getTotal();
      const Time_Avg = await getTimeAverages_A();
      if (totalCount > 0 && Time_Avg) {
        const result = { 
                         "Title      ": "Public Transportation Usage Pattern", 
                         "Sub Title  ": "Age_Time_Avg", 
                         "Utilization": "yes",
                         "Age        ": "0 - 80 years old",
                         ...{ Time_Avg }
                        };
        return result  ;
      } else {
        return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  GTA: async (req) => {
    try {
      const totalCount = await getTotal();
      const Time_Avg = await getTimeAverages_G();
      if (totalCount > 0 && Time_Avg) {
        const result = { 
                         "Title      ": "Public Transportation Usage Pattern", 
                         "Sub Title  ": "Gender_Time_Avg", 
                         "Utilization": "yes",
                         "Gender     ": "Male, Female", 
                         ...{ Time_Avg }
                        };
        return result  ;
      } else {
        return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  AGTA_M: async (req) => {
    try {
      const totalCount = await getTotal();
      const Time_Avg = await getTimeAverages_M();
      if (totalCount > 0 && Time_Avg) {
        const result = { 
                         "Title      ": "Public Transportation Usage Pattern", 
                         "Sub Title  ": "Age_Gender_Time_Avg", 
                         "Utilization": "yes",
                         "Age        ": "0 - 80 years old",
                         "Gender     ": "Male", 
                         ...{ Time_Avg }
                        };
        return result  ;
      } else {
        return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  AGTA_F: async (req) => {
    try {
      const totalCount = await getTotal();
      const Time_Avg = await getTimeAverages_F();
      if (totalCount > 0 && Time_Avg) {
        const result = { 
                         "Title      ": "Public Transportation Usage Pattern", 
                         "Sub Title  ": "Age_Gender_Time_Avg", 
                         "Utilization": "yes",
                         "Age        ": "0 - 80 years old",
                         "Gender     ": "Female", 
                         ...{ Time_Avg }
                        };
        return result  ;
      } else {
        return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  AUR_Y: async (req) => {
    try {
      const totalCount = await getTotal();
      const RatioPerson = await getUtilizationRatio_Y();
      if (totalCount > 0 && RatioPerson) {
        const result = { 
                         "Title      ": "Public Transportation Usage Pattern", 
                         "Sub Title  ": "Age_Utilization_Ratio", 
                         "Utilization": "yes",
                         "Age        ": "0 - 80 years old",
                         ...{ RatioPerson }
                        };
        return result  ;
      } else {
        return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  AUR_N: async (req) => {
    try {
      const totalCount = await getTotal();
      const RatioPerson = await getUtilizationRatio_N();
      if (totalCount > 0 && RatioPerson) {
        const result = { 
                         "Title      ": "Public Transportation Usage Pattern", 
                         "Sub Title  ": "Age_Utilization_Ratio", 
                         "Utilization": "no",
                         "Age        ": "0 - 80 years old",
                         ...{ RatioPerson }
                        };
        return result  ;
      } else {
        return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  //update
  update: async (req) => {
    const { id } = req.params; // url /로 들어오는것
    const { age, gender, utilization, M } = req.body;
    if (isEmpty(id) || isEmpty(age) || isEmpty(gender) || isEmpty(utilization) || isEmpty(M)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }

    try {
      const query = `UPDATE ${TABLE.PTUP} SET age =?, gender =?, utilization =?, M =? WHERE id= ?`;
      const values = [age, gender, utilization, M , id];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format('LT')
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  //delete
  delete: async (req) => {
    const { id } = req.params; // url /로 들어오는것
    if (isEmpty(id)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }
    const cnt = await getSelectOne(id);
    try {
      if (!cnt) {
        return resData(
          STATUS.E100.result,
          STATUS.E100.resultDesc,
          moment().format('LT')
        );
      }
      const query = `DELETE FROM ${TABLE.PTUP} WHERE id = ?;`;
      const values = [id];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format('LT')
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
    return rows;
  }
  

};

module.exports = PTUPController;
