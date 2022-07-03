import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const electron = (<any>window).require('electron');


@Injectable({ providedIn: 'root' })
export class ElectronService {

    images = new BehaviorSubject<string[]>([]);
    directory = new BehaviorSubject<string[]>([]);

    constructor() {
        electron.ipcRenderer.on('getImagesResponse', (_event: any, images: string[]) => {
            this.images.next(images);
        });
        electron.ipcRenderer.on('getDirectoryResponse', (_event: any, directory: string[]) => {
            this.directory.next(directory);
        });
    }

    navigateDirectory(path: string) {
        electron.ipcRenderer.send('navigateDirectory', path);
    }
}
