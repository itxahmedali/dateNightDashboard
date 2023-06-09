import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { EventChild, Events } from 'src/classes';
@Component({
  selector: 'app-event-child',
  templateUrl: './event-child.component.html',
  styleUrls: ['./event-child.component.scss'],
})
export class EventChildComponent {
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper: HelperService
  ) {}
  public events: any;
  public eventsChild: any;
  public selectedEventsChild: any;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedSort!: any;
  public modalReference: any;
  public state!: boolean;
  public data!: any;
  public eventChildForm: any = this.fb.group({
    value: [null, Validators.required],
    label: [null],
    event_id: [null],
  });
  async ngOnInit() {
    this.helper.setEventChild();
    this.getEvent();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
      size: state == 'view' ? 'xl' : 'md',
    });
    this.state = state == 'editChild' ? true : false;
    const { id, event_id, value, label } = this.selectedEventsChild || {};
    if (this.state) {
      this.eventChildForm.addControl('id', new FormControl(id));
      this.eventChildForm.patchValue({
        ...this.eventChildForm.value,
        event_id: JSON.parse(event_id),
        value,
        label: value,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.eventChildForm.reset();
    this.eventChildForm.removeControl('id');
    this.eventChildForm.removeControl('active_status');
  }
  save(modal: boolean) {
    this.eventChildForm.patchValue({
      label: this.eventChildForm.get('value').value,
    });
    this.http
      .loaderPost('events-child-add', this.eventChildForm.value, true)
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
          this.helper.setEventChild();
          this.getEvent();
          this.eventChildForm.reset();
        },
        complete: () => {
          this.eventChildForm.removeControl('id');
          this.eventChildForm.removeControl('active_status');
        },
      });
  }
  async stateItem(event: any, data: any) {
    this.selectedEventsChild = this.eventsChild?.find(
      (e: any) => e?.id == event.id
    );
    if (this.selectedEventsChild) {
      const { id, event_id, value, label } = this.selectedEventsChild || {};
      this.eventChildForm.patchValue({
        ...this.eventChildForm.value,
        event_id: event_id,
        value,
        label,
      });
      this.eventChildForm.addControl('id', new FormControl(id));
      this.eventChildForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );
    }
    this.save(false);
  }
  async getEvent() {
    await this.helper.getEvents()?.then((Events: Events) => {
      this.events = Events;
    });
    await this.helper.getEventChilds()?.then((Events: EventChild) => {
      this.eventsChild = Events;
    });
  }
  matchEvents(id: any) {
    return this.events
      ?.filter((event: any) => event.id == id)
      .map((event: any) => event.name);
  }
  delete(id: any) {
    this.http
      .loaderGet(`events-child-delete/${id}`, true)
      .subscribe((res: any) => {
        this.helper.setEventChild();
        this.eventChildForm.reset();
        this.getEvent();
      });
  }
}
