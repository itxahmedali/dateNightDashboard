import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
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
    private fb: FormBuilder,
    private http: HttpService,
    private toaster: ToastrService
  ) {}
  public modalReference: any;
  public searchInput!: any;
  public selectedSort!: any;
  public selectedUser!: any;
  public duePage!: any;
  public total!: any;
  public reminders!: any;
  public dates!: any;
  public state!: boolean;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public users!: any;
  public EditUserForm: any = this.fb.group({
    name: [null, Validators.required],
    phone: [null, Validators.required],
    dob: [null, Validators.required],
  });
  async ngOnInit() {
    this.helper.setUsers();
    this.getUsers();
  }

  async open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
      size: 'xl',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      const { id, name, dob, phone } = this.selectedUser || {};
      this.EditUserForm.addControl('id', new FormControl(id));
      this.EditUserForm.patchValue({
        ...this.EditUserForm.value,
        name,
        dob,
        phone,
      });
    }
  }
  exportToExcel(): void {
    this.helper.exportToExcel(this.users);
  }
  proceed() {
    this.modalReference.close();
    this.EditUserForm.reset();
  }
  async getUsers() {
    await this.helper.getUsers()?.then((Users: Users) => {
      this.users = Users;
    });
  }
  save(modal: boolean) {
    this.http
      .loaderPost('user-update', this.EditUserForm.value, true)
      .pipe(
        tap((res: any) => {
          this.toaster.success(res?.message ?? res?.messsage);
        })
      )
      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.helper.setUsers();
          this.getUsers();
          this.EditUserForm.reset();
        },
        complete: () => {
          this.EditUserForm.removeControl('id');
          this.EditUserForm.removeControl('active_status');
        },
      });
  }
  async stateItem(event: any, data: any) {
    this.selectedUser = this.users?.find((e: any) => e?.id == event.id);
    if (this.selectedUser) {
      const { id, name, phone, dob } = this.selectedUser || {};
      this.EditUserForm.patchValue({
        ...this.EditUserForm.value,
        name,
        phone,
        dob,
      });
      this.EditUserForm.addControl('id', new FormControl(id));
      this.EditUserForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );
    }
    this.save(false);
  }
  delete(id: any) {
    // this.http
    //   .loaderGet(`faq-delete/${id}`, true)
    //   .subscribe((res: any) => {
    //     this.helper.setFaqs();
    //     this.getFaqs();
    //   });
  }
}
