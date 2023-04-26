import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversalService {
  public static headerHeading: Subject<any> = new Subject<any>();
  public static routePath: Subject<any> = new Subject<any>();
  public static cartShow: Subject<any> = new Subject<any>();
  public static checkoutModal: Subject<any> = new Subject<any>();
  public static Menu: Subject<any> = new Subject<any>();
  public static itemDetail: Subject<any> = new Subject<any>();
  public static itemDetailView: Subject<any> = new Subject<any>();
  public static cartPreviousState: Subject<any> = new Subject<any>();
  public static modules: Subject<any> = new Subject<any>();
  public static Orders: Subject<any> = new Subject<any>();
  public static SideBar: Subject<any> = new Subject<any>();
  public static TableModal: Subject<any> = new Subject<any>();
  public static PreviousCartItem: Subject<any> = new Subject<any>();
  public static DuplicateCartItem: Subject<any> = new Subject<any>();
  public static OrderDetailView: Subject<any> = new Subject<any>();
  public static StaffDetailView: Subject<any> = new Subject<any>();
  public static itemAddOns: Subject<any> = new Subject<any>();
  public static itemAddOnsUnique: Subject<any> = new Subject<any>();
  public static reOrder: Subject<any> = new Subject<any>();
  public static expand: Subject<any> = new Subject<any>();
  public static editModal: Subject<any> = new Subject<any>();
  public static logoUpdated: Subject<any> = new Subject<any>();
  constructor() { }
}
