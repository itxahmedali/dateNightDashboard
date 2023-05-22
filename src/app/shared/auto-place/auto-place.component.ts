import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-auto-place',
  templateUrl: './auto-place.component.html',
  styleUrls: ['./auto-place.component.scss']
})
export class AutoPlaceComponent {
  @Output() addressSelected: EventEmitter<Address> = new EventEmitter<Address>();
  @ViewChild('placesRef') placesRef!: any;

  handleAddressChange(address: Address): void {
    this.addressSelected.emit(address);
  }

  setPlaceByLatLng(lat: number, lng: number): void {
    console.log(lat,lng,'child');
      const place = {
        geometry: {
          location: {
            lat: () => lat,
            lng: () => lng
          }
        }
      };
      this.placesRef['directiveRef'].setAddress(place);
  }
}
