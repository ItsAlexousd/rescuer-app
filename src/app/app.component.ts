import {Component, OnInit} from '@angular/core';
import {Rescuer} from "./rescuer";
import {RescuerService} from "./rescuer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public rescuers: Rescuer[] = [];
  public editRescuer?: Rescuer;
  public deleteRescuer?: Rescuer;

  constructor(private rescuerService: RescuerService) {}

  ngOnInit() {
    this.getRescuers();
  }

  public getRescuers(): void {
    this.rescuerService.getRescuers().subscribe(
      (response: Rescuer[]) => {
        this.rescuers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddRescuer(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById("add-rescuer-form").click();

    this.rescuerService.addRescuer(addForm.value).subscribe(
      (response: Rescuer) => {
        console.log(response);
        this.getRescuers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateRescuer(rescuer: Rescuer): void {
    this.rescuerService.updateRescuer(rescuer).subscribe(
      (response: Rescuer) => {
        console.log(response);
        this.getRescuers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteRescuer(rescuerId: number): void {
    this.rescuerService.deleteRescuer(rescuerId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRescuers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchRescuers(key: string): void {
    console.log(key);
    const results: Rescuer[] = [];

    for (const rescuer of this.rescuers) {
      if (rescuer.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || rescuer.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || rescuer.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(rescuer);
      }
    }

    this.rescuers = results;

    if (results.length === 0 || !key) {
      this.getRescuers();
    }
  }

  public onOpenModal(rescuer: Rescuer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addRescuerModal');
    }

    if (mode === 'edit') {
      this.editRescuer = rescuer;
      button.setAttribute('data-target', '#updateRescuerModal');
    }

    if (mode === 'delete') {
      this.deleteRescuer = rescuer;
      button.setAttribute('data-target', '#deleteRescuerModal');
    }

    if(container != null) {
      container.appendChild(button);
    }

    button.click();
  }
}
