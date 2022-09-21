import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  const recommendationsResult = require('../../testing/recommendations-result.json');
  let service: RecommendationsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecommendationsService]
    })
    service = TestBed.get(RecommendationsService);
    http = TestBed.get(HttpTestingController);
  })

  it('should be created', inject([RecommendationsService], (service: RecommendationsService) => {
    expect(service).toBeTruthy();
  }))

  describe('get', () => {
    it('should return a list of valid recommendations with a valid event id', () => {
      const eventId = '5a55135639fbc4ca3ee0ce5a';
      let response;

      service.get(eventId).subscribe(res => {
        response = res;
      })

      http
        .expectOne('http://localhost:8080/api/recommendations/' + eventId)
        .flush(recommendationsResult)
      expect(response).toEqual(recommendationsResult);
      http.verify();
    })

    it('should return a 500 if an error occurs', () => {
      const eventId = '5a55135639fbc4ca3ee0ce5a';
      const error = 'Something went wrong!';
      let errorResponse;

      service.get(eventId).subscribe(() => {}, err => {
        errorResponse = err;
      })

      http
        .expectOne('http://localhost:8080/api/recommendations/' + eventId)
        .flush({message: error}, {status: 500, statusText: 'Server Error'});
      expect(errorResponse.error.message).toEqual(error);
      http.verify();
    })
  })
})
