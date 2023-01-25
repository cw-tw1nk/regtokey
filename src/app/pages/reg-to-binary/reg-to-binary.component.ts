import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import parse from '../../../lib/reg-file-parser/reg-file-object';
import { fromHexString, IRegistryExport } from '../../../lib/reg-file-parser';
import * as JSZip from 'jszip';

@Component({
  selector: 'ngx-reg-to-binary',
  templateUrl: './reg-to-binary.component.html',
  styleUrls: ['./reg-to-binary.component.scss']
})
export class RegToBinaryComponent implements OnInit {
  text: string = '';
  error: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  convertFile() {
    try {
      this.convert(parse(this.text))
      this.error = ""
    } catch (e) {
      this.alertError(e.message)
    }
  }

  async convert(val: IRegistryExport) {
    if (val.regValues.length > 0) {
      let regKey = val.regValues[0];
      let root = regKey.root;
      let key = root + "\\" + regKey.keyWithoutRoot;
      console.log(regKey);
      console.log(key);
      const regex = /HKEY_LOCAL_MACHINE\\SOFTWARE\\\w+\\Crypto Pro\\Settings\\Users\\\w+\\Keys\\(\w+)/
      if (regex.test(key)) {
        let zip = new JSZip();
        let arr = regex.exec(key);
        let uuid = arr[1]
        let id = uuid.slice(0, 8)
        let folder = id + ".000";
        // let obj: {[name: string]: Uint8Array} = {}

        for (let value of regKey.values) {
          let hex = value.value.replace("hex:", "").replace(/[^0-9a-fA-F]/gm, "");
          let byteArray = fromHexString(hex);
          let blob = new Blob([byteArray], { type: 'application/octet-stream' });
          let path = folder + "/" + value.entry;
          zip.file(path, blob)
        }

        let result = await zip.generateAsync({type:'blob'});
        this.downloadBlob(folder + ".zip", result)
        // console.log("uuid", uuid)
        // console.log("id", id)
      //  d1a39a9d.000
      //  7d1c3b18.000
      //  0fe1ecb7.000
      //  cf0f07a8.000
      //  cf0f07a8.000
      }
      // let optionalParams = /SOFTWARE\\\w+\\Crypto Pro\\Settings\\Users\\(\w+)\\Keys\\(\w+)/gm.test(key);
      // console.log("test", optionalParams);
      // if (//)
    }
  }

  download(name: string, byteArray: Uint8Array) {
    this.downloadBlob(name, new Blob([byteArray], { type: 'application/octet-stream' }))
  }
  downloadBlob(name: string, blob: Blob) {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }

  changeText($event: string) {
    this.text = $event
    // console.log("Change file: ", $event)
  }

  alertError(e?: string) {
    if (e) {
      this.error = e
      setTimeout(() => this.error = '', 3000)
    } else {
      this.error = ''
    }
  }
}
