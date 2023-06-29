import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { ICreateUser } from "../interfaces/ICreateUser";
import { Permission, User } from "../../../shared/db/models";
import { SUPER_ADMIN_EXISTS, USER_EXISTS } from "../../../shared/constants/httpErrorMessages";
import { HttpBadRequest } from "../../../shared/lib/exceptions/HttpBadRequest";
import { generateSha256Password } from "../../../shared/helpers/generateSha256Password";

export const createUser = async (params: IControllerParams<ICreateUser>) => {
  const transaction = params.transaction;


  const superAdminRole: string = "Super Admin";
  const adminRole: string = "Admin";

  // check user permissions to create a new user
  if (params.user.role === "Basic") {
    throw new HttpBadRequest("Basic user not allowed to create user")
  }
  if (params.user.role === adminRole && params.input.role === superAdminRole) {
    throw new HttpBadRequest("Admin can't create super admin")
  }
  if (params.user.role === adminRole && params.input.role === "Admin") {
    throw new HttpBadRequest("Admin can't create admin")
  }
  if (params.user.role === adminRole && params.input.role === superAdminRole) {
    throw new HttpBadRequest("Admin can't create super admin")
  }

  // checking for existing super admin already there or not
  if (params.input.role === superAdminRole) {
    const superAdmin = await User.findOne({
      where: {
        role: superAdminRole
      }
    })
    if (superAdmin)
      throw new HttpBadRequest(SUPER_ADMIN_EXISTS)
  }

  // checking user exists or not
  const existsUser = await User.findOne({
    where: {
      email: params.input.email
    }
  })
  if (existsUser)
    throw new HttpBadRequest(USER_EXISTS)

  // creating user
  const user: User = await User.create(
    {
      ...params.input, password: generateSha256Password(params.input.password)
    }, { transaction })

  if (params.input.role === "Admin") {
    await Permission.create({
      adminUUID: user.UUID,
      canDeleteFeed: false
    }, {
      transaction
    })
  }

  await transaction.commit();

  return {
    message: SUCCESSFUL
  };
};
