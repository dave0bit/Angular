import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatSnackBar } from '@angular/material';

import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    displayedColumns: string[] = ['created', 'state', 'number', 'title'];
    customerDb: HttpDao | null;
    data: DbHubIssue[] = [];
  
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(
      private http: HttpClient,
      public snackBar: MatSnackBar
    ) 
    { }
  
    ngOnInit() {
      this.customerDb = new HttpDao(this.http);
  
      // If the user changes the sort order, reset back to the first page.
      //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.customerDb!.getRepoIssues(this.sort.active, this.sort.direction, this.paginator.pageIndex);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;
  
            return data.items;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            // Catch if the db has reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => this.data = data);
      
    }
    
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, { duration: 2000, });
    }
  
  }
  
  export interface DbHubApi {
    items: DbHubIssue[];
    total_count: number;
  }
  
  export interface DbHubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
  }
  
  export class HttpDao {
    constructor(private http: HttpClient) {}
  
    //https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}
    getRepoIssues(sort: string, order: string, page: number): Observable<DbHubApi> {
      const href = 'https://api.github.com/search/issues';
      const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
      return this.http.get<DbHubApi>(requestUrl);
    }
  }
  