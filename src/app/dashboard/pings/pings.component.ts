import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { DateMode, Pings } from 'src/classes';
@Component({
  selector: 'app-pings',
  templateUrl: './pings.component.html',
  styleUrls: ['./pings.component.scss'],
})
export class PingsComponent {
  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private helper: HelperService
  ) {}
  public Menus: any;
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
  public data!: any;
  public Pings!: any;
  public selectedPing!: any;
  public modes!: any;
  public pingForm: any = this.fb.group({
    mode_id: [null, Validators.required],
    name: [null, Validators.required],
    description: [null, Validators.required],
    paid_or_free: [null, Validators.required],
    price: [0, Validators.required],
  });
  public status = [{ name: 'paid' }, { name: 'free' }];
  async ngOnInit() {
    this.helper.setPings()
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
      this.pingForm.addControl('id', new FormControl(this.selectedPing?.id));
      this.pingForm.patchValue({
        name: this.selectedPing?.name,
        description: this.selectedPing?.description,
      });
    }
  }
  proceed() {
    this.modalReference.close();
  }
  save() {
    this.http
      .loaderPost('ping-category-add', this.pingForm.value, true)
      .pipe(
        tap((res: any) => {
          this.toaster.success(res?.message ?? res?.messsage);
        })
      )
      .subscribe({
        next: () => {
            this.proceed();
          this.pingForm.reset();
        },
        complete: () => {
          this.helper.setPings();
          this.getPingsAndModes();
          this.pingForm.removeControl('id');
          this.pingForm.removeControl('active_status');
        },
      });
  }
  async stateItem(event: any, data: any) {
    this.selectedPing = this.Pings?.find((e: any) => e?.id == event.id);
    if (this.selectedPing) {
      const { id, name, mode_id, description, paid_or_free, price } =
        this.selectedPing;
      const activeStatus = data.target.checked ? 1 : 0;
      this.pingForm.patchValue({
        ...this.pingForm.value,
        name,
        mode_id,
        description,
        paid_or_free,
        price,
        active_status: activeStatus,
      });
      this.pingForm.addControl('id', new FormControl(id));
      this.pingForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );
    }
    this.save();
  }
  async getPingsAndModes() {
    await this.helper.getPings()?.then((Pings: Pings) => {
      this.Pings = Pings;
    });
    await this.helper.getModes()?.then((Modes: DateMode) => {
      this.modes = Modes;
      console.log(this.modes);
    });
  }
}
