import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './component/author/author.component';

import { CreateEditComponent } from './component/author/create-edit/create-edit.component';

const routes: Routes = [
  {
    path: 'authors', component: AuthorComponent, children: [
      {
        path: 'nuevo', component: CreateEditComponent   //igual q en la clase de authorcreate-edit-component
      },
      {
        path: 'edicion/:id', component: CreateEditComponent   //id es por el id de la fila q se va a editar
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
