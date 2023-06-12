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
  currentLat!: number;
  currentLng!: number;
  public restuarantForm: any = this.fb.group({
    sponsored: [null],
    desc: [null],
    name: [null],
    phone: [null],
    location: [null],
    website: [null],
    lat: [null],
    lng: [null],
  });
  public modes: any;
  public selectedRestaurant: any;
  public pings: any;
  public address!: any;
  async ngOnInit() {
    this.getRestaurant();
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
    } else {
      this.address = null;
      this.helper.getPosition().then((pos: any) => {
        this.currentLat = pos.lat;
        this.currentLng = pos.lng;
        console.log(`Positon: ${pos.lng} ${pos.lat}`);
      });
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
    const lat = predictions?.geometry.location.lat();
    const lng = predictions?.geometry.location.lng();
    this.currentLat = Number(lat);
    this.currentLng = Number(lng);
    this.restuarantForm.patchValue({
      lat: this.currentLat,
      lng: this.currentLng,
    });
  }
  
  setPlaceByLatLng(lat: number, lng: number): void {
    const latitude = Number(lat);
    const longitude = Number(lng);
    this.currentLat = latitude;
    this.currentLng = longitude;
    this.http.getAddressFromLatLng(latitude, longitude).subscribe((res: any) => {
      const formattedAddress = res.results[0].formatted_address;
      this.address = formattedAddress;
    });
    this.restuarantForm.patchValue({
      lat: latitude,
      lng: longitude,
    });
  }
  
  markerDragEnd($event: any) {
    this.currentLat = $event.coords.lat;
    this.currentLng = $event.coords.lng;
    this.setPlaceByLatLng(this.currentLat, this.currentLng);
  }
  
}
