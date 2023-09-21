import { Component, OnInit } from '@angular/core';

import { TableService } from 'src/app/services/table.service';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { SkillsdropdownService } from '../../services/skillsdropdown.service';

@Component({
  selector: 'app-schedulepage',

  templateUrl: './schedulepage.component.html',

  styleUrls: ['./schedulepage.component.scss'],
})
export class SchedulepageComponent implements OnInit {
  tables: any[] | undefined;

  cols!: Column[];

  selectedManager: string = '';

  managerOption: any[] = [];

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  managerName: string = '';

  skill: String[] = [];

  filteredSkill: String[] = [];

  fskill: String[] = [];

  exdata: any[] = [];

  filterSkills: FilterSkill[] = [];

  filterManager: any;

  filteredData: any[] = [];

  isCreate: boolean = false;

  isEdit: boolean = false;

  isMail: boolean = false;

  create: boolean = false;

  Tdata: any[] = [];

  isCreateClicked = false;

  dropdownOptions: any[] = [];

  FinalizedQuestions: any[] = [];

  Skill: any[] = []; //for edit

  selectedQuestions: any[] = [];

  cutoff!: number;

  duration!: number;

  email_Managername!: string;

  email_Status!: string;

  email_Filename!: string;

  candidateNames: any[] = [];

  selectedCandidates: any[] = [];

  candidateList: any[] = [];

  questions: any;

  filterPopupVisible: boolean = false;

  candidateNameOptions: any[] = []; // Replace with actual data

  statusOptions: any[] = [];

  names: string[] = [];

  status: string = '';

  CandidatefilteredData: any[] = [];

  view_Managername!: string;

  view_Filename!: string;

  editManagername!: string;

  editFilename!: any;
  

  constructor(
    private tableService: TableService,

    private managernameService: ManagernameService,

    private skillsdropdownservice: SkillsdropdownService,

    private router: Router
  ) {}

  ngOnInit() {
    this.loadManagerNames();

    this.getSkillSet();

    this.existingData();

    this.loadCandidate();

    this.getCandidatename();

    this.cols = [
      { field: 'manager', header: 'Manager' },

      { field: 'file name', header: 'File name' },

      { field: 'actions', header: 'Actions' },
    ];
  }

  getCandidatename(): void {
    this.tableService.getExistingCandidate().subscribe((data) => {
      // Use the map operator to extract the "name" property from each object
      this.candidateNames = data.map(
        (candidate: { candidateName: any }) => candidate.candidateName
      );
      console.log('candidate', data);
      console.log(this.candidateNames);
    });
  }

  onTabChange(event: any) {
    if (event.index === 1) {
      this.loadCandidate();
    }
  }

  loadCandidate() {
    this.managernameService.getCandidateStatus().subscribe((data) => {
      this.candidateList = data;
      console.log('loadDAta', data);
    });
    console.log('load data 1', this.candidateList);
    console.log('selected candidate', this.selectedCandidates);
    // Loop through selectedCandidates and store data for each candidate
    this.selectedCandidates.forEach((selectedCandidate) => {
      // Find the existing candidate data based on the candidateName
      const existingCandidate = this.candidateList.find(
        (candidate) => candidate.candidateName === selectedCandidate
      );
      console.log('matched candidate', existingCandidate);
      if (existingCandidate) {
        this.tableService
          .postExistingCandidateDetails(
            this.email_Managername,
            existingCandidate.candidateName,
            existingCandidate.candidateEmail, // Get candidateEmail from existing data
            existingCandidate.candidatePhone,
            this.email_Status,
            this.email_Filename,
            this.questions
            // Get candidatePhone from existing data
          )
          .subscribe((data) => {
            console.log('Stored data for existing candidate:', data);
          });
      }
    });

    // console.log(this.selectedCandidates);
    // console.log(this.email_Managername);
    // console.log(this.candidateEmail);
    // console.log(this.candidatePhone);
    // console.log(this.email_Status);
    // console.log(this.email_Filename);
    // console.log(this.questions);
    // this.managernameService
    //   .postexistingcandidates(
    //     this.email_Managername,
    //     this.selectedCandidates,
    //     this.candidateEmail,
    //     this.candidatePhone,
    //     this.email_Status,
    //     this.email_Filename,
    //     this.questions
    //   )
    //   .subscribe((data) => {
    //     console.log('postdata', data);
    //   });
  }

  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
    });
  }

  onSearchClick() {
    const skillToFilter =
      this.filterSkills.length > 0 ? this.filterSkills[0].skill : undefined;

    this.skillsdropdownservice

      .filterManager(this.filterManager?.Managername, skillToFilter)

      .subscribe((data) => {
        console.log('Api response', data);

        this.filteredData = data;

        this.Tdata = this.filteredData;

        console.log('filtered data', this.filteredData);

        console.log('Filter Skills:', this.filterSkills);
      });
  }

  existingData() {
    this.tableService.getExistingData().subscribe((data) => {
      this.Tdata = data;
    });
  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerOption = data;
    });
  }

  dropFunction(rowData: any) {
    rowData.isCreate = true;

    console.log('Drop down selected', rowData);

    this.tableService

      .postManagerList(this.selectedManager)

      .subscribe((data) => {
        this.managernameService.setManagerName(this.selectedManager);

        console.log('manager', this.selectedManager);
      });
  }

  addNewRow() {
    const newRow = {
      manager: '',

      fileName: '',

      isCreate: false,

      isEdit: false,

      isMail: false,
    };

    this.Tdata.unshift(newRow);
  }

  //Mail dialog

  displayEmailDialog = false;

  candidateName!: string;

  candidateEmail!: string;

  candidatePhone!: number;

  openEmailDialog(Managername: string, fileName: string) {
    this.displayEmailDialog = true;
    console.log('Openemail');
    this.email_Managername = Managername;
    console.log('emanager', this.email_Managername);
    this.email_Filename = fileName;
    console.log('efile', this.email_Filename);
    this.email_Status = 'Completed';
    console.log('ests', this.email_Status);
    this.tableService

      .getdataby_FileName(Managername, fileName)

      .subscribe((data) => {
        console.log('View Data', data);

        this.questions = data[0].questions;

        console.log('Quest', this.questions);
      });
  }

  cancelEmailPopup() {
    this.displayEmailDialog = false;

    // Reset the form data
  }

  storeCandidate() {
    this.tableService
      .postCandidateDetails(
        this.email_Managername,

        this.candidateName,

        this.candidateEmail,

        this.candidatePhone,

        this.email_Status,

        this.email_Filename,

        this.questions
      )
      .subscribe((response) => {
        console.log('stored', response);
      });
  }

  sendEmail() {
    this.displayEmailDialog = false;

    // Reset the form data
  }

  //view icon
  onViewClick(ManagerName: string, fileName: string) {
    this.tableService
      .getdataby_FileName(ManagerName, fileName)
      .subscribe((data) => {
        console.log('View Data', data);
        this.view_Managername = ManagerName;
        this.view_Filename = fileName;

        this.FinalizedQuestions = data[0].questions;

        this.managernameService.setFinalizedQuestions(this.FinalizedQuestions);
        this.managernameService.setManagerName(this.view_Managername);

        this.managernameService.setFileName(this.view_Filename);

        this.router.navigate(['questiondisplay']);

        console.log('questions :', this.FinalizedQuestions);
      });
  }

  handleEditIconClick(ManagerName: string, fileName: string) {
    this.tableService

      .getdataby_FileName(ManagerName, fileName)

      .subscribe((data) => {
        console.log('View Data', data);

        this.Skill = data[0].Skill;

        this.selectedQuestions = data[0].questions;

        this.cutoff = data[0].cutoff;

        this.duration = data[0].duration;

        this.editManagername = ManagerName;

        this.editFilename = fileName;

        this.managernameService.setCutoff(this.cutoff);

        console.log('edit cutoff', this.cutoff);

        this.managernameService.setDuration(this.duration);

        this.skillsdropdownservice.setSkill(this.Skill);

        console.log('edit skill', this.Skill);

        console.log('edit questions', this.selectedQuestions);

        this.managernameService.setFinalizedQuestions(this.selectedQuestions);

        this.managernameService.setManagerName(this.editManagername);

        this.managernameService.setFileName(this.editFilename);

        this.router.navigate(['edit']);
      });
  }

  //edit icon
  // handleEditIconClick(ManagerName: string, fileName: string) {
  //   this.tableService
  //     .getdataby_FileName(ManagerName, fileName)
  //     .subscribe((data) => {
  //       console.log('View Data', data);
  //       this.Skill = data[0].Skill;
  //       this.selectedQuestions = data[0].questions;
  //       this.cutoff = data[0].cutoff;

  //       this.duration = data[0].duration;

  //       this.managernameService.setCutoff(this.cutoff);
  //       console.log('edit cutoff', this.cutoff);
  //       this.managernameService.setDuration(this.duration);

  //       this.skillsdropdownservice.setSkill(this.Skill);
  //       console.log('edit skill', this.Skill);
  //       console.log('edit questions', this.selectedQuestions);

  //       this.managernameService.setFinalizedQuestions(this.selectedQuestions);
  //       this.router.navigate(['edit']);
  //     });
  // }
}



//candidate filtering


 

 

  // Function to show the filter popup

 



interface Column {
  field: string;

  header: string;
}



interface FilterSkill {
  _id: number;

  skill: string;

  subskills: string[];

  __v: number;
}


