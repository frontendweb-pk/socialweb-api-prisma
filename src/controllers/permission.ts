import { NextFunction, Request, Response } from "express";

import { BadRequestError } from "../lib/errors";
import prisma from "../lib/prisma-client";
import { addPermissions } from "../services/permission";

/**
 * Get all permissions
 * @param req
 * @param res
 * @param next
 */
export const getAllPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const permissions = await prisma.permission.findMany();
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};

/**
 * Add new permission
 * @param req
 * @param res
 * @param next
 */
export const createPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { permission } = req.body;

    const isPermission = await prisma.permission.findUnique({
      where: { permission },
    });

    if (isPermission) {
      throw new BadRequestError("Permission is already existed!");
    }

    const newPermission = await prisma.permission.create({
      data: { permission },
    });

    res.status(201).json(newPermission);
  } catch (error) {
    next(error);
  }
};

/**
 * Create permissions
 * @param req
 * @param res
 * @param next
 */

export const createPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const permissions = await addPermissions(req.body);
    res.status(201).json(permissions);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete permission
 * @param req
 * @param res
 * @param next
 */
export const deletePermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { permission_id } = req.params;

  try {
    const isPermission = await prisma.permission.delete({
      where: { permission_id: +permission_id },
    });

    res.status(201).json({
      permission_id,
    });
  } catch (error) {
    next(error);
  }
};
