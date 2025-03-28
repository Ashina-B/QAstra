import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
=======

import { UsersService } from './users.service';
>>>>>>> 8b138ea (Completed Registration functionality.)

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
<<<<<<< HEAD
    TestBed.configureTestingModule({ 
      providers: [
        UsersService,
        { provide: HttpClient, useValue: {} },
      ]
    });
=======
    TestBed.configureTestingModule({});
>>>>>>> 8b138ea (Completed Registration functionality.)
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
