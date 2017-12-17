import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  private queries = new BehaviorSubject<any>([]);
  queriesObservable = this.queries.asObservable();

  private searchData = new BehaviorSubject<any>([]);
  searchDataObservable = this.searchData.asObservable();

  private endpoint = 'http://api.tvmaze.com';
  private url = '';

  changeQuery(query) {
    this.queries.next(query);
  }

  getResults(searchOption, query): Observable<any[]> {
    switch (searchOption.toLowerCase()) {
      case 'shows': {
        this.url = this.endpoint + '/search/shows?q=' + encodeURI(query);
        break;
      }
      case 'people': {
        this.url = this.endpoint + '/search/people?q=' + encodeURI(query);
        break;
      }
    }
    return this.http.get<any[]>(this.url).map(
      res => {
        this.searchData.next(res);
        return res;
      }
      // {
      //   return this.searchData.next(res);
      // }
    );
  }
}
