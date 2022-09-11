import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Comment } from "./comment";
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let commentService: CommentsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentsService],
      imports: [HttpClientTestingModule]
    })

    commentService = TestBed.get(CommentsService);
    http = TestBed.get(HttpTestingController);
  })

  it('should be created', inject([CommentsService], (commentService: CommentsService) => {
    expect(commentService).toBeTruthy();
  }))

  describe('create', () => {
    it('should return a comment object with valid comment details', () => {
      const comment: Comment = {
        '_creator': '5a550ea739fbc4ca3ee0ce58',
        '_event': '5a55135639fbc4ca3ee0ce5a',
        'content': 'My first comment'
      };
      const commentResponse: Comment = {
        '__v': 0,
        'content': 'My first comment',
        'createdAt': '2018-01-09T19:42:08.048Z',
        '_event': '5a55135639fbc4ca3ee0ce5a',
        '_creator': '5a550ea739fbc4ca3ee0ce58',
        '_id': '5a551b1039fbc4ca3ee0ce5b'
      };
      let response;

      commentService.create(comment).subscribe(res => {
        response = res;
      })

      http
        .expectOne('http://localhost:8080/api/comments')
        .flush(commentResponse);

      expect(response).toEqual(commentResponse);
      http.verify();
    })

    it('should return a 500 if a comment cannot be created', () => {
      const comment: Comment = {
        '_creator': '5a550ea739fbc4ca3ee0ce58',
        '_event': '5a55135639fbc4ca3ee0ce5a',
        'content': undefined
      };
      const commentResponse: string = 'Comment could not be created!';
      let response;

      commentService.create(comment).subscribe(() => {}, err => {
        response = err;
      })

      http
        .expectOne('http://localhost:8080/api/comments')
        .flush(
          {message: commentResponse},
          {status: 500, statusText: 'Server Error'}
        )

      expect(response.error.message).toEqual(commentResponse);
      http.verify();
    })
  })

  describe('getEventComments', () => {
    it('should return an array of comments with a valid event id', () => {
      const id = '5a55135639fbc4ca3ee0ce5a';
      const commentResponse = [
        {
          '_id': '5a551b1039fbc4ca3ee0ce5b',
          'content': 'My first comment',
          'createdAt': '2018-01-09T19:42:08.048Z',
          '_event': '5a55135639fbc4ca3ee0ce5a',
          '_creator': {
            '_id': '5a550ea739fbc4ca3ee0ce58',
            'username': 'newUser',
            '__v': 0,
            'dietPreferences': []
          },
          '__v': 0
        }
      ];
      let response;

      commentService.getEventComments(id).subscribe(res => {
        response = res;
      })

      http
        .expectOne('http://localhost:8080/api/comments/event/' + id)
        .flush(commentResponse);

      expect(response).toEqual(commentResponse);
      http.verify();
    })

    it('should return a 500 if an error occurs', () => {
      const id = '5a55135639fbc4ca3ee0ce5a';
      const commentResponse = 'Something went wrong!';
      let errorResponse;

      commentService.getEventComments(id).subscribe(() => {}, err => {
        errorResponse = err;
      })

      http
        .expectOne('http://localhost:8080/api/comments/event/' + id)
        .flush(
          {message: commentResponse},
          {status: 500, statusText: 'Server Error'}
        )
    })
  })
});
