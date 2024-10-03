import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './Presentation.Layer/app/app.config';
import { AppComponent } from './Presentation.Layer/app/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
