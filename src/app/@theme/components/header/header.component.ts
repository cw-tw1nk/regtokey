import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbIconLibraries,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ProjectService } from '../../../@core/services/project.service';
import { ProjectPage } from '../../../@core/data/project';
import { Question } from '../../../@core/data/questionnaire/question';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    // {
    //   value: 'dark',
    //   name: 'Dark',
    // },
    // {
    //   value: 'corporate',
    //   name: 'Corporate',
    // },
  ];

  currentTheme = 'default';

  userMenu = [{title: 'Profile', link: '/page/profile'}, {title: 'Log out', link: '/auth/logout'}];
  hasPrevious: boolean = !false;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private iconsLibrary: NbIconLibraries,
              private ps: ProjectService,
  ) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    //
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        localStorage.setItem('theme', themeName);
      });
    this.ps.pageData$.value$.subscribe(value => {
      this.hasPrevious = false;
      if(value) {
        if (value.page === ProjectPage.Question) {
          this.hasPrevious = (value.data as Question)?.hasPrevious ?? false
        }
      }
    });
    this.hasTimer.subscribe(value => {
      if (value) this.timer.subscribe({complete: () => this.ps.complete()})
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleTheme() {
    this.themeService.changeTheme(this.themes.filter(value => this.currentTheme !== value.value).pop().value);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  previousQuestion() {
    this.ps.back();
  }

  get timer(): Observable<string> {
    return this.ps.countdown$
  }

  get hasTimer(): Observable<boolean> {
    return this.ps.flag_countdown$.value$
  }
}
