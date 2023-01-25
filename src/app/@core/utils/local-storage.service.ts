import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public saveData<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  public hasKey(key: string): boolean{
    return (localStorage.getItem(key)?.length ?? 0) > 0;
  }


  public getData<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
