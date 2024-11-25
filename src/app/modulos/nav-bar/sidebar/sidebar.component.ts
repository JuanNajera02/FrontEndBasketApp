import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen:boolean = false;
  teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

}
