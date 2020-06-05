import { Component, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    microsoftTeams.initialize();
    microsoftTeams.settings.setValidityState(true);
    this.start();
  }
  start(){
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
      microsoftTeams.settings.setSettings({
        websiteUrl: 'https://task-sheet-symb.herokuapp.com/',
        contentUrl: 'https://task-sheet-symb.herokuapp.com/task_sheet',
        entityId: 'task_Sheet_tab',
        suggestedDisplayName: 'Task Sheet'
      });
      saveEvent.notifySuccess();
    });
  }
}
