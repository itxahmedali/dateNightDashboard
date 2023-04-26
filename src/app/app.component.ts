import { UniversalService } from './services/universal.service';
import { AuthService } from './services/auth.service';
import { Component, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { fadeAnimation } from 'src/animations/animation';
import { fadeIn } from 'src/animations/itemCartAnimation';
import { Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { HelperService } from './services/helper.service';
import { LoaderService } from './services/loader.service';
import Swal from 'sweetalert2';
import { Setting } from 'src/classes';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation, fadeIn],
})
export class AppComponent {
  title = 'restaurant-management';
  public login: boolean = false;
  public cart: boolean = false;
  public windowHeight: number = window.innerHeight;
  private role: any;
  public categories: any = localStorage.getItem('categories');
  public sidebarEnable: boolean = false;
  public expanded!: boolean;
  public expandedBody!: boolean;
  public show: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private router: Router,
    private helper: HelperService
  ) {
  }
  async ngOnInit() {
    if (window.innerWidth < 415) {
      this.expanded = false;
      this.expandedBody = false;
    }
    if (localStorage.getItem('access_token') != null) {
      this.login = true;
    } else {
      this.login = false;
    }
    if (localStorage.getItem('theme') != null) {
      const color = localStorage.getItem('theme');
      this.colorTheme(color);
    } else {
      const color = JSON.stringify(['red', 'black']);
      this.colorTheme(color);
    }
    if (localStorage.getItem('bannertheme') != null) {
      const color = localStorage.getItem('bannertheme');
      this.colorBanner(color);
    } else {
      const color = JSON.stringify(['red', 'black']);
      this.colorBanner(color);
    }
    if (localStorage.hasOwnProperty('orderview')) {
      if (
        localStorage.getItem('orderview') == 'true' ||
        localStorage.getItem('orderview') == null
      ) {
        this.sidebarEnable = false;
      } else {
        this.sidebarEnable = true;
      }
    } else this.sidebarEnable = true;
    await this.observe();
  }
  async observe() {
    AuthService.signin.subscribe((res: boolean) => {
      this.login = res;
      this.cd.detectChanges();
    });
    UniversalService.SideBar.subscribe(
      (res: boolean) => {
        if (res) {
          this.sidebarEnable = true;
        } else {
          this.sidebarEnable = false;
        }
        this.cd.detectChanges();
      },
      (err: any) => console.log(err)
    );
    UniversalService.expand.subscribe(
      (res: boolean) => {
        if (res) {
          this.expanded = true;
          setTimeout(() => {
            this.expandedBody = true;
          }, 500);
        } else {
          this.expanded = false;
          setTimeout(() => {
            this.expandedBody = false;
          }, 500);
        }
        this.cd.detectChanges();
      },
      (err: any) => console.log(err)
    );
    LoaderService.loader.subscribe((res: any) => {
      console.log(res);
      
      this.show = res;
      if (this.show == true) {
        this.document.body.classList.add('bodyLoader');
      } else {
        this.document.body.classList.remove('bodyLoader');
      }
      this.cd.detectChanges();
    });
  }
  colorTheme(color: any) {
    const colors = JSON.parse(color);
    localStorage.setItem('theme', JSON.stringify(colors));
    document.documentElement.style.setProperty(
      '--body-primary-prop',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--body-secondary-prop',
      colors[1]
    );
  }
  colorBanner(color: any) {
    const colors = JSON.parse(color);
    localStorage.setItem('bannertheme', JSON.stringify(colors));
    document.documentElement.style.setProperty(
      '--banner-primary-color',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--banner-secondary-color',
      colors[1]
    );
    document.documentElement.style.setProperty(
      '--bannerForm-primary-color',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--bannerForm-secondary-color',
      colors[1]
    );
  }
  expand() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      document.body.classList.add('expand');
    } else {
      document.body.classList.remove('expand');
    }
    UniversalService.expand.next(this.expanded);
  }
}
