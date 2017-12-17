import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  queries = [];
  searchData = [];
  noAvatarImg = 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png';
  noMainImg = 'https://www.socabelec.co.ke/wp-content/uploads/no-photo-14.jpg';

  constructor(private router: Router, private _data: DataService) {
    // this.route.params.subscribe(res => console.log(res.id));
  }

  ngOnInit() {
    this._data.searchDataObservable.subscribe(res => {
      this.searchData = res;
      console.log(res);
    });
    this._data.queriesObservable.subscribe(res => this.queries = res);
  }

  // sendMeHome() {
  //   this.router.navigate(['']);
  // }
}
