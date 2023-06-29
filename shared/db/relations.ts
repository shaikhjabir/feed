import Permission from "./models/Permission";
import User from "./models/User";



User.hasOne(Permission, { foreignKey: "adminUUID",onDelete:"cascade" })