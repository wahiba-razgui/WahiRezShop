import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductModel} from "../model/product.model";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:3000/api/products';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(AUTH_API, httpOptions);
  }

  public add(title: string, description: string, category: string, price: number, quantity: number): Observable<any> {
    return this.http.post(AUTH_API, {title, description, category, price, quantity}, httpOptions);
  }

  public deleteById(id: string | undefined): Observable<any> {
    return this.http.delete(AUTH_API + `/${id}`, httpOptions);
  }

  public update(id: string | undefined, title: string, description: string, category: string, price: number, quantity: number): Observable<any> {
    return this.http.put(AUTH_API, {
      title,
      description,
      category,
      price,
      quantity,
      _id: id
    }, httpOptions);
  }
}
