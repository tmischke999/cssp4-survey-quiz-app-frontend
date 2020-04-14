import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "quiz/:id", component: QuizComponent },
  { path: "take-quiz/:id", component: TakeQuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
