import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { DateMode, Pings, PingsChild } from 'src/classes';

@Component({
  selector: 'app-ping-child',
  templateUrl: './ping-child.component.html',
  styleUrls: ['./ping-child.component.scss'],
})
export class PingChildComponent {
  selectedPingChild!: any;
  PingsChild!: any;
  modes!: any;
  Pings!: any;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedSort!: any;
  public modalReference: any;
  public MenuSelected: any;
  public state!: boolean;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public pingForm: any = this.fb.group({
    category_id: [null, Validators.required],
    name: [null, Validators.required],
    description: [null, Validators.required],
    paid_or_free: ['free'],
    price: [0],
    show_everyone: [1],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper: HelperService
  ) {}
  async ngOnInit() {
    this.helper.setPingsChild()
    this.getPingsAndModes();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      this.pingForm.addControl(
        'id',
        new FormControl(this.selectedPingChild?.id)
      );
      this.pingForm.patchValue({
        name: this.selectedPingChild?.name,
        description: this.selectedPingChild?.description,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.pingForm.reset();
  }
  save(modal: boolean) {
    this.http
      .loaderPost('pings-add', this.pingForm.value, true)
      .pipe(
        tap((res: any) => {
          this.toaster.success(res?.message ?? res?.messsage);
        })
      )
      .subscribe({
        next: () => {
          this.proceed();
          this.pingForm.reset();
          this.pingForm.patchValue({
            paid_or_free:'free',
            price:0,
          });
        },
        complete: () => {
          this.helper.setPingsChild();
          this.getPingsAndModes();
          this.pingForm.removeControl('id');
          this.pingForm.removeControl('active_status');
        },
      });
  }
  async stateItem(event: any, data: any) {
    this.selectedPingChild = this.PingsChild?.find(
      (e: any) => e?.id == event.id
    );
    if (this.selectedPingChild) {
      const { id, name, category_id, description } =
        this.selectedPingChild;
      const activeStatus = data.target.checked ? 1 : 0;
      this.pingForm.patchValue({
        ...this.pingForm.value,
        name,
        category_id,
        description,
        paid_or_free:'free',
        price:0,
        active_status: activeStatus,
      });
      this.pingForm.addControl('id', new FormControl(id));
      this.pingForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );      
    }
    this.save(false);
  }
  async getPingsAndModes() {
    await this.helper.getPingsChilds()?.then((Pings: PingsChild) => {
      this.PingsChild = Pings;
    });
    await this.helper.getPings()?.then((Pings: Pings) => {
      this.Pings = Pings;
    });
    await this.helper.getModes()?.then((Modes: DateMode) => {
      this.modes = Modes;
    });
  }
  matchPings(id: any) {
    return this.Pings?.filter((ping: any) => ping.id == id).map((ping: any) => ping.name);
  }
  delete(id: any) {
    this.http
      .loaderGet(`pings-delete/${id}`, true)
      .subscribe((res: any) => {
        this.helper.setPingsChild();
          this.getPingsAndModes();
      });
  }
}
