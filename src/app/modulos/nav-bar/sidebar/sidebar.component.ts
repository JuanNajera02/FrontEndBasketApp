import { Component, Input, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../tournament/tournament.service';
import { authService } from 'src/app/services/authenticateService/auth.service';
import { Tournament } from '../../tournament/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen:boolean = false;
  teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
  // PUBLIC
  public tournaments:Tournament[] = []
  // PRIVATE
  private tournamentServ = inject(TournamentService)
  private authService = inject(authService)
  private router = inject(Router)

  ngOnInit(): void {
    this.tournamentServ.getTournaments(this.authService.getUserId(),0,30).subscribe({
      next:(tournaments:Tournament[]) => {
        this.tournaments = tournaments
        console.log("tournaments",tournaments)
      }

    })
  }

  visitTournament(id:string):void{

    this.router.navigate(['/tournament',id]);

  }

}
