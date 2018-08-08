import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoadHeroes } from './../../state/heroes/heroes.actions';
import { Hero } from '../../models/hero';
import { HeroesState, getAllHeroes } from '../../state/heroes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Observable<Hero[]>;

  constructor(private store: Store<HeroesState>) { }

  ngOnInit() {
    this.heroes = this.store.select(getAllHeroes);
    this.store.dispatch(new LoadHeroes());
  }
}
