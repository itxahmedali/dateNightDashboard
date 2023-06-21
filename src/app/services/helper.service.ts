import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import * as XLSX from 'xlsx';
import { writeFile } from 'xlsx';
import {
  Setting,
  DateMode,
  Pings,
  PingsChild,
  Events,
  EventChild,
  Users,
  Faq,
} from 'src/classes';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public domainId!: number;
  public settings!: Setting;
  public dateModes!: DateMode;
  private modePromise!: Promise<any>;
  private pingsPromise!: Promise<any>;
  private pingsChildPromise!: Promise<any>;
  private EventsPromise!: Promise<any>;
  private EventChildPromise!: Promise<any>;
  private UsersPromise!: Promise<any>;
  private FaqsPromise!: Promise<any>;
  private hasAlertShown: boolean = false;
  constructor(private http: HttpService, private toastr: ToastrService) {
    if (localStorage.getItem('access_token')) {
      setTimeout(() => {}, 1000);
    }
  }
  showAlert(path: any) {
    if (!this.hasAlertShown) {
      if (path == 'mode') {
        this.setModes();
      }
      if (path == 'events') {
        this.setEvents();
      }
      this.hasAlertShown = true;
    }
  }
  fileUploadHttp(event: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const base64String = canvas.toDataURL('image/webp', 0.8);
            let substringToRemove = 'data:image/webp;base64,';

            let resultAfterModify = base64String.replace(
              substringToRemove,
              ''
            );
            if (base64String) {
              this.http
                .loaderPost('image-upload-64', { image: resultAfterModify }, true)
                .subscribe(
                  (response: any) => {
                    resolve(response);
                    this.toastr.success(response.message);
                  },
                  (error) => {
                    reject(error);
                  }
                );
            }
          }
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
  addSpaces(str: string): string {
    let result = str.replace(/([a-z])([A-Z])/g, '$1 $2'); // add space between lowercase and uppercase letters
    result = result.replace(/&/, ' & '); // add spaces around "&" character
    result = result.replace(/(creatediscount|staffpayroll)/, '$1 '); // add space after specific words
    return result;
  }
  sumArrayItem(sum: any, CartItems: any) {
    sum = CartItems?.reduce((accumulator: any, object: any) => {
      return accumulator + object.price;
    }, 0);
  }
  removeDuplicates(arr: any) {
    let combinedItems = arr.reduce((acc: any, item: any) => {
      let existingItem = acc.find((i: any) => i.name == item.name);
      if (existingItem) {
        existingItem.value += item.value;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    return combinedItems;
  }
  async setModes() {
    this.modePromise = this.loadModes();
  }
  public async loadModes(): Promise<DateMode[]> {
    const res: any = await this.http.loaderGet('date-mode', true).toPromise();
    const modesList = res.data.map((data: DateMode) => {
      return new DateMode(
        data.id,
        data.name,
        data.description,
        data.active_status
      );
    });
    return modesList;
  }

  public getModes(): Promise<DateMode> {
    if (!this.modePromise) {
      this.modePromise = this.loadModes();
    }
    return this.modePromise;
  }
  async setPings() {
    this.pingsPromise = this.loadPings();
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  public async loadPings(): Promise<Pings[]> {
    const res: any = await this.http
      .loaderGet('ping-category', true)
      .toPromise();
    const modesList = res.data.map((data: Pings) => {
      return new Pings(
        data.id,
        data.mode_id,
        data.modes,
        data.name,
        data.description,
        data.paid_or_free,
        data.price,
        data.active_status
      );
    });
    return modesList;
  }

  public getPings(): Promise<Pings> {
    if (!this.pingsPromise) {
      this.pingsPromise = this.loadPings();
    }
    return this.pingsPromise;
  }
  async setPingsChild() {
    this.pingsChildPromise = this.loadPingsChild();
  }
  public async loadPingsChild(): Promise<PingsChild[]> {
    const res: any = await this.http.loaderGet('pings', true).toPromise();
    const modesList = res.data.map((data: PingsChild) => {
      return new PingsChild(
        data.id,
        data.mode_id,
        data.category_id,
        data.name,
        data.description,
        data.active_status
      );
    });
    return modesList;
  }

  public getPingsChilds(): Promise<PingsChild> {
    if (!this.pingsChildPromise) {
      this.pingsChildPromise = this.loadPingsChild();
    }
    return this.pingsChildPromise;
  }
  async setEvents() {
    this.EventsPromise = this.loadEvents();
  }
  public async loadEvents(): Promise<Events[]> {
    const res: any = await this.http.loaderGet('events', true).toPromise();
    const modesList = res.data.map((data: Events) => {
      return new Events(data.id, data.name, data.active_status);
    });
    return modesList;
  }

  public getEvents(): Promise<Events> {
    if (!this.EventsPromise) {
      this.EventsPromise = this.loadEvents();
    }
    return this.EventsPromise;
  }
  async setEventChild() {
    this.EventChildPromise = this.loadEventChild();
  }
  public async loadEventChild(): Promise<EventChild[]> {
    const res: any = await this.http
      .loaderGet('events-child', true)
      .toPromise();
    const modesList = res.data.map((data: EventChild) => {
      return new EventChild(
        data.id,
        data.event_id,
        data.label,
        data.value,
        data.active_status
      );
    });
    return modesList;
  }

  public getEventChilds(): Promise<EventChild> {
    if (!this.EventChildPromise) {
      this.EventChildPromise = this.loadEventChild();
    }
    return this.EventChildPromise;
  }
  async setUsers() {
    this.UsersPromise = this.loadUsers();
  }
  public async loadUsers(): Promise<Users[]> {
    const res: any = await this.http
      .loaderPost('all-users', {}, true)
      .toPromise();
    const modesList = res.map((data: Users) => {
      return new Users(
        data.id,
        data.name,
        data.email,
        data.phone,
        data.dob,
        data.image,
        data.dates,
        data.reminders,
        data.active_status,
        data.soft_delete_status,
        data.type
      );
    });
    return modesList;
  }

  public getUsers(): Promise<Users> {
    if (!this.UsersPromise) {
      this.UsersPromise = this.loadUsers();
    }
    return this.UsersPromise;
  }
  public getFaqs(): Promise<Faq> {
    if (!this.FaqsPromise) {
      this.FaqsPromise = this.loadFaqs();
    }
    return this.FaqsPromise;
  }
  async setFaqs() {
    this.FaqsPromise = this.loadFaqs();
  }
  public async loadFaqs(): Promise<Faq[]> {
    const res: any = await this.http.loaderGet('faq', true).toPromise();
    const modesList = res?.data?.map((data: Faq) => {
      return new Faq(data.id, data.heading, data.paragraph,data.position, data.active_status);
    });
    return modesList;
  }
  async exportToExcel(table: any[]) {
    console.log(table);
  
    const array = [];
    for (const { id, name, dob, email, phone } of table) {
      array.push({ id, name, dob, email, phone });
    }
    
    const worksheet = XLSX.utils.json_to_sheet(array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `table_${date}.xlsx`;
    
    writeFile(workbook, fileName);
  }
}
