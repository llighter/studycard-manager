import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
    , public db: DbService
    , public auth: AuthService
  ) { }

  decks;

  deckId;

  ngOnInit(): void {
    this.decks = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('decks', ref =>
          ref
            .where('uid', '==', user.uid)
            .orderBy('createdDate', 'desc')
        )
      ),
      shareReplay(1)
    );
  }

  trackById(idx, deck) {
   return deck.id;   
  }

  setDeckId(id) {
    this.deckId = id;
  }

}
