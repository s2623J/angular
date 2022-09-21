import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { RecommendationsService } from '../services/recommendations/recommendations.service';

import { RecommendationsListComponent } from './recommendations-list.component';

const recommendationsResult = require('../testing/recommendations-result.json');

describe('RecommendationsListComponent', () => {
  let component: RecommendationsListComponent;
  let fixture: ComponentFixture<RecommendationsListComponent>;
  let recommendationsService: RecommendationsService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RecommendationsListComponent ],
      providers: [RecommendationsService]
    })
    .compileComponents();
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsListComponent);
    component = fixture.componentInstance;
    component.eventId = '5a55135639fbc4ca3ee0ce5a';
    recommendationsService = fixture.debugElement.injector.get(RecommendationsService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  describe('with a response of recommendations', () => {
    beforeEach(() => {
      component.suggestLocations = true;
      spyOn(recommendationsService, 'get')
        .and.callFake(() => of(recommendationsResult))
      fixture.detectChanges();
    })

    it('should initialize with a call to the recommendations service', () => {
      expect(recommendationsService.get).toHaveBeenCalled();
    })

    it('should populate the view with a list of recommendations', () => {
      let recommendations: Array<any> = fixture.debugElement.queryAll(By.css('.recommendation'))
      expect(recommendations[0].nativeElement.textContent).toContain('Joe\'s Stone Crab')
    })
  })

  describe('with a response of no recommendations', () => {
    beforeEach(() => {
      component.suggestLocations = true;
      spyOn(recommendationsService, 'get')
        .and.callFake(() => of(null))
      fixture.detectChanges();
    })

    it('should initialize with a call to the recommendations service', () => {
      expect(recommendationsService.get).toHaveBeenCalled();
    })

    it('should display a message that no recommendations exist for this event', () => {
      const error = fixture.debugElement.queryAll(By.css('.alert-danger'));
      expect(error[0].nativeElement.textContent)
        .toEqual('No recommendations for this location exist.')
    })
  })

  describe('with an event that has suggestLocations set to false', async () => {
    let recommendationsView: object;

    beforeEach(() => {
      component.suggestLocations = false;
      spyOn(recommendationsService, 'get')
      fixture.detectChanges();
    })

    it('should not initialize with a call to the recommendations service', () => {
      expect(recommendationsService.get).not.toHaveBeenCalled();
    })

    it('should not display the recommendations view', () => {
      recommendationsView = fixture.debugElement.query(By.css('.recommendations-container'));
      expect(recommendationsView).toBeNull();
    })
  })
})
