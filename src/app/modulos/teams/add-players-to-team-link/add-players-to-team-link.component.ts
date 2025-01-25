import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LinkResponse, LinkService } from 'src/app/services/linkService/link.service';
import { urlFront } from 'src/app/url-config';
@Component({
  selector: 'app-add-players-to-team-link',
  templateUrl: './add-players-to-team-link.component.html',
  styleUrls: ['./add-players-to-team-link.component.css']
})
export class AddPlayersToTeamLinkComponent implements OnInit {

  public link:string = "";
  constructor(
    private linkServ:LinkService,
    @Inject(MAT_DIALOG_DATA) public data: { tournamentId: string , teamId:string },
    private dialogRef: MatDialogRef<AddPlayersToTeamLinkComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getLink(this.data.teamId,this.data.tournamentId)
  }

  copyLink(){
    navigator.clipboard.writeText(this.link)
    this.showSnackBar('Link copied to clipboard!', 'Close')
  }

  getLink(teamId:string,tournamentId:string){
    this.linkServ.getLink(teamId,tournamentId).subscribe({
      next:(link:LinkResponse) =>{
        this.link = `${urlFront}/tournament/${this.data.tournamentId}/team/${this.data.teamId}/${link.token}` ;
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  closeModal() {
    this.dialogRef.close()
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Message stays for 2 seconds
      horizontalPosition: 'end', // Aligns snackbar to the right
      verticalPosition: 'top',   // Aligns snackbar to the top
      panelClass: ['green-snackbar'] // Custom class to make it green
    });
  }

}
