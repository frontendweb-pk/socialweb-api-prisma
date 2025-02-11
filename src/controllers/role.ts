import { Request, Response, NextFunction } from "express";
import { roleService } from "../services/role";
import { logger } from "../lib/logger";

/**
 * Get roles
 */
const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;
    const page = isNaN(Number(query.page)) ? 1 : Number(query.page);
    logger.info(query);
    logger.info(page);

    const roles = await roleService.getRoles();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new role
 * @param req
 * @param res
 * @param next
 */
const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role_name, permissions } = req.body;
    const role = await roleService.createRole({ role_name, permissions });
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

/**
 * Update role
 * @param req
 * @param res
 * @param next
 */
const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role_id } = req.params;
    const { permissions } = req.body;
    const role = await roleService.updatePermissions({
      role_id: +role_id,
      permissions,
    });
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete role
 * @param req
 * @param res
 * @param next
 */
const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role_id } = req.params;
    await roleService.deleteRole(+role_id);

    res.status(200).json({
      role_id,
    });
  } catch (error) {
    next(error);
  }
};

export { getRoles, createRole, updateRole, deleteRole };
