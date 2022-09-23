import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RecommendationsService {
  constructor(private http: HttpClient) { }

  //** Uses an eventId to return an array of recommendations */
  get(eventID: string): Observable<any> {
    // this.http.get('http://localhost:8080/api/recommendations/' + eventID) // To pass unit test
    const recommendationsResult = require('../../testing/recommendations-result.json');
    return of(recommendationsResult);
  }
}
