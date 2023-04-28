import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Author } from 'src/app/model/authors';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author-listar',
  templateUrl: './author-listar.component.html',
  styleUrls: ['./author-listar.component.css']
})
export class AuthorListarComponent implements OnInit{
  lista: Author[] = [];
  displayedColumns = ['id','nameAuthor','emailAuthor','birthDateAuthor', 'cantidad', 'accion01','accion02'];
  dataSource = new MatTableDataSource<Author>();
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private authorService: AuthorService, private router: Router){
  }
  ngOnInit(): void {    //cada vez q se carga la pagina se carga el on init
    this.authorService.list().subscribe(data => {

      for (var i = 0; i < data.length; i++) {

        data[i].cantidad = 20;

      }

      this.dataSource.data = data;  //asincrona es ucnado una liena de un progama no se quede esperando q llegue el listado sino q sigue corriendo y cuando llegue el lsitado ya lo asigna

    });
  }

  //LISTAR IGUAL AH UN NOMBRE
  /*
    ngOnInit(): void {    //cada vez q se carga la pagina se carg//asincrona es ucnado una liena de un progama no se quede esperando q llegue el listado sino q sigue corriendo y cuando llegue el lsitado ya lo asignaa el on init
    this.authorService.list().subscribe(data =>{

      for (var i = 0; i < data.length; i++) {
        if (data[i].nameAuthor.includes('Juana')) {
            data[i].cant = this.increment(i); //funcion hecha mas abajo
        }
      }

      this.dataSource.data=data;

    });

    console.log("CONTINUE YA ESTA SUSCRITO!!")

  }

  increment(n:number{
    return n*10;
  }
  */

  ngAfterViewInit(){  //dsp q la pagina esta cargada recomeinda material asignar estos valoers
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filtrar(e:any){
    this.dataSource.filter = e.target.value.trim();
  }

  eliminar(id: number){
    this.authorService.delete(id).subscribe(data =>
      this.router.navigate(['authors']).then(()=>{
        window.location.reload();
      })
      );
  }

  delete(id: string){
    this.authorService.eliminar(id).subscribe(()=>
        this.router.navigate(['authors']).then(()=>{
          window.location.reload();
        }))
  }

}
