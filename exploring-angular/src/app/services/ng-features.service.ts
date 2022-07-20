import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgFeaturesService {

  constructor() { }

  getFeatures() {
    return [
      {'name':  'Components'},
      {'name':  'Services'},
      {'name':  'Directives'},
      {'name':  'Pipes'}
    ]
  }
}
