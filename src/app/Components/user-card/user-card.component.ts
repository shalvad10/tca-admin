import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import appData from 'src/app/Services/Data/AppData';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  constructor( private router: Router) { }

  avatarIMG: any;
  @Input() firstName  : string;
  @Input() lastName   : string;
  @Input() storeName  : string;
  @Input() position   : string;
  @Input() set avatar(val: string) {
    this.avatarIMG = appData.data.avatars[ val ? Number.parseInt(val) : 0]
  }
  @Input() id         : number;

  ngOnInit(): void { }

  openProfile() {
    this.router.navigateByUrl(`/users/${this.id}`);
  }

}
