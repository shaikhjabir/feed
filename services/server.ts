/**
 * This will be the starting point of the application.
 */
 import { expressApp } from "../shared/lib/expressApp";
import { sequelize } from "../shared/db/sequelize";
import { logger } from "../shared/lib/logger";
import appRoutes from "./api/index";

// Instantiating the port variable from env if available else 3000
const PORT = process.env.PORT || "3000";
// If sync option is true then synchronizing the database with the models
if (process.env.SYNC === "true") {
  sequelize.sync();
}
// Initializing the Application Routes
appRoutes(expressApp);



// Adding listener to the app
expressApp.listen(parseInt(PORT), () => logger.info(`is listening on port ${PORT}!`));
