import { Component, OnInit, Input } from "@angular/core";
import { menus } from "./menu-element";

import { BrokerAPIService } from "../../services/brokerapi.service";

@Component({
  selector: "cdk-sidemenu",
  templateUrl: "./sidemenu.component.html",
  styleUrls: ["./sidemenu.component.scss"]
})
export class SidemenuComponent implements OnInit {
  @Input() iconOnly: boolean = false;
  // public menus: any = {};
  private arrResMenu: any = {};
  public menus = menus;
  private UrlAPI_GetUserMenu: string = "SysMenu/GetUserMenu";

  constructor(private brokerAPIService: BrokerAPIService) {}

  ngOnInit() {
    //console.log("sidemenu ngOnInit");
   // this.setMenu();

   
  }


}
