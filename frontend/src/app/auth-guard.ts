import {CanActivateFn, GuardResult, RedirectCommand, Router} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {validate} from 'uuid';
import {LOC_STORAGE_ELECTION_UUID, LOC_STORAGE_GROUP_UUID, PARAM_TOKEN} from './shared/constants';
import {NAV_UNAUTHORIZED} from './app.routes';

@Injectable({ providedIn: 'root' })
class AuthService {
  authenticate(tokenParam: string): Observable<false | { electionUuid: string, localGroupUuid: string }> {
    let token: { token: string, election: string, group: string };
    try {
      token = JSON.parse(atob(tokenParam));
    } catch (e) {
      return of(false);
    }
    // TODO do real auth with backend
    if(token && token.token && validate(token.election) && validate(token.group)) {
      return of({ electionUuid: token.election, localGroupUuid: token.group });
    }
    return of(false);
  }
}

export const authGuard: CanActivateFn = (route, state): Observable<GuardResult> => {
  const router = inject(Router);
  return inject(AuthService).authenticate(route.queryParams[PARAM_TOKEN]).pipe(
    map(res => {
      if(!res) {
        return new RedirectCommand(router.parseUrl(NAV_UNAUTHORIZED), { replaceUrl: true });
      }
      localStorage.setItem(LOC_STORAGE_ELECTION_UUID, res.electionUuid);
      localStorage.setItem(LOC_STORAGE_GROUP_UUID, res.localGroupUuid);
      return true;
    }));
};
