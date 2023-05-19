import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { DateMode } from 'src/classes';

@Component({
  selector: 'app-pre-plan-dates',
  templateUrl: './pre-plan-dates.component.html',
  styleUrls: ['./pre-plan-dates.component.scss'],
})
export class PrePlanDatesComponent {
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
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
  // public pingids: any[] = [];
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public Dates!: any;
  public modeForm: any = this.fb.group({
    mode_id: [null, Validators.required],
    ping_id: [null, Validators.required],
    name: [null, Validators.required],
    price: [null, Validators.required],
  });
  public modes: any;
  public selectedPing: any;
  public pings: any;
  async ngOnInit() {
    this.getDates();
    this.getModes();
  }
  async getModes() {
    await this.helper.getModes()?.then((modes: DateMode) => {
      this.modes = modes;
    });
  }
  async open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state === 'edit') {
      const { id, mode_id, ping_id, name, description, price } =
        this.selectedPing || {};
      this.modeForm.addControl('id', new FormControl(id));
      let selectedModeId: any;
      this.modes?.map((mode: any) => {
        if (mode.id == mode_id) {
          selectedModeId = mode;
        }
      });
      await this.getPings(selectedModeId);
      let selectedPings: any = [];
      ping_id?.split(',').map((ping: any) => {
        this.pings?.map((mode: any) => {
          console.log(ping, mode, 'hello');
          if (mode.id == ping) {
            selectedPings.push(mode.id);
          }
        });
      });
      this.modeForm.patchValue({
        ...this.modeForm.value,
        mode_id: selectedModeId?.id,
        ping_id: selectedPings,
        name,
        description,
        price,
      });
    }
  }
  proceed() {
    this.modalReference.close();
  }
  async stateItem(event: any, data: any) {
    console.log(this.Dates,"helloDates");
    
    this.selectedPing = this.Dates?.find((e: any) => e?.id == event.id);
    if (this.selectedPing) {
      const { id, mode_id, ping_id, name, description, price } = this.selectedPing;
      const activeStatus = data.target.checked ? 1 : 0;
      let selectedModeId: any;
      this.modes?.map((mode: any) => {
        if (mode.id == mode_id) {
          selectedModeId = mode;
        }
      });
      await this.getPings(selectedModeId);
      let selectedPings: any = [];
      ping_id?.split(',').map((ping: any) => {
        this.pings?.map((mode: any) => {
          console.log(ping, mode, 'hello');
          if (mode.id == ping) {
            selectedPings.push(mode.id);
          }
        });
      });
      console.log(selectedModeId,selectedPings);
      
      this.modeForm.patchValue({
        ...this.modeForm.value,
        mode_id: selectedModeId?.id,
        ping_id: selectedPings,
        name,
        description,
        price,
        active_status: activeStatus,
      });
      this.modeForm.addControl('id', new FormControl(id));
      this.modeForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );

      this.save(false);
    }
  }
  async getPings(event: any) {
    const res: any = await this.http
      .loaderGet(`ping-category-by-mode/${event?.id}`, true)
      .toPromise();
    this.pings = res?.data;
  }
  
  getDates() {
    this.http.loaderGet('pre-plan-dates', true).subscribe((res: any) => {
      this.Dates = res?.data;
    });
  }
  convertPingIdsToString(pingIds: number[]): string {
    return pingIds.join(',');
  }
  save(modal:boolean) {
    // Convert the array to a comma-separated string
    const pingIds = this.modeForm.controls['ping_id'].value.join(',');
    this.modeForm.patchValue({
      ping_id: pingIds,
    });
    this.http
      .loaderPost('pre-plan-dates-add', this.modeForm.value, true)
      .subscribe((res: any) => {
        if(modal){
          this.proceed();
        }
        this.modeForm.reset();
        this.getDates();
        this.toaster.success(res?.message ? res?.message : res?.messsage);
      });
  }
}
