import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper: HelperService
  ) {}
  public searchInput!: any;
  public selectedSort!: any;
  public duePage!: any;
  public total!: any;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public users!:any
  async ngOnInit(){
    await this.getUsers()
  }
  getUsers(){
    this.http.loaderPost('all-users',{},true).subscribe((res:any)=>{
      this.users = res
    })
  }
}
