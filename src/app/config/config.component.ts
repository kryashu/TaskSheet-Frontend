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
    console.log('ngOnInit');
    // initialize teams
    microsoftTeams.initialize();
    // get context
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
      console.log('getContext');
      this.setValidityState(true);
    });

    microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
      // Calculate host dynamically to enable local debugging
      const host = 'https://' + window.location.host;

      microsoftTeams.settings.setSettings({
        contentUrl: host + '/task_sheet',
        suggestedDisplayName: 'Task Sheet',
        removeUrl: host + '/login',
        entityId: '1'
      });

      saveEvent.notifySuccess();
    });

  }

  public setValidityState(val: boolean) {
    microsoftTeams.settings.setValidityState(true);
  }
  }


