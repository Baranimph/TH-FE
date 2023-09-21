import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
        RadioComponent,
        CheckboxComponent
    ],
    exports: [
        RadioComponent,
        CheckboxComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
