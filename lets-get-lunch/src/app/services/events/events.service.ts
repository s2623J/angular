import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Event } from "./event";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { format } from "date-fns";

@Injectable()
export class EventsService {
  constructor(private http: HttpClient) {}

  create(event: Event): Observable<Event> {
    return this.http.post<Event>("http://localhost:8080/api/events", event);
  }

  getUserEvents(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(
      "http://localhost:8080/api/events/user/" + userId
    );
  }

  get(userId: string): Observable<Event> {
    return this.http
      .get<Event>("http://localhost:8080/api/events/" + userId)
      .map((res: Event) => this.formatDateTime(res));
  }

  formatDateTime(event: Event): Event {
    event.displayStart = format(event.startTime, "dddd MMM, Do - h:mm A");
    event.displayEnd = format(event.endTime, "dddd MMM, Do - h:mm A");
    return event;
  }

  /**
   * Returns an Observable array of all Events
   */
  all(): Observable<Event[]> {
    return this.http.get<Event[]>("http://localhost:8080/api/events");
  }
}