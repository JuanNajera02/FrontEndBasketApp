import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title:string = ""
  constructor(private router: Router) { }
  public showNavBar: boolean = true;

  ngOnInit(): void {
    this.setupNavBarVisibility();
  }

  setupNavBarVisibility(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const noNavBarRoutes = ["/login", "/register"];
        this.showNavBar = !noNavBarRoutes.includes(event.urlAfterRedirects);
      }
    });
  }

}
