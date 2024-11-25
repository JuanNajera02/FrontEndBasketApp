import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavbarService } from '../../../services/navbarService/navbar.service';
import { Router } from '@angular/router';
import { authService } from '../../../services/authenticateService/auth.service';
import { NavBarService } from '../../nav-bar/servicios/nav-bar.service';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  searching = false;
  searchQuery = '';
  selectedCategory: string = 'usuarios';
  private searchSubscription: Subscription | undefined;
  @ViewChild(MatAutocomplete) autocomplete!: MatAutocomplete;
  searchResults: any[] = [];
  searchResults$ = new BehaviorSubject<any[]>([]);
  temporadaId: string = '';
  ligaId: string = '';
  public isOpenSideNav:boolean = false;
  filteredResults: Observable<any[]>;
  
  categories: string[] = ['usuarios', 'temporadas', 'ligas', 'equipos'];
  
  usuario: string = localStorage.getItem('usuario') || '';
  tipoUsuario: string = '';
  
  constructor(private app: NavbarService, private router: Router, private auth: authService, private elRef: ElementRef, private searchService: NavBarService) {
    this.filteredResults = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    
  }
  
  openSideNav():void {
    this.isOpenSideNav = !this.isOpenSideNav;
  }

  myControl = new FormControl();
  startSearch() {
    this.searching = true;
  }

  performSearch() {
    console.log(this.searchQuery + ' ' +  this.selectedCategory);

    if (this.selectedCategory === 'usuarios') {
      this.router.navigate(['/buscar-usuario', this.searchQuery]);
    } else if (this.selectedCategory === 'temporadas') {
      this.obtenerTemporadaId(this.searchQuery).subscribe({
        next: (data) => {
          this.temporadaId = data[0].claveTemporada;
          this.router.navigate(['/buscar-temporada', this.searchQuery, this.temporadaId]);
        },
        error: (error) => {
          console.error('Error al realizar la búsqueda de temporadas', error);
          this.searchResults$.next([]);
        }
      });
    } else if (this.selectedCategory === 'ligas') {
      this.obtenerLigaId(this.searchQuery).subscribe({
        next: (data) => {
          this.ligaId = data[0].idLiga;
          this.router.navigate(['/buscar-liga', this.searchQuery, this.ligaId]);
        },
        error: (error) => {
          console.error('Error al realizar la búsqueda de ligas', error);
          this.searchResults$.next([]);
        }
      });
    } else if (this.selectedCategory === 'equipos') {
      this.router.navigate(['/buscar-equipo', this.searchQuery]);
    }

  }

  obtenerTemporadaId(nombreTemp: string): Observable<any> {
    return this.searchService.searchTemporadas(this.searchQuery);
  }

  obtenerLigaId(nombreLiga: string): Observable<any> {
    return this.searchService.searchLigas(this.searchQuery);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    const clickedElement = event.target;

    // Check if the clicked element or its ancestors have the specified classes
    let hasOptionClass = false;
    let currentElement = clickedElement;
    while (currentElement) {
      if (currentElement.classList && currentElement.classList.contains('mat-mdc-option') && currentElement.classList.contains('mdc-list-item')) {
        hasOptionClass = true;
        break;
      }
      currentElement = currentElement.parentElement;
    }

    if (
      !this.elRef.nativeElement.contains(clickedElement) &&
      event.target.tagName !== 'IMG' &&
      !hasOptionClass
    ) {
      this.searching = false;
    }
  }

  onTyping(): void {
    this.searching = true;
    this.searchResults$.next([]); // Limpiar resultados al empezar a escribir

    if (this.searchQuery.trim() !== '') {
      if (this.selectedCategory === 'usuarios') {
        this.searchService.searchUsersOnTyping(this.searchQuery);
        this.searchSubscription = this.searchService.getSearchResultsUsers().subscribe({
          next: (data) => {
            this.searchResults$.next(data);
          },
          error: (error) => {
            console.error('Error al realizar la búsqueda de usuarios', error);
            this.searchResults$.next([]);
          },
        });
      } else if (this.selectedCategory === 'equipos') {
        this.searchService.searchTeamsOnTyping(this.searchQuery);
        this.searchSubscription = this.searchService.getSearchResultsTeams().subscribe({
          next: (data) => {
            this.searchResults$.next(data);
          },
          error: (error) => {
            console.error('Error al realizar la búsqueda de equipos', error);
            this.searchResults$.next([]);
          }
        });
      } else if (this.selectedCategory === 'temporadas') {
        this.searchService.searchTemporadasOnTyping(this.searchQuery);
        this.searchSubscription = this.searchService.getSearchResultsTemporadas().subscribe({
          next: (data) => {
            this.searchResults$.next(data);

          },
          error: (error) => {
            console.error('Error al realizar la búsqueda de temporadas', error);
            this.searchResults$.next([]);
          }
        });
      } else if (this.selectedCategory === 'ligas') {
        this.searchService.searchLigasOnTyping(this.searchQuery);
        this.searchSubscription = this.searchService.getSearchResultsLigas().subscribe({
          next: (data) => {
            this.searchResults$.next(data);
          },
          error: (error) => {
            console.error('Error al realizar la búsqueda de ligas', error);
            this.searchResults$.next([]);
          }
        });
      }
    }
  }

  selectResult(result: any): void {
    this.searchQuery = result.usuario;
    this.searchResults = [];
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.searchResults.filter((result) => result.usuario.toLowerCase().includes(filterValue));
  }

  displayFn(result: any): string {
    return result ? result.usuario : '';
  }

  getValue(result: any): string {
    switch (this.selectedCategory) {
      case 'usuarios':
        return result.usuario;
      case 'temporadas':
        return result.nombreTemporada;
      case 'ligas':
        return result.nombre;
      case 'equipos':
        return result.nombre;
      default:
        return '';
    }
  }

  getContent(result: any): string {
    switch (this.selectedCategory) {
      case 'usuarios':
        return result.usuario;
      case 'temporadas':
        return result.nombreTemporada;
      case 'ligas':
        return result.nombre;
      case 'equipos':
        return result.nombre;
      default:
        return '';
    }
  }

  logout() {
    this.app.logout();
    this.tipoUsuario = 'ANONIMO';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  goPerfil(){
    this.router.navigate(['/perfil']);
  }

  ngOnInit(): void {
    this.getRoleUser(this.usuario);
  }

  getRoleUser(usuario: string) {
    this.auth.obtenerTipoUsuario(usuario).subscribe({
      next: (tipo: any) => {
        this.tipoUsuario = tipo.Rol;
      },
      error: (error) => {
        this.tipoUsuario = 'ANONIMO';
      },
    });
  }
}
