import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
//   document.addEventListener("wheel", (event) => {
//     console.log("Scroll Delta Y:", event.deltaY);
// });