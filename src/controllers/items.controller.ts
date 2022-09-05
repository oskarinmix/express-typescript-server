import { Request, Response } from "express";

import { Item } from "../services/items.services";
import { handleError } from "../utils/error.handle";

/**
 * This function gets all items from the database and returns them in a JSON response.
 * @param {Request} req - Request - this is the request object that is passed to the function.
 * @param {Response} res - Response - this is the response object that will be returned to the client
 * @returns a promise.
 */
const getItems = async (req: Request, res: Response) => {
  try {
    const resp = await Item.getAllItems();
    return res.status(200).json(resp);
  } catch (e) {
    return handleError(res, "ERROR_GET_ITEMS", e);
  }
};
/**
 * This function gets an item by its id and returns it as a json object.
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @returns a function.
 */
const getItemById = async (req: Request, res: Response) => {
  try {
    const resp = await Item.getItemById(req.params.id);
    return res.status(200).json(resp);
  } catch (e) {
    return handleError(res, "ERROR_GET_BY_ID_ITEM", e);
  }
};
/**
 * It creates an item.
 * @param {Request} req - Request - this is the request object that is passed to the function.
 * @param {Response} res - Response - this is the response object that will be returned to the client
 * @returns a function.
 */
const createItem = async (req: Request, res: Response) => {
  try {
    const resp = await Item.insertItem(req.body);
    return res.status(201).json(resp);
  } catch (e) {
    return handleError(res, "ERROR_CREATE_ITEM", e);
  }
};
/**
 * This function updates an item in the database and returns the updated item.
 * @param {Request} req - Request - this is the request object that is passed to the function.
 * @param {Response} res - Response - this is the response object that will be returned to the client
 * @returns The response from the database.
 */
const updateItem = async (req: Request, res: Response) => {
  try {
    const resp = await Item.updateItem(req.params.id, req.body);
    return res.status(201).json(resp);
  } catch (e) {
    handleError(res, "ERROR_UPDATE_ITEM", e);
  }
};
/**
 * This function deletes an item from the database and returns a response to the client.
 * @param {Request} req - Request - this is the request object that is passed to the function.
 * @param {Response} res - Response - this is the response object that will be returned to the client
 * @returns The response from the database.
 */
const deleteItem = async (req: Request, res: Response) => {
  try {
    const resp = await Item.deleteItem(req.params.id);
    return res.status(201).json(resp);
  } catch (e) {
    handleError(res, "ERROR_DELETE_ITEM", e);
  }
};

export { getItems, getItemById, createItem, updateItem, deleteItem };
