import {AppComponent} from "./app.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    RouterModule.forRoot
    ([{ path: "", component: AppComponent }]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
