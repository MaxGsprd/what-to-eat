import { Component } from '@angular/core';
import { MEALDB_ListItem, MEALDB_Category} from '../model';
import { MealDbApiService } from '../services/meal-db-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  mealCat :MEALDB_Category[] = [];
  selectedCat: string;
  meals :MEALDB_ListItem[] | null = null;

  constructor(private mealDb: MealDbApiService) {
    this.loadCat();
  }

  loadCat() {
    this.mealDb.getMealCat().subscribe( categories => {
      // console.log(categories);
      for (let i=0; i<categories.length; i++) {
        this.mealCat.push(categories[i].strCategory);
      }
      console.log(this.mealCat);
      return this.mealCat;
    });
  }

  loadData(){
    this.mealDb.getMealsByCategory(this.selectedCat)
      .subscribe((meals :MEALDB_ListItem[]) => {
        this.meals = meals;
      })
  }
}
