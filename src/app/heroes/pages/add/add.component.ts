import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero:'',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',

  }
  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroeService.getHeroeById( id ) )
    )
    .subscribe( heroe => {  this.heroe = heroe; })

  }

  save(){
    
    if (this.heroe.superhero.trim().length === 0) { return;}

    if (this.heroe.id ){
      // Actualizar
      this.heroeService.updateHeroe ( this.heroe )
        .subscribe( heroe => {
          this.openSnackBar('Registro Actualizado');
        })
    }
    else{
      // agregar
      this.heroeService.addHeroe(this.heroe )
        .subscribe(heroe => {
          this.router.navigate(['heroes/edit/', heroe.id ]);
          this.openSnackBar('Registro Creado');
        })
    }
  }

  deleteHero(){

    const dialog = this.dialog.open( ConfirmComponent, { 
      width: "250px",
      data: this.heroe
    } );

    dialog.afterClosed().subscribe(
      result => {
        if (result){
          this.heroeService.deleteHeroe( this.heroe.id! )
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
            })
        }
      }
    )
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message,'ok!',{
      duration: 2500
    })
  }


}
