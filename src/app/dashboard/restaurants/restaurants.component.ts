import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { AutoPlaceComponent } from 'src/app/shared/auto-place/auto-place.component';
import { DateMode } from 'src/classes';
// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
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
  // google maps zoom level
  zoom: number = 15;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public Restaurants!: any;
  public formattedAddress!: any;
  currentLat!: number;
  currentLng!: number;

  public restuarantForm: any = this.fb.group({
    sponsored: [null, Validators.required],
    voucher: [null],
    desc: [null],
    name: [null, Validators.required],
    phone: [null],
    location: [null, Validators.required],
    website: [null],
    lat: [null],
    lng: [null],
  });
  public modes: any;
  public selectedRestaurant: any;
  public pings: any;
  async ngOnInit() {
    this.getRestaurant();
    this.getCurrentLocation();
  }
  async getCurrentLocation() {
    await this.helper.getPosition().then(async (pos: any) => {
      this.currentLat = pos.lat;
      this.currentLng = pos.lng;
      localStorage.setItem('currentLat', JSON.stringify(pos.lat));
      localStorage.setItem('currentLng', JSON.stringify(pos.lng));
      await this.setPlaceByLatLng(pos.lat, pos.lng, true);
    });
  }
  async getRestaurant() {
    await this.http.loaderGet('restaurant', true)?.subscribe((res: any) => {
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
        voucher,
      } = this.selectedRestaurant;
      this.setPlaceByLatLng(lat, lng, false);
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
        voucher,
      });
      this.restuarantForm.addControl('id', new FormControl(id));
      this.restuarantForm.addControl(
        'active_status',
        new FormControl(active_status)
      );
    } else {
      const currentLat:any = localStorage.getItem('currentLat');
      const currentLng:any = localStorage.getItem('currentLng');
      const formattedAddress:any = localStorage.getItem('formattedAddress');
      this.currentLat = Number(JSON.parse(currentLat));
      this.currentLng = Number(JSON.parse(currentLng));
      this.restuarantForm.patchValue({
        lat: this.currentLat,
        lng: this.currentLng,
        location: JSON.parse(formattedAddress),
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.restuarantForm.reset();
    this.formattedAddress = null;
  }
  async stateItem(event: any, data: any) {
    this.selectedRestaurant = this.Restaurants?.find(
      (e: any) => e?.id == event.id
    );
    if (this.selectedRestaurant) {
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
        voucher,
      } = this.selectedRestaurant;
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
        voucher,
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
    
    // Get the phone control from the form group
    const phoneControl = this.restuarantForm.get('phone');
  
    if (phoneControl) {
      // Get the current value of the phone control
      let currentValue = phoneControl.value || '';
      
      // Remove non-digit characters from the current value
      currentValue = currentValue.replace(/\D/g, '');
      
      // Format the phone number in US format
      // const formattedValue = this.formatPhoneNumber(currentValue);
      
      // Update the value in the form control
      // phoneControl.setValue(formattedValue, { emitEvent: false });
    }
    
    return true;
  }
  onPlaceSelected(predictions: any) {
    const lat = predictions?.geometry.location.lat();
    const lng = predictions?.geometry.location.lng();
    this.currentLat = Number(lat);
    this.currentLng = Number(lng);
    this.restuarantForm.patchValue({
      lat: this.currentLat,
      lng: this.currentLng,
    });
  }

  setPlaceByLatLng(lat: number, lng: number, setInLocal:boolean): void {
    const latitude = Number(lat);
    const longitude = Number(lng);
    this.currentLat = latitude;
    this.currentLng = longitude;
    this.http
      .getAddressFromLatLng(latitude, longitude)
      .subscribe((res: any) => {
        this.formattedAddress = res.results[0].formatted_address;
        if(setInLocal){
          localStorage.setItem(
            'formattedAddress',
            JSON.stringify(res.results[0].formatted_address)
          );
        }
        this.restuarantForm.patchValue({
          lat: latitude,
          lng: longitude,
          location: this.formattedAddress,
        });
      });
  }

  markerDragEnd($event: any) {
    this.currentLat = $event.coords.lat;
    this.currentLng = $event.coords.lng;
    this.setPlaceByLatLng(this.currentLat, this.currentLng,false);
  }
  numberKeyup(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    if (value.length >= 1) {
      input.value = '(' + value.substring(0, 3);
    }
    if (value.length >= 4) {
      input.value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6);
    }
    if (value.length >= 7) {
      input.value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
    }
  }
}
