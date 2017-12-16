import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  constructor() { }

  private goals = new BehaviorSubject<any>(['My first life goal', 'I want to climb a mountain', 'Go ice skiing']);
  goalsObservable = this.goals.asObservable();

  changeGoal(goal) {
    this.goals.next(goal);
  }
}
