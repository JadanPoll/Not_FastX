import { Injectable } from '@angular/core';

@Injectable()
export abstract class StorageService {
  has (name: string): Boolean { return false }
  get (name: string): any { return }
  set (name: string, value): void {}
  clear (clear: string): void {} 
}
