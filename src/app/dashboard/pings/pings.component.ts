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
    paid_or_free: ['free', Validators.required],
    price: [0],
  });
  public status = [{ name: 'paid' }, { name: 'free' }];
  async ngOnInit() {
    this.helper.setPings();
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
      let selectedModeId: any = [];
      this.selectedPing.modes.forEach((id: any) => {
        const mode = this.modes.find((m: any) => m.id == id);
        if (mode) {
          selectedModeId.push(mode.id);
        }
      });
      this.pingForm.patchValue({
        name: this.selectedPing?.name,
        description: this.selectedPing?.description,
        mode_id: selectedModeId,
        paid_or_free: this.selectedPing.paid_or_free,
        price: this.selectedPing.price,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.pingForm.reset();
    this.pingForm.removeControl('id');
    this.pingForm.removeControl('active_status');
  }
  save(modal: boolean) {
    this.http
      .loaderPost('ping-category-add', this.pingForm.value, true)
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
          this.pingForm.reset();
          this.pingForm.patchValue({
            paid_or_free: 'free',
            price: 0,
          });
        },
        complete: () => {
          this.helper.setPings();
          this.getPingsAndModes();
          this.pingForm.removeControl('id');
          this.pingForm.removeControl('active_status');
        },
      });
  }
  setPaidStatus(event: any) {
    if (event.name == 'free') {
      this.pingForm.patchValue({
        price: 0,
      });
    } else return;
  }
  async stateItem(event: any, data: any) {
    this.selectedPing = this.Pings?.find((e: any) => e?.id == event.id);
    if (this.selectedPing) {
      const { id, name, modes, description, paid_or_free, price } =
        this.selectedPing;
      const activeStatus = data.target.checked ? 1 : 0;
      this.pingForm.patchValue({
        ...this.pingForm.value,
        name,
        mode_id: modes,
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
    this.save(false);
  }
  async getPingsAndModes() {
    await this.helper.getModes()?.then((Modes: DateMode) => {
      this.modes = Modes;
    });
    const pings: any = await this.helper.getPings();

    pings.forEach((ping: any) => {
      const modeNames: string[] = [];
      if (ping.modes) {
        ping.modes.forEach((id: any) => {
          const mode = this.modes.find((m: any) => m.id == id);
          if (mode) {
            modeNames.push(mode.name);
          }
        });
      }
      ping.modeNames = modeNames;
    });

    this.Pings = pings;
  }
  delete(id: any) {
    this.http
      .loaderGet(`ping-category-delete/${id}`, true)
      .subscribe((res: any) => {
        this.helper.setPings();
        this.getPingsAndModes();
      });
  }
  checkModeName(array: any[]): string[] {
    const modeNames: string[] = [];
    if (!this.modes) {
      return modeNames;
    }
    for (const id of array) {
      const mode = this.modes.find((m: any) => m.id == id);

      if (mode) {
        if (modeNames.length < 1) {
          modeNames.push(mode.name);
        } else if (modeNames.length == 1) {
          modeNames.push('...');
        } else {
          return modeNames;
        }
      }
    }
    return modeNames;
  }
}
