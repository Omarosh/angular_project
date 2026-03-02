import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICat } from '../types/icat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatDataService {

  private apiUrl = "http://localhost:3000/cats";

  constructor(private http: HttpClient) { }

  getAllCats(): Observable<ICat[]> {
    return this.http.get<ICat[]>(this.apiUrl);
  }

  getAllCatsPromise(): Promise<ICat[]> {
    return fetch(this.apiUrl).then(response => response.json());
  }

  getCatById(id: number): Observable<ICat> {
    return this.http.get<ICat>(`${this.apiUrl}/${id}`);
  }
  postCat(cat: ICat): Observable<ICat> {
    return this.http.post<ICat>(this.apiUrl, cat);
  }
}
