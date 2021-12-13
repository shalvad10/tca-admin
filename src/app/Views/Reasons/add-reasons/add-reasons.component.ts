import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { ReasonsService } from 'src/app/Services/Http/reasons.service';

@Component({
  selector: 'app-add-reasons',
  templateUrl: './add-reasons.component.html',
  styleUrls: ['./add-reasons.component.scss']
})

export class AddReasonsComponent implements OnInit {

  constructor(private router: Router, private reasonsService: ReasonsService, private toastr: ToastrService) { }

  isEdit = false;
  showWarnings: boolean = false;
  name: string = '';

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  add() {
    this.reasonsService.create(this.name, SharedMethods.getToken(appData)).subscribe( (data: any) => {
      if (data) {
        appData.data.PRReasons.push(data);
        SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        setTimeout(() => {
          SharedMethods.loader(false);
          this.router.navigateByUrl('/reasons');
        }, 1000);

      }
    });
  }

}
