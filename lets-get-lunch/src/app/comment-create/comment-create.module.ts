import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentCreateComponent } from './comment-create.component';
import { CommentsService } from '../services/comments/comments.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CommentCreateComponent],
  exports: [CommentCreateComponent],
  providers: [CommentsService]
})
export class CommentCreateModule { } 