import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    data: {
      breadcrumb: "Dashboard",
    },
  },
  {
    path: "quizzes",
    data: {
      breadcrumb: "Quizzes",
    },
    children: [
      {
        path: "",
        redirectTo: "../",
        pathMatch: "full",
      },
      {
        path: "quiz/:id/:content",
        component: QuizComponent,
        data: {
          breadcrumb: "View Quiz",
        },
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
