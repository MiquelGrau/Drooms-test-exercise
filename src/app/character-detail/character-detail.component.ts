import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as charactersActions from '../store/characters/characters.actions';
import * as charactersSelectors from '../store/characters/characters.selectors';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent {
  character$ = this.store.select(charactersSelectors.selectCurrentCharacter);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
  }
}
