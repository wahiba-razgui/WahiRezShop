import {ToolModel} from './tool.model';
import {ProductModel} from './product.model';

export interface TourModel {
  _id?: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  tools?: ToolModel[];
  hotels?: ProductModel[];
}
