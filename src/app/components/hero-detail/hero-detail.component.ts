import { tap, switchMap } from 'rxjs/operators';
import { SelectHero, UpdateHero } from './../../state/heroes/heroes.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';
import { HeroesState, getSelectedHero } from '../../state/heroes';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<HeroesState>
  ) { }

  ngOnInit() {
    this.hero = this.route.paramMap.pipe(
      tap(paramMap => this.store.dispatch(new SelectHero({id: Number(paramMap.get('id'))}))),
      switchMap(() => this.store.select(getSelectedHero))
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.store.dispatch(new UpdateHero(hero));
  }
}
