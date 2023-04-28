import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pre-plan-dates',
  templateUrl: './pre-plan-dates.component.html',
  styleUrls: ['./pre-plan-dates.component.scss']
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
  public state!:boolean;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public Dates!: any;
  public modeForm: any = this.fb.group({
    modeId: [null, Validators.required],
    pingId: [null, Validators.required],
    name: [null, Validators.required],
    price: [null, Validators.required]
  });
  public modes:any;
  async ngOnInit(){
    this.getDates()
  }
  open(content: any,state:string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
  }
  proceed() {
    this.modalReference.close();
  }
  getDates(){
    this.http.loaderGet('pre-plan-dates',true).subscribe((res:any)=>{
      this.Dates = res?.data
    })
  }
  save(){
    console.log(this.modeForm.values);
  }
}
