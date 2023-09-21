import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dash1Component } from './modules/dash1/dash1.component';
import { SchedulepageComponent } from './modules/schedulepage/schedulepage.component';
import { QuestiondisplayComponent } from './modules/questiondisplay/questiondisplay.component';
import { EditComponent } from './modules/edit/edit.component';

const routes: Routes = [
  { path: 'create', component: Dash1Component },
  { path: 'dashboard', component: SchedulepageComponent },
  { path: 'questiondisplay', component: QuestiondisplayComponent },
  { path: 'edit', component: EditComponent },
  { path: '**', component: SchedulepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
