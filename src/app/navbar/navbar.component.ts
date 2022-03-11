import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'home',
      path: '',
    },
    {
      label: 'settings',
      path: '/settings',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
