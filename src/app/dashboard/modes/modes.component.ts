import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { DateMode } from 'src/classes';

@Component({
  selector: 'app-modes',
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.scss'],
})
export class ModesComponent {
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper: HelperService
  ) {}
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedSort!: any;
  public modalReference: any;
  public Modes!: any;
  public selectedMode!: any;
  public state!: boolean;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public data!: any;
  public modeForm: any = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
  });
  async ngOnInit() {
    this.helper.showAlert('mode')
    this.getModes();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      this.modeForm.addControl('id', new FormControl(this.selectedMode?.id));
      this.modeForm.patchValue({
        name: this.selectedMode?.name,
        description: this.selectedMode?.description,
      });
    }
  }
  proceed() {
    this.modalReference.close();
  }
  save() {
    this.http
      .loaderPost('date-mode-add', this.modeForm.value, true)
      .pipe(
        tap((res: any) => {
          this.toaster.success(res?.message ?? '');
        })
      )
      .subscribe({
        next: () => {
          this.proceed();
        },
        complete: () => {
          this.helper.setModes();
          this.getModes();
          this.modeForm.removeControl('id');
        },
      });
  }
  async getModes() {
    await this.helper.getModes()?.then((modes: DateMode) => {
      this.Modes = modes;
      console.log(modes);
    });
  }
  async stateItem(event: any, data: any) {
    this.selectedMode = this.Modes?.find((e: any) => e?.id == event.id);
    if (this.selectedMode) {
      const { name, description, id } = this.selectedMode;
      const activeStatus = data.target.checked ? 1 : 0;
      this.modeForm.patchValue({
        name,
        description,
        id,
        active_status: activeStatus,
      });
      this.modeForm.addControl('id', new FormControl(this.selectedMode.id));
      this.modeForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );

      this.save();
    }
  }
}
