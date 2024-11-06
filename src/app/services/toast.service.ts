import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  snackBarConfig: MatSnackBarConfig | undefined;
  snackBarRef: MatSnackBarRef<any> | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  snackBarAutoHide = '1500';
  constructor(
    private snackBar: MatSnackBar) {
  }

  error(message: string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = 'snackbar-error';
    return this.snackBar.open(message, undefined, this.snackBarConfig);
  }

  success(message: string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = 'snackbar-success';
    return this.snackBar.open(message, undefined, this.snackBarConfig);
  }

  info(message: string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = 'snackbar-info';
    return this.snackBar.open(message, undefined, this.snackBarConfig);
  }
}
