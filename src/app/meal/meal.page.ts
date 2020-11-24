import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MEALDB_Meal } from '../model';
import { MealDbApiService } from '../services/meal-db-api.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  mealId :string;
  meal$ :Observable<MEALDB_Meal>; //$ convention pour indiquer que var contient obsevable
  ingredients: string[];
  mesures: string[];


  constructor(
    private route: ActivatedRoute,
    private mealdb: MealDbApiService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.mealId = this.route.snapshot.paramMap.get("id"); // get id parameter from url

    this.meal$ = this.mealdb
      .getMealById(this.mealId)
      .pipe(
        tap((meal: MEALDB_Meal) => {
          this.ingredients = this.getIngredientsArray(meal);
          this.mesures = this.getMesuresArray(meal);
        })
      );
  }

  getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl {
    let id = meal.strYoutube.split('=')[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/" + id
    );
  }

  private getIngredientsArray(meal:MEALDB_Meal): string[] {
    let result: string[] = [];
    for (let i=1; i<=20; i++) {
      let value :string = meal["strIngredient" + i];
      if (value != "") result.push(value);
    }
    return result;
  }

  private getMesuresArray(meal:MEALDB_Meal): string[] {
    let result: string[] = [];
    for (let i=1; i<=20; i++) {
      let value :string = meal["strMeasure1" + i];
      if (value != "") result.push(value);
    }
    return result;
  }

}
