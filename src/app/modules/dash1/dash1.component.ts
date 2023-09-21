import { Component, OnInit } from '@angular/core';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dash1',
  templateUrl: './dash1.component.html',
  styleUrls: ['./dash1.component.scss'],
})
export class Dash1Component implements OnInit {
  // manager!: Manager[];

  Skills: any = [];

  selectedManager: any;

  // TotalQuestions: any;

  TotalQuestions: { [key: string]: any[] } = {};

  managerSet: any[] = [];

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  selectedQuestions: any[] = [];

  ski: any[] = [];

  FinalizedQuestions: any[] = [];

  duration!: number;

  cutoff!: number ;

  FinalOutput: any[] = [];

  emptySkill: boolean = true;

  //dataToSave: any[] = [];

  constructor(
    private skillsdropdownservice: SkillsdropdownService,
    private managernameService: ManagernameService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.reloadData();
    this.loadManagerNames();
    this.selectedManager = this.managernameService.getManagerName();
  }

  reloadData() {
    console.log('hi from Client');

    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;

      // console.log(this.skillSet);

      // console.log('Users:' + JSON.stringify(this.selectedSkill));
    });
  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerSet = data;

      console.log('Selected Manager:', this.selectedManager);
    });
  }
  submitForm() {
    console.log('Selected Skills:', this.selectedSkill);

    this.selectedQuestions = [];
    this.ski = [];
    for (let g of this.selectedSkill) {
      this.ski.push(g.skill);
    }
    console.log(this.ski);

    this.skillsdropdownservice
      .postskillsList(this.ski)
      .subscribe((response) => {
        console.log('response', response);
        console.log('Manager', this.selectedManager);
        this.TotalQuestions = response;
      });

    if (this.selectedSkill.length > 0) {
      this.emptySkill = false;
    }
  }

  checkboxChanged(item: any) {
    if (item.selected) {
      this.selectedQuestions.push(item);
    } else {
      //removing question after unselecting
      const index = this.selectedQuestions.findIndex(
        (selectedQuestion) => selectedQuestion._id === item._id
      );
      if (index !== -1) {
        this.selectedQuestions.splice(index, 1);
      }
    }
  }

  async saveSelected() {
    this.FinalizedQuestions = this.selectedQuestions;
    console.log('selected', this.selectedQuestions);
    console.log('Final', this.FinalizedQuestions);

    //set the Finalizedquestions,Duration,Cuttoff in the service

    this.managernameService.setFinalizedQuestions(this.FinalizedQuestions);
    // this.managernameService.setDuration(this.duration);
    // this.managernameService.setCuttoff(this.cuttoff);

    try {
      const selectedSkillName = this.selectedSkill
        .map((skill) => skill.skill)
        .sort();

      const latestVersion = await lastValueFrom(
        this.skillsdropdownservice.getLatestVersion(
          this.selectedManager.Managername,
          selectedSkillName
        )
      );

      const newVersion = latestVersion ? latestVersion + 1 : 1;
      const fileNameWithVersion = `${selectedSkillName.join(
        '_'
      )}_v${newVersion}`;
      console.log('lv:', latestVersion);
      //save the data
      const dataToSave = {
        Questions: this.FinalizedQuestions,
        duration: this.duration,
        cutoff: this.cutoff,
        fileName: fileNameWithVersion,
        isCreate: false,
        isEdit: true,
        isMail: true,
        Managername: this.selectedManager.Managername,
        Skill: selectedSkillName,
      };
      console.log('response', dataToSave);

      this.skillsdropdownservice
        .postquestions(dataToSave)
        .subscribe((response) => {
          //this.FinalOutput = response;
        });

      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  getDifficultyStyle(difficulty: string): any {
    if (difficulty === 'E') {
      return {
        color: 'green',
        display: 'inline-block',
        padding: '6px 12px',
      };
    } else if (difficulty === 'M') {
      return { color: 'yellow' };
    } else {
      return { color: 'red' };
    }
  }
  //@Input() parent:any;
}
