import {Component} from '@angular/core';

@Component( {
  selector: 'app-unauthorized',
  template: `
    <h1>Nicht wahlberechtigt</h1>
    <p>
      Du hast die Wahl-App über eine nicht signierte URL aufgerufen. Wenn du an der Wahl teilnehmen möchtest,
      wende dich bitte an deine Koordi-Person
    </p>
  `
})
export class UnauthorizedComponent {}
