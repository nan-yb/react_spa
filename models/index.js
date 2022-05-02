const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Board = require("./board");
const Item = require("./item");
const CodeDetail = require("./codeDetail");
const CodeGroup = require("./codeGroup");

const AccessLog = require("./accessLog");
const ChargeCoinHistory = require("./chargeCoinHistory");
const Member = require("./member");
const MemberAuth = require("./memberAuth");
const Notice = require("./notice");
const PayCoinHistory = require("./payCoinHistory");
const Pds = require("./pds");
const PdsFile = require("./pdsFile");
const PerformanceLog = require("./performanceLog");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Board = Board;
db.Item = Item;
db.CodeDetail = CodeDetail;
db.CodeGroup = CodeGroup;

db.AccessLog = AccessLog;
db.ChargeCoinHistory = ChargeCoinHistory;
db.Member = Member;
db.MemberAuth = MemberAuth;
db.Notice = Notice;
db.PayCoinHistory = PayCoinHistory;
db.Pds = Pds;
db.PdsFile = PdsFile;
db.PerformanceLog = PerformanceLog;

Board.init(sequelize);
Item.init(sequelize);
CodeDetail.init(sequelize);
CodeGroup.init(sequelize);

AccessLog.init(sequelize);
ChargeCoinHistory.init(sequelize);
Member.init(sequelize);
MemberAuth.init(sequelize);
Notice.init(sequelize);
PayCoinHistory.init(sequelize);
Pds.init(sequelize);
PdsFile.init(sequelize);
PerformanceLog.init(sequelize);

// Board.associate(db);

module.exports = db;
