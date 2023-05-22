import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { UniversalService } from '../services/universal.service';
import { fadeIn } from 'src/animations/itemCardAnimation';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations:[fadeIn]
})
export class DashboardComponent {
  public login: boolean = false;
  public cart: boolean = false;
  public windowHeight: number = window.innerHeight;
  public sidebarEnable: boolean = false;
  public expanded!: boolean;
  public expandedBody!: boolean;
  public show: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private helper: HelperService,
  ) {
  }

  ngOnInit(): void {
    if (window.innerWidth < 415) {
      this.expanded = false;
      this.expandedBody = false;
    }
    if (localStorage.getItem('access_token') != null) {
      this.login = true;
    } else {
      this.login = false;
    }
      const themecolor = JSON.stringify(['red', 'black']);
      this.colorTheme(themecolor);
      const color = JSON.stringify(['red', 'black']);
      this.colorBanner(color);
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
    this.observe();
  }
  async observe() {
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
