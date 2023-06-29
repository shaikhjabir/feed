import { Feed } from "./models";
import Permission from "./models/Permission";
import User from "./models/User";
import UserAndFeedConnection from "./models/UserAndFeedConnection";



User.hasOne(Permission, { foreignKey: "adminUUID", onDelete: "cascade" })
User.belongsToMany(Feed, {
    through: UserAndFeedConnection,
    foreignKey: "userUUID",
    otherKey: "feedUUID"
})