import { HelperService } from './../../services/helper.service';
import { UniversalService } from './../../services/universal.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  public sidebarEnable: boolean = false;
  public serviceheading: any;
  public href!: string;
  public role: any;
  public id: any;
  routes = [
    {
      path: 'modes',
      title: 'Modes',
      icon: 'assets/images/mode.webp',
      type: 'link',
    },
    {
      path: 'pre-plan-dates',
      title: 'Pre Plan Dates',
      icon: 'assets/images/dates.webp',
      type: 'link',
    },
    {
      path: 'users',
      title: 'Users',
      icon: 'assets/images/users.webp',
      type: 'link',
    },
    {
      path: 'events',
      title: 'Events',
      icon: 'assets/images/events.webp',
      type: 'link',
    },
    {
      path: 'event-details',
      title: 'Event Details',
      icon: 'assets/images/event-details.webp',
      type: 'link',
    },
    {
      path: 'pings-category',
      title: 'Pings Category',
      icon: 'assets/images/ping-category.webp',
      type: 'link',
    },
    {
      path: 'pings',
      title: 'Pings',
      icon: 'assets/images/pings.webp',
      type: 'link',
    },
    {
      path: 'restaurants',
      title: 'Restaurants',
      icon: 'assets/images/restaurant.webp',
      type: 'link',
    },
    {
      path: 'faq',
      title: "FAQ's",
      icon: 'assets/images/faq.webp',
      type: 'link',
    }
  ];
  public menuItems:any = this.routes
  constructor(private location: Location, private cd: ChangeDetectorRef, private http:HttpService,private helper:HelperService) {
    this.href = this.location.path();
  }
  async ngOnInit() {
    await this.observe();
  }
  // Click Toggle menu
  routerHead(event: any, heading: any) {
    UniversalService.expand.next(false);
    UniversalService.headerHeading.next(heading);
    let path = heading.replace(/[\s,]/g, '');
    UniversalService.itemDetailView.next(false);
    localStorage.setItem('heading', heading);
    if (
      $(event?.target?.parentNode?.parentNode?.parentNode).hasClass(
        'activeSide'
      ) &&
      heading == this.serviceheading
    ) {
      $('li').removeClass('activeSideMenulink');
      $(event?.target?.parentNode?.parentNode?.parentNode).addClass(
        'activeSideMenulink'
      );
    }
    if (event != null) {
      UniversalService.cartShow.next(false);
    }
  }
  toggletNavActive(item: any) {
    if (!item.active) {
      this.menuItems.forEach((a: any) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }
  async observe() {
  }
}
