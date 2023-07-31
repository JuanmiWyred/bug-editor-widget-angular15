import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Editor from '@arcgis/core/widgets/Editor.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('mapView', { static: true }) mapView!: ElementRef;

  ngOnInit(): void {
    const container = this.mapView.nativeElement;

    const featureLayer = new FeatureLayer({
      url: 'https://services3.arcgis.com/DmMLlZQyuQ6w7Diz/arcgis/rest/services/bug_angular/FeatureServer/0',
    });

    /*MAP CREATION*/
    const map = new Map({
      basemap: 'arcgis-imagery', // Basemap layer
      layers: [featureLayer],
    });

    const view = new MapView({
      map: map,
      ui: { components: ['attribution'] },
      center: [-3.682155, 40.415704],
      zoom: 16, // scale: 72223.819286
      container,
      popupEnabled: true,
      popup: { defaultPopupTemplateEnabled: false },
      constraints: {
        snapToZoom: false,
      },
    });

    //fullscreen
    const editor = new Editor({
      view: view,
    });

    view.ui.add(editor, 'bottom-right');

    editor.viewModel.featureFormViewModel.on('value-change', (event) => {
      console.log('Feature Form is valid? -->', event.valid);
      console.log(
        'Feature Form is submmitable? -->',
        editor.viewModel.featureFormViewModel.submittable
      );
    });
  }
}
