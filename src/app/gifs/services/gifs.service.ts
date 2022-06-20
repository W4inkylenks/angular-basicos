import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'TlCF32InjUMoYD78qaJFQrwHUsQhEqJf';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  //
  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial]
  }

  constructor( private http: HttpClient) {
    
    if( localStorage.getItem('historial') ) {
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }
    if( localStorage.getItem('resultado') ) {
      this.resultados = JSON.parse( localStorage.getItem('resultado')! );
    }
  }

  buscarGifs( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    if(query.trim().length === 0){
      
      return;
    }
    if( !this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this.historial) );
    }else {
      if( query !== this._historial[0]){
        const posicion: number = this._historial.indexOf(query);
        this._historial.splice( posicion, 1)
        this._historial.unshift(query);

      }
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query);
    
    console.log(params.toString())
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( ( resp: SearchGifsResponse ) => {
        console.log(resp.data)
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify(resp.data));
      })

  }
}
