import { HelperService } from './../../services/helper.service';
import { NavigationEnd, Router } from '@angular/router';
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
import { Setting } from 'src/classes';
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
  public logo: any;
  public id: any;
  routes = [
    {
      path: 'modes',
      title: 'Modes',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      title: 'items',
      type: 'sub',
      icon: 'assets/sidebarIcons/maincourse.webp',
      active: false,
      children: [
        { path: 'foodItems', title: 'Food Items', type: 'link' },
        { path: 'category', title: 'Category', type: 'link' },
        { path: 'sub-category', title: 'Sub Category', type: 'link' },
        { path: 'add-ons', title: 'Add Ons', type: 'link' },
      ],
    },
    {
      path: 'pre-plan-dates',
      title: 'Pre Plan Dates',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'activity',
      title: 'Activity',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'pings',
      title: 'Pings',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'setting',
      title: 'Setting',
      icon: 'assets/sidebarIcons/dessert.webp',
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
