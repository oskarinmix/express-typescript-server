import { Car } from "../interfaces/car.interface";
import ItemModel from "../models/item.model";
import { ObjectId } from "mongoose";

export class Item {
  constructor(
    public id: ObjectId,
    public name: string,
    public make: string,
    public model: string,
    public year: number,
    public color: string,
    public price: number,
    public gas: string
  ) {
    this.id = id;
    this.name = name;
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.price = price;
    this.gas = gas;
  }
  static async insertItem(item: Car): Promise<Car> {
    const newItem = await ItemModel.create(item);
    return newItem;
  }
  static async getAllItems(): Promise<Car[]> {
    const items = await ItemModel.find();
    return items;
  }
  static async getItemById(id: string): Promise<any> {
    const item = await ItemModel.findById(id);
    if (!item) throw new Error("Item not found");
    return item;
  }
  static async updateItem(id: string, item: Car): Promise<any> {
    const updatedItem = await ItemModel.findByIdAndUpdate(id, item, {
      new: true,
    });
    return updatedItem;
  }
  static async deleteItem(id: string): Promise<any> {
    const deleted = await ItemModel.findByIdAndDelete(id, {
      new: true,
    });
    return deleted;
  }
}
