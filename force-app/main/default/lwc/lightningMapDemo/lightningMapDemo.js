import { LightningElement, track  } from 'lwc';
import olaMarker from '@salesforce/resourceUrl/mapMarker';

export default class LightningMapDemo extends LightningElement {

    @track olaImage = olaMarker;
    mapOptions = {
        'disableDefaultUI': false, // when true disables Map|Satellite, +|- zoom buttons
        'draggable': true // when false prevents panning by dragging on the map
      };
   
  mapMarkers = [
    {   
        location: {
            City: 'San Francisco',
            Country: 'USA',
            PostalCode: '94105',
            State: 'CA',
            Street: '425 Mission St', 
        },
       
        title:'ABT Transport  Hub'
      },
   {
      location: {
          City: 'SOUTH SAN FRANCISCO',
          Country: 'USA',
          PostalCode: '94080',
          State: 'CA',
          Street: '2216  Carriage Court', 
      },
    
      title:'ABT Transport  Hub'
   
      },
   {
      location: {
          City: ' SUSSEX ',
          Country: 'USA',
          PostalCode: '07461',
          State: 'NJ',
          Street: '961  Pearcy Avenue', 
      },
      title:'ABT Transport  Hub'
    
      },
      {
        location: {
            City: ' New York ',
            Country: 'USA',
            PostalCode: '10011',
            State: 'NY',
            Street: '3444  Grove Street', 
        },
     
        title:'ABT Transport  Hub'
      
        },
        {
            location: {
                City: 'Seattle',
                Country: 'USA',
                PostalCode: '98155',
                State: 'Washington',
                Street: '2877  University Street', 
            },
           
            title:'ABT Transport  Hub'
          
            },
       
  ];
  zoomLevel = 3;
  connectedCallback(){
    console.log('olaMarker::', olaMarker);
    this.olaImage = olaMarker;
  }
}