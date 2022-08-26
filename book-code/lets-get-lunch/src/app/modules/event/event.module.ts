import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventCreateComponent } from 'src/app/components/event-create/event-create.component';


@NgModule({
  declarations: [ EventCreateComponent ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule
  ]
})
export class EventModule { }
