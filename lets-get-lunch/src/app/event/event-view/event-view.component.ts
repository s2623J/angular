import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events/events.service';
import { Event } from './../../services/events/event';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  event: Event;
  eventId: string;

  constructor(
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.eventId = params['id'];
    this.eventService.get(this.eventId).subscribe(res => {
      this.event = res;
    })
  }

}
