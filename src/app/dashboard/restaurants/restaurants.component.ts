import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { AutoPlaceComponent } from 'src/app/shared/auto-place/auto-place.component';
import { DateMode } from 'src/classes';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export default class RestaurantsComponent {
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
  public Restaurants!: any;
  public restuarantForm: any = this.fb.group({
    sponsored: [null, Validators.required],
    desc: [null, Validators.required],
    name: [null, Validators.required],
    phone: [null, Validators.required],
    location: [null, Validators.required],
    website: [null, Validators.required],
    lat: [null, Validators.required],
    lng: [null, Validators.required],
  });
  public modes: any;
  public selectedRestaurant: any;
  public pings: any;
  @ViewChild('placesRef', { static: false, read: GooglePlaceDirective })
  placesRef!: any;
  public address!:any
  async ngOnInit() {
    this.getRestaurant();
  }
  async getRestaurant() {
    await this.http.loaderGet('restaurant', true)?.subscribe((res: any) => {
      console.log(res);
      this.Restaurants = res?.data;
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
      const {
        id,
        sponsored,
        desc,
        name,
        phone,
        location,
        website,
        lat,
        lng,
        active_status,
      } = this.selectedRestaurant;
      this.setPlaceByLatLng(lat, lng);
      this.restuarantForm.patchValue({
        ...this.restuarantForm.value,
        sponsored,
        desc,
        name,
        phone,
        location,
        website,
        lat,
        lng,
      });
      this.restuarantForm.addControl('id', new FormControl(id));
      this.restuarantForm.addControl(
        'active_status',
        new FormControl(active_status)
      );
    }
    else{
      this.address = null
    }
  }
  proceed() {
    this.modalReference.close();
    this.restuarantForm.reset();
  }
  async stateItem(event: any, data: any) {
    this.selectedRestaurant = this.Restaurants?.find(
      (e: any) => e?.id == event.id
    );
    if (this.selectedRestaurant) {
      const { id, sponsored, desc, name, phone, location, website, lat, lng } =
        this.selectedRestaurant;
      this.restuarantForm.patchValue({
        ...this.restuarantForm.value,
        sponsored,
        desc,
        name,
        phone,
        location,
        website,
        lat,
        lng,
      });
      this.restuarantForm.addControl('id', new FormControl(id));
      this.restuarantForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );
      this.save(false);
    }
  }
  save(modal: boolean) {
    this.http
      .loaderPost('restaurant-add', this.restuarantForm.value, true)
      .subscribe((res: any) => {
        if (modal) {
          this.proceed();
        }
        this.restuarantForm.removeControl('id');
        this.restuarantForm.removeControl('active_status');
        this.restuarantForm.reset();
        this.getRestaurant();
        this.toaster.success(res?.message ? res?.message : res?.messsage);
      });
  }
  delete(id: any) {
    this.http
      .loaderGet(`restaurant-delete/${id}`, true)
      .subscribe((res: any) => {
        this.getRestaurant();
      });
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onPlaceSelected(predictions: any) {
    console.log(predictions);
    const lat = predictions?.geometry.location.lat();
    const lng = predictions?.geometry.location.lng();
    this.restuarantForm.patchValue({
      lat: lat,
      lng: lng,
    });
  }
  setPlaceByLatLng(lat: number, lng: number): void {
    this.http.getAddressFromLatLng(lat, lng).subscribe((res:any)=>{
      const formattedAddress = res.results[0].formatted_address;
      console.log(formattedAddress);
      this.address = formattedAddress;
    })
  }  
}
