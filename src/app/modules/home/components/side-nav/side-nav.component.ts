import { User } from './../../../../data/schemas/User';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input()
  public user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
