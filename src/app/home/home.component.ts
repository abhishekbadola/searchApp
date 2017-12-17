import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('queries', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount = 4;
  searchQuery = '';
  queries = [];

  searchOptions: [string] = [
    'Shows',
    'People'
  ];
  selectedOption = this.searchOptions[0];

  searchData = [];
  myControl: FormControl = new FormControl();

  constructor(private router: Router, private _data: DataService) {
  }

  ngOnInit() {
    this._data.searchDataObservable.subscribe(res => {
      this.searchData = res;
      console.log(res);
    });
    this._data.queriesObservable.subscribe(res => this.queries = res);
    this._data.changeQuery(this.queries);
  }

  addItem() {
    this.queries.push(this.searchQuery);
    this.searchQuery = '';
    this._data.changeQuery(this.queries);
  }

  searchItem() {
    this._data.getResults(this.selectedOption, this.searchQuery)
      .subscribe(res => {
        this.searchData = res;
        this.router.navigate(['/details']);
        console.log(res);
      });
    this.addItem();
  }

  removeItem(i) {
    this.queries.splice(i, 1);
    this._data.changeQuery(this.queries);
  }
}
