import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { Users } from 'src/classes';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  user: any;
  datePersonPage: any;
  dateModePage: any;
  dateEventPage: any;
  datePingsPage: any;
  datePingPage: any;
  Persontotal: any;
  Modetotal: any;
  Eventtotal: any;
  Pingstotal: any;
  Pingtotal: any;
  constructor(private http: HttpService, private route: ActivatedRoute) {
    const userId: any = this.route.snapshot.paramMap.get('id');
    this.getUsers(userId);
  }
  async getUsers(id: number) {
    console.log(id);
    this.http.loaderGet(`user-details/${id}`, true).subscribe((user: any) => {
      this.user = user;
    });
  }
}
