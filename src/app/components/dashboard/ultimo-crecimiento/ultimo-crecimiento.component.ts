import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ultimo-crecimiento',
  standalone: true,
  imports: [],
  templateUrl: './ultimo-crecimiento.component.html',
  styleUrl: './ultimo-crecimiento.component.scss'
})
export class UltimoCrecimientoComponent {
  @Input() data: any[] = [];
}
