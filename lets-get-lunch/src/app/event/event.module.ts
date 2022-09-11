import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { EventRoutingModule } from './event-routing.module';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventsService } from '../services/events/events.service';
import { EventViewComponent } from './event-view/event-view.component';
import { CommentCreateModule } from '../comment-create/comment-create.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommentCreateModule,
    FormsModule
  ],
  declarations: [
    EventCreateComponent,
    EventViewComponent
  ],
  providers: [EventsService]
})
export class EventModule { }
