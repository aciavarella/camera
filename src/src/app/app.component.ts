import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public videoElem: HTMLVideoElement;
  public canvasElem: HTMLCanvasElement;

  @ViewChild("video") public video: ElementRef;
  @ViewChild("canvas") public canvas: ElementRef;

  public captures: Array<any>;

  blur: boolean;
  sepia: boolean;
  invert: boolean;
  flipHorizontal: boolean;
  flipVertical: boolean;

  public constructor() {
    this.captures = [];
  }

  public ngOnInit() {
    this.videoElem = this.video.nativeElement;
    this.canvasElem = this.canvas.nativeElement;
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { 'facingMode': 'environment' }
      })
        .then(stream => {
          this.videoElem.src = window.URL.createObjectURL(stream);
          this.videoElem.play();
        });
    }
  }

  public capture() {
    // Get the exact size of the video element.
    let width = this.videoElem.videoWidth;
    let height = this.videoElem.videoHeight;

    // Set the canvas to the same dimensions as the video.
    this.canvasElem.width = width;
    this.canvasElem.height = height;

    // set the actual style by user select...
    // this.videoElem.style.setProperty("filter", this.getStyles().filter);
    // this.videoElem.style.setProperty("transform", this.getStyles().transform);

    var context = this.canvasElem.getContext("2d");
    context.drawImage(this.videoElem, 0, 0, width, height);
    this.captures.push(this.canvasElem.toDataURL("image/png"));
  }

  getStyles() {
    let filter = '';
    let transform = '';

    if (this.blur) {
      filter += 'blur(5px)';
    }
    if (this.sepia) {
      filter += 'sepia(100%)';
    }
    if (this.invert) {
      filter += 'invert(1)';
    }
    if (this.flipHorizontal) {
      transform += 'scaleX(-1)';
    }
    if (this.flipVertical) {
      transform += 'scaleY(-1)';
    }

    return {
      filter,
      transform
    }
  }

}