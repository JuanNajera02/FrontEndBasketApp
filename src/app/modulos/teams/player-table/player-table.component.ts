import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent {

  @Input() players: any[] = [];

  editPlayer(player: any) {
    console.log("edit player", player);
  }
  deletePlayer(player: any) {
    console.log('Delete player:', player);
    // Logic to delete the player
  }


}
