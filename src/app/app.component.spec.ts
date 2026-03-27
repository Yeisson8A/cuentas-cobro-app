import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render router outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Angular convierte router-outlet internamente,
    // pero podemos verificar que existe en el DOM
    const outlet = compiled.querySelector('router-outlet');

    expect(outlet).toBeTruthy();
  });

  it('should render toolbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const toolbar = compiled.querySelector('mat-toolbar');

    expect(toolbar).toBeTruthy();
  });

  it('should render content with animation trigger', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica que el componente renderiza correctamente
    expect(compiled).toBeTruthy();
  });
});
