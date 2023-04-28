import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper: HelperService
  ) {}
  public events: any;
  public selectedEvent: any;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedSort!: any;
  public modalReference: any;
  public state!: boolean;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public data!: any;
  public eventForm: any = this.fb.group({
    name: [null, Validators.required],
  });
  async ngOnInit() {
    this.getEvent();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
      size: state == 'view' ? 'xl' : 'md',
    });
    this.state = state == 'edit' || 'editChild' ? true : false;
    if (state == 'edit') {
      const { id, name } = this.selectedEvent || {};
      this.eventForm.addControl('id', new FormControl(id));
      this.eventForm.patchValue({
        ...this.eventForm.value,
        name,
      });
    }
  }
  proceed() {
    this.modalReference.close();
  }
  save(modal: boolean, api: string) {
      this.http
        .loaderPost('events-add', this.eventForm.value, true)
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
            this.eventForm.reset();
          },
          complete: () => {
            this.getEvent();
            this.eventForm.removeControl('id');
            this.eventForm.removeControl('active_status');
          },
        });

  }
  async stateItem(event: any, data: any, api: string) {
      this.selectedEvent = this.events?.find((e: any) => e?.id == event.id);
      if (this.selectedEvent) {
        const { id, name } = this.selectedEvent;
        const activeStatus = data.target.checked ? 1 : 0;
        this.eventForm.patchValue({
          ...this.eventForm.value,
          name,
          active_status: activeStatus,
        });
        this.eventForm.addControl('id', new FormControl(id));
        this.eventForm.addControl(
          'active_status',
          new FormControl(data.target.checked ? 1 : 0)
        );
      }
      this.save(false, 'event');
  }
  async getEvent() {
    this.http.loaderGet('events', true).subscribe((res: any) => {
      this.events = res?.data;
    });
  }
}
