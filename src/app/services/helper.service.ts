import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { Setting, DateMode } from 'src/classes';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public domainId!: number;
  public settings!: Setting;
  public dateModes!: DateMode;
  private settingsPromise!: Promise<Setting>;
  private modePromise!: Promise<any>;
  constructor(private http: HttpService, private toastr: ToastrService) {
    // this.setSettings();
    this.setModes();
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

            if (base64String) {
              this.http
                .loaderPost('image-upload-64', { image: base64String }, true)
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

  titleCheck(title: string, value: string) {
    if (title == value) {
      return true;
    } else {
      return false;
    }
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




  addSpaces(str: string): string {
    let result = str.replace(/([a-z])([A-Z])/g, '$1 $2'); // add space between lowercase and uppercase letters
    result = result.replace(/&/, ' & '); // add spaces around "&" character
    result = result.replace(/(creatediscount|staffpayroll)/, '$1 '); // add space after specific words
    return result;
  }
  // async setSettings() {
  //   this.settingsPromise = this.loadSettings();
  // }
  // public async loadSettings(): Promise<Setting> {
  //   let id = localStorage.getItem('domainId');
  //   const res: any = await this.http
  //     .loaderPost('get-setting', { domain_id: id }, true)
  //     .toPromise();
  //   this.settings = new Setting(
  //     res.data.address,
  //     res.data.banner,
  //     res.data.banner_shade,
  //     res.data.city,
  //     res.data.description,
  //     res.data.slogan,
  //     res.data.domain_id,
  //     res.data.email,
  //     res.data.id,
  //     res.data.logo,
  //     res.data.phone,
  //     res.data.profile,
  //     res.data.restaurant_name,
  //     res.data.theme
  //   );
  //   return this.settings;
  // }

  // public getSettings(): Promise<Setting> {
  //   if (!this.settingsPromise) {
  //     this.settingsPromise = this.loadSettings();
  //   }
  //   return this.settingsPromise;
  // }
  async setModes() {
    this.modePromise = this.loadModes();
  }
  public async loadModes(): Promise<DateMode[]> {
    const res: any = await this.http
      .loaderGet('date-mode', true)
      .toPromise();
    const modesList = res.data.map((data: DateMode) => {
      return new DateMode(
        data.id,
        data.name,
        data.description,
        data.active_status,
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
}
