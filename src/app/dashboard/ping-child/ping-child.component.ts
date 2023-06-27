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
  pingModes!: any;
  Pings!: any;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedSort!: any;
  public modalReference: any;
  public MenuSelected: any;
  public state!: boolean;
  public sorts: any = [];
  public pingForm: any = this.fb.group({
    mode_id: [null, Validators.required],
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
    await this.helper.setPingsChild();
    await this.getPingsAndModes();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      let selectedPing: any = [];
      this.selectedPingChild.category_id.forEach((id: any) => {
        const ping = this.Pings.find((m: any) => m.id == id);
        if (ping) {
          selectedPing.push(ping?.id);
        }
      });
      let selectedMode: any = [];
      let pingMode: any = [];
      this.selectedPingChild.mode_id.forEach((id: any) => {
        const ping = this.modes.find((m: any) => m.id == id);
        if (ping) {
          pingMode.push(ping);
          selectedMode.push(ping?.id);
        }
      });
      this.pingModes = pingMode;
      this.pingForm.addControl(
        'id',
        new FormControl(this.selectedPingChild?.id)
      );
      this.pingForm.patchValue({
        mode_id: selectedMode,
        category_id: selectedPing,
        name: this.selectedPingChild?.name,
        description: this.selectedPingChild?.description,
        paid_or_free: 'free',
        price: 0,
        show_everyone: 1,
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
            paid_or_free: 'free',
            price: 0,
            show_everyone: 1,
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
      const { id, name, category_id, description, mode_id } =
        this.selectedPingChild;
      const activeStatus = data.target.checked ? 1 : 0;
      this.pingForm.patchValue({
        ...this.pingForm.value,
        name,
        mode_id,
        category_id,
        description,
        paid_or_free: 'free',
        price: 0,
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
    await this.helper.getPings()?.then((Pings: Pings) => {
      this.Pings = Pings;
      this.Pings?.map((ping: any) => {
        this.sorts.push({ name: ping?.name });
      });
      this.sorts = this.sorts.filter((sort: any, index: any, array: any) => {
        return (
          index ===
          array.findIndex((item: any) => {
            return item.name === sort.name;
          })
        );
      });
    });
    const pingChild: any = await this.helper.getPingsChilds();
    pingChild.forEach((ping: any) => {
      if (ping.category_id) {
        const categoryNames: string[] = [];
        ping.category_id.forEach((id: any) => {
          const mode = this.Pings.find((m: any) => m.id == id);
          if (mode) {
            categoryNames.push(mode.name);
          }
        });
        ping.categoryNames = categoryNames;
      }
      if (ping.mode_id) {
        const modeNames: string[] = [];
        ping.mode_id.forEach((id: any) => {
          const mode = this.modes.find((m: any) => m.id == id);
          if (mode) {
            modeNames.push(mode.name);
          }
        });
        ping.modeNames = modeNames;
      }
    });
    this.PingsChild = pingChild;
  }
  delete(id: any) {
    this.http.loaderGet(`pings-delete/${id}`, true).subscribe((res: any) => {
      this.helper.setPingsChild();
      this.getPingsAndModes();
    });
  }
  checkPingCatrgoryName(array: any[]): string[] {
    const pinCategoryNames: string[] = [];
    if (!this.Pings) {
      return pinCategoryNames;
    }
    for (const id of array) {
      const ping = this.Pings.find((m: any) => m.id == id);

      if (ping) {
        if (pinCategoryNames.length < 1) {
          pinCategoryNames.push(ping.name);
        } else if (pinCategoryNames.length == 1) {
          pinCategoryNames.push('...');
        } else {
          return pinCategoryNames;
        }
      }
    }
    return pinCategoryNames;
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
  checkForMode(events: any) {
    let selectedModes: any = [];
    events?.map((event: any) => {
      this.modes?.map((mode: any) => {
        event?.modes?.map((eventMode: any) => {
          if (eventMode == mode?.id) {
            selectedModes.push(mode);
          }
        });
      });
    });
    this.pingModes = selectedModes;
  }
}
