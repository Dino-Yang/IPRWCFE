import {Injectable, TemplateRef} from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
}

@Injectable({providedIn: 'root'})
export class ToastService {
  toasts: ToastInfo[] = [];

  show(header: string, body: string) {
    if (this.toasts.length > 2) {
      this.toasts.push({header: '', body: 'Stop spam clicking please!'});
    } else {
      this.toasts.push({header, body});
    }
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}

