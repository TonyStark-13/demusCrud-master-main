import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/model/authors';
import * as moment from 'moment';// add a mano
import { AuthorService } from 'src/app/service/author.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  form : FormGroup = new FormGroup({});
  author : Author = new Author();
  mensaje : string = "";
  maxFecha: Date = moment().add(1, 'days').toDate();

  id: number = 0;
  edicion: boolean = false;

  constructor(private authorService: AuthorService, private router: Router, private route:ActivatedRoute){

    }

  ngOnInit(): void {

      this.route.params.subscribe((data: Params)=>{
        this.id=data['id'],                 //calculando el id del listado y ese id lo aasignamos a una variable
        this.edicion = data['id'] != null;  //edicion es veradero o falso, si no hemos seleccionado nada sera false, entonces queremso insertar una utor no queremos editar
        this.init();      //metodo q lo progamaremos mas abajo

      })

    //Para q se creen los objetos al iniciar
    this.form = new FormGroup(
      {
        //Tiene q se igual escritos que el model
        id: new FormControl(),
        nameAuthor: new FormControl('',Validators.required),
        emailAuthor: new FormControl('',[Validators.required, Validators.email]),
        birthDateAuthor: new FormControl(),
      }
    );

  }
  init() {
    if (this.edicion) {
      //Aca vamos a psar a la caja de edit los valores para que los modifique
      this.authorService.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nameAuthor: new FormControl(data.nameAuthor),
          emailAuthor: new FormControl(data.emailAuthor),
          birthDateAuthor: new FormControl(data.birthDateAuthor)
        })
      })
    }
  }

  aceptar(): void{
    this.author.id = this.form.value['id'];   //Entreparentesis es lo de html
    this.author.nameAuthor = this.form.value['nameAuthor'];
    this.author.emailAuthor = this.form.value['emailAuthor'];
    this.author.birthDateAuthor = this.form.value['birthDateAuthor'];

    if (this.form.valid) {
    {

      if(this.edicion){
        //ACTIALIZAS

        this.authorService.update(this.author).subscribe(data =>
          this.router.navigate(['authors']).then(()=>{
            window.location.reload();
          })
          )

      }

      else{ //INSERT
          //Que vaya ala pagina listado ¿como me voy a esa pagina por su ruta? para eso arriba en el cosntructor inyectamos
          //al router

          //Registramos en la BD
          this.authorService.insertAuthor(this.author).subscribe(data =>  //insertar en una bd de forma asincrona
          this.router.navigate(['authors']).then(()=>{          //lo inserta, va a irse a anavegar a la pagina authors para ver el listado
            window.location.reload();                           //el reload es para que puedas ver lo q has agregado
          })
          )
      }
    }
  }

  else{
   this.mensaje = "Ingrese sus datos correctamente"
  }

  }

}
