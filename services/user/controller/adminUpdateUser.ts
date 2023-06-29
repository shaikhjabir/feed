import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";
import { Permission, User } from "../../../shared/db/models";
import { NOT_ADMIN_EMAIL, SUPER_ADMIN_CAN_CHANGE_PERMISSION } from "../../../shared/constants/httpErrorMessages";
import { HttpBadRequest } from "../../../shared/lib/exceptions/HttpBadRequest";
import { IAdminUpdateUser } from "../interfaces/ICreateUser copy";

export const adminUpdateUser = async (params: IControllerParams<IAdminUpdateUser>) => {
  const transaction = params.transaction;

  // check token type is from super admin or not
  if (params.user.role !== "Super Admin")
    throw new HttpBadRequest(SUPER_ADMIN_CAN_CHANGE_PERMISSION)

  // checking admin type of not
  const user = await User.findOne({
    where: {
      email: params.input.email
    }
  })
  if (user && user.role !== 'Admin')
    throw new HttpBadRequest(NOT_ADMIN_EMAIL)

  await Permission.update({
    adminUUID: user.UUID,
    canDeleteFeed: params.input.canDeleteFeed
  }, {
    where: {
      adminUUID: user.UUID
    },
    transaction
  })


  await transaction.commit();

  return {
    message: SUCCESSFUL
  };
};
