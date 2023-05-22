import { HelperService } from './../../services/helper.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { headerAnimation } from './../../../animations/headerAnimation';
import { UniversalService } from './../../services/universal.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [headerAnimation],
})
export class HeaderComponent implements OnInit {
  public heading: any;
  public href: string = 'null';
  public cartButton: boolean = false;
  public cartButtonShow: boolean = true;
  public headingShow: boolean = true;
  public waiter: any = false;
  public modalReference: any;
  public CartItemsLength: any;
  public sidebarEnable: boolean = true;
  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private helper: HelperService,
    private location: Location,
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      this.text = localStorage.getItem('heading') ? localStorage.getItem('heading') :
      this.helper.addSpaces(
          Number(
            router?.url
              ?.split('/')
              ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
          )
            ? router?.url
                ?.split('/')
                ?.[router?.url?.split('/')?.length - 2]?.replace(/-/g, ' ')
            : router?.url
                ?.split('/')
                ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
        );
      // this.text = this.helper.addSpaces(
      //   Number(
      //     router?.url
      //       ?.split('/')
      //       ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
      //   )
      //     ? router?.url
      //         ?.split('/')
      //         ?.[router?.url?.split('/')?.length - 2]?.replace(/-/g, ' ')
      //     : router?.url
      //         ?.split('/')
      //         ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
      // );
    });
    this.heading = Number(
      router?.url
        ?.split('/')
        ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
    )
      ? router?.url
          ?.split('/')
          ?.[router?.url?.split('/')?.length - 2]?.replace(/-/g, ' ')
      : router?.url
          ?.split('/')
          ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ');
  }
  text: any;
  public expanded!: boolean;
  ngOnInit(): void {
    if (window.innerWidth < 415) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }
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
  }

  currentState = 'hidden';

  changeText() {
    this.currentState = 'hidden';
  }
  animationFinished(event: AnimationEvent) {
    if (event.fromState === 'void' && event.toState === 'hidden') {
      this.text = localStorage.getItem('heading') ? localStorage.getItem('heading') : this.heading;
      this.currentState = 'visible';
    } else if (event.fromState === 'visible' && event.toState === 'hidden') {
      this.text = localStorage.getItem('heading') ? localStorage.getItem('heading') : this.heading;
      this.currentState = 'visible';
    }
  }
  logout() {
    this.authService.logout();
  }
}
