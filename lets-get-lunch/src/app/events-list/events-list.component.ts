import { Component, OnInit } from '@angular/core';
import { Event } from "../services/events/event";
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: Array<Event>;
  errorMessage: string;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.all().subscribe(res => {
      this.events = res;
      this.errorMessage = '';
    }, err => {
      this.errorMessage = err.error.message;
    })
  }

}
