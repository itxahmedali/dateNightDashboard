import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { Users } from 'src/classes';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(
    private modalService: NgbModal,
    private helper: HelperService,

  ) {}
  public modalReference: any;
  public searchInput!: any;
  public selectedSort!: any;
  public duePage!: any;
  public total!: any;
  public reminders!: any;
  public dates!: any;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public users!: any;
  async ngOnInit() {
    this.helper.setUsers();
    this.getUsers();
  }
  
  async open(content: any) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
      size: 'xl',
    });
  }
  exportToExcel(): void {
    this.helper.exportToExcel(this.users)
  }
  proceed() {
    this.modalReference.close();
  }
  async getUsers() {
    await this.helper.getUsers()?.then((Users: Users) => {
      this.users = Users;
    });
  }
  
}
