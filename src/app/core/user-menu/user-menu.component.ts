import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef
} from "@angular/core";
import { AuthService } from "../../auth/service/auth.service";
import { Router } from "@angular/router";
import { BrokerAPIService } from "../../services/brokerapi.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: "cdk-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {
  isOpen: boolean = false;
  public responseLogin: ResponseLogin;
  //currentUser = null;
  Hari;

  firstName: string;
  private Url_Detail: string = "/auth/master/user-changpassword";
  @Input()
  currentUser = null;
  @HostListener("document:click", ["$event", "$event.target"])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private authService: AuthService,
    private brokerAPIService: BrokerAPIService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName');

  }

  logout() {
    console.log("logout")
    this.authService.logout()
    // this.authService.logout().subscribe(
    //   data => {
    //     console.log("logout",data)
    //     if (data) {
    //       // localStorage.clear();
    //       this.router.navigate(["/login"]);
    //     }
    //   });


   this.router.navigate(["/login"]);
  }


  Change() {
    // this.authService.logout();
    this.router.navigate([this.Url_Detail]);
    // this.router.navigate(['/']);
  }
}


interface ResponseLogin {
  success: boolean;
  message: string;
  data: string;
}