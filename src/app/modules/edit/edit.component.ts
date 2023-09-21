import { Component, OnInit } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { SkillsdropdownService } from '../../services/skillsdropdown.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',

  templateUrl: './edit.component.html',

  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  Skills: any = [];

  selectedManager: any;

  TotalQuestions: { [key: string]: any[] } = {};

  managerSet: any[] = [];

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  selectedQuestions: any[] = [];

  ski: any[] = [];

  FinalizedQuestions: any[] = [];

  finalizedQuestions_Edit: any[] = [];

  duration!: number;

  cutoff!: number;

  FinalOutput: any[] = [];

  emptySkill: boolean = true;

  Skill: any[] = [];

  keys: any[] = [];

  selectedQuestionsID: any;

  count!: number;

  Managername!: string;

  fileName!: string;
  allQuestionsSelected: boolean = false;

  //router: any;

  constructor(
    private managernameService: ManagernameService,

    private skillsdropdownservice: SkillsdropdownService,

    private router: Router
  ) {}

  ngOnInit() {
    this.finalizedQuestions_Edit =
      this.managernameService.getFinalizedQuestions();

    console.log(
      'editQuestions????????????????????',

      this.finalizedQuestions_Edit
    );

    this.cutoff = this.managernameService.getCutoff();

    console.log('editCutoff', this.cutoff);

    this.duration = this.managernameService.getDuration();

    console.log('editduration', this.duration);

    this.Managername = this.managernameService.getManagerName();

    this.fileName = this.managernameService.getFileName();

    this.Skill = this.skillsdropdownservice.getSkill();

    console.log('editskill', this.Skill);

    this.submitForm();

    this.finalizedQuestions_Edit.forEach((question) => {
      if (question) {
        this.selectedQuestions.push(question);
      }
    });

    this.count = this.finalizedQuestions_Edit.filter(
      (question) => question.selected
    ).length;
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
      // const dataToSave = {

      //   questions: this.selectedQuestions,

      //   duration: this.duration,

      //   cutoff: this.cutoff,

      //  // fileName: fileNameWithVersion,

      //   isCreate: false,

      //   isEdit: true,

      //   isMail: true,

      //   Managername: this.Managername,

      //   fileName:this.fileName

      //  // Skill: selectedSkillName,

      // };

      // console.log('responsetosee', dataToSave);

      const Managername = this.Managername;

      const fileName = this.fileName;

      const questions = this.selectedQuestions;

      const duration = this.duration;

      const cutoff = this.cutoff;

      this.skillsdropdownservice

        .updatequestions(Managername, fileName, questions, duration, cutoff)

        .subscribe((response) => {
          // Handle a successful response from the backend here (e.g., show a success message).

          console.log('Update successful', response);
        });

      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  submitForm() {
    this.skillsdropdownservice

      .postskillsList(this.Skill)

      .subscribe((response) => {
        this.TotalQuestions = response;

        console.log('response', this.TotalQuestions);

        this.processTotalQuestions();
      });
  }

  processTotalQuestions() {
    this.count = this.finalizedQuestions_Edit.length;

    this.finalizedQuestions_Edit.forEach((finalizedQuestion: any) => {
      for (const key in this.TotalQuestions) {
        if (this.TotalQuestions.hasOwnProperty(key)) {
          const skillQuestions = this.TotalQuestions[key];

          for (let i = 0; i < skillQuestions.length; i++) {
            if (skillQuestions[i]._id === finalizedQuestion._id) {
              console.log('Matched question', skillQuestions[i]._id);

              skillQuestions[i].selected = true;

              break;
            }
          }
        }
      }
    });
  }

  // checkboxChanged(question: any) {

  //   question.selected = !question.selected;

  // }

  selectedQuestionsBySkill: { [key: string]: any[] } = {};

  // checkboxChanged(question: any) {

  //   question.selected = !question.selected; // Toggle the selected property

  //   // Check if the skill key exists in the selectedQuestionsBySkill object

  //   if (!this.selectedQuestionsBySkill[question.skills]) {

  //     this.selectedQuestionsBySkill[question.skills] = [];

  //   }

  //   if (question.selected) {

  //     this.selectedQuestionsBySkill[question.skills].push(question); // Add the selected question to the array for the corresponding skill

  //   } else {

  //     const index = this.selectedQuestionsBySkill[question.skills].findIndex(

  //       (selectedQuestion) => selectedQuestion._id === question._id

  //     );

  //     if (index !== -1) {

  //       this.selectedQuestionsBySkill[question.skills].splice(index, 1); // Remove the deselected question from the array for the corresponding skill

  //     }

  //   }

  //   console.log('Selected Questions by Skill:', this.selectedQuestionsBySkill); // Log the object to the console

  // }

  // checkboxChanged(question: any) {

  //   question.selected = !question.selected; // Toggle the selected property

  //   const index = this.selectedQuestions.findIndex(

  //     (selectedQuestion) => selectedQuestion._id === question._id

  //   );

  //   if (question.selected) {

  //     if (index === -1) {

  //       this.selectedQuestions.push(question); // Add the selected question to the array

  //     }

  //   } else {

  //     if (index !== -1) {

  //       this.selectedQuestions.splice(index, 1); // Remove the deselected question from the array

  //     }

  //   }

  //   console.log("All Selected Questions:", this.selectedQuestions); // Log the array to the console

  // }

  // selectAllChanged(skillKey: string) {
  //   for (let question of this.TotalQuestions[skillKey]) {
  //     question.selected = !question.selected;
  //   }
  // }
  selectAllChanged(skillKey: string) {
    const skillQuestions = this.TotalQuestions[skillKey];
    const areAllSelected = this.areAllQuestionsSelected(skillKey);
  
    let increment = 0; // Initialize an increment variable
  
   
  
    for (let question of skillQuestions) {
      if (!areAllSelected) {
        if (!question.selected) {
          question.selected = true; // Select questions that were not selected
          increment++; // Increment the count for each newly selected question
        }
      } else {
        if (question.selected) {
          question.selected = false; // Deselect all questions
          increment--; // Decrement the count for each deselected question
        }
      }
    }
  
   
  
    this.count += increment; // Update the count based on the increment
  
   
  
    // Ensure count is not negative
    if (this.count < 0) {
      this.count = 0;
    }
  }
  
  
  
areAllQuestionsSelected(skillKey: string): boolean {
    const skillQuestions = this.TotalQuestions[skillKey];
      return skillQuestions.every((question) => question.selected);
     }
  // selectAllChanged() {
  //   this.allQuestionsSelected = !this.allQuestionsSelected;

  //   for (let skillKey in this.TotalQuestions) {
  //     for (let question of this.TotalQuestions[skillKey]) {
  //       question.selected = this.allQuestionsSelected;
  //     }
  //   }
  // }
  // checkboxChanged(question: any) {
  //   question.selected = !question.selected;
  //   this.updateAllQuestionsSelected();
  // }
  updateAllQuestionsSelected() {
    for (let skillKey in this.TotalQuestions) {
      for (let question of this.TotalQuestions[skillKey]) {
        if (!question.selected) {
          this.allQuestionsSelected = false;
          return;
        }
      }
    }
    this.allQuestionsSelected = true;
  }

  checkboxChanged(question: any) {

    question.selected = !question.selected; // Toggle the selected property

    const index = this.selectedQuestions.findIndex(
      (selectedQuestion) => selectedQuestion._id === question._id
    );

    if (question.selected) {
      if (index === -1) {
        this.selectedQuestions.push(question); // Add the selected question to the array

        this.count++; // Increment the count for a new selected question
      }
    } else {
      if (index !== -1) {
        this.selectedQuestions.splice(index, 1); // Remove the deselected question from the array

        this.count--; // Decrement the count when a question is deselected
      }
    }

    console.log('All Selected Questions:', this.selectedQuestions); // Log the array to the console

    console.log('Count of Selected Questions:', this.count); // Log the count to the console
  }
}
