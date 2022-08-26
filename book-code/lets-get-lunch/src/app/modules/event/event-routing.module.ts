import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from 'src/app/components/event-create/event-create.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
  {path: '', component: EventCreateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
