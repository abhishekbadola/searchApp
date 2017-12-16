import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  goals = [];

  constructor(private router: Router, private _data: DataService) {
    // this.route.params.subscribe(res => console.log(res.id));
  }

  ngOnInit() {
    this._data.goalsObservable.subscribe(res => this.goals = res);
  }

  sendMeHome() {
    this.router.navigate(['']);
  }
}
