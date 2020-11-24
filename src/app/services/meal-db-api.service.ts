import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // https://www.learnrxjs.io/
import { MEALDB_ListItem, MEALDB_Meal, MEALDB_Category } from '../model';

const MEALDB_API = {
  ROOT: "https://www.themealdb.com/api/json/v1/1/",
  get FILTER() { // get meals list by categories
    return this.ROOT + "filter.php?c=";
  },
  get LOOKUP() { // get meal info of identified meal
    return this.ROOT + "lookup.php?i="
  },
  get CAT() {
    return this.ROOT + "categories.php";
  }
}

@Injectable({
  providedIn: 'root'
})
export class MealDbApiService {

  constructor(private http: HttpClient) { }

  getMealsByCategory(category: string): Observable<MEALDB_ListItem[]> {
    // https://www.learnrxjs.io/ pour + infos sur pipe etc.
    return this.http
      .get(`${MEALDB_API.FILTER}${category}`)
      .pipe(
        map((res: any) => res.meals) // on renvoit un tableau
      );
  }

  getMealById(id: string): Observable<MEALDB_Meal> {
    return this.http
      .get(MEALDB_API.LOOKUP + id)
      .pipe(
        map((res :any) => res.meals[0]) // return obj : MEALDB_Meal
      );
  }

  getMealCat(): Observable<any> {
    return this.http
      .get(MEALDB_API.CAT)
      .pipe(
        map((res: any) => res.categories)
      );
  }
}
