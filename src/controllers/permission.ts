import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma-client";
import { BadRequestError } from "../lib/errors";

/**
 * Get all permissions
 * @param req
 * @param res
 * @param next
 */
export const getAllPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
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
