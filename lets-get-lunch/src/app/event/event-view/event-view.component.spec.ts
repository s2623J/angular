import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from '../../services/events/events.service';
import { EventModule } from '../event.module';
import { Event } from "../../services/events/event";
import { EventViewComponent } from './event-view.component';

const event: Event = {
  '_id': '5a55135639fbc4ca3ee0ce5a',
  '_creator': '5a550ea739fbc4ca3ee0ce58',
  'title': 'My first event',
  'description': 'My first description',
  'city': 'Atlanta',
  'state': 'GA',
  'startTime': '2018-01-09T19:00:00.000Z',
  'endTime': '2018-01-09T20:00:00.000Z',
  '__v': 0,
  'suggestLocations': true,
  'members': [
    {
      '_id': '5a550ea739fbc4ca3ee0ce58',
      'username': 'newUser',
      '__v': 0,
      'dietPreferences': []
    }
  ]
}

class MockActivatedRoute {
  snapshot = { params: { id: '5a55135639fbc4ca3ee0ce5a' } };
}

class MockEventsService {
  get = jasmine.createSpy('get').and.callFake(() => Observable.of(event));
}

describe('EventViewComponent', () => {
  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;
  let eventService: EventsService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ EventModule ]
    })
    .overrideComponent(EventViewComponent, {
      set: {
        providers: [
          { provide: EventsService, useClass: MockEventsService },
          { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ],
      },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;
    eventService = fixture.debugElement.injector.get(EventsService);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should initialize with a call to get the event details using' + 
  //   ' the active route id', () => {
  //   expect(eventService.get).toHaveBeenCalledWith(event._id);
  // })
});
