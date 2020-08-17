import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { FormBuilder, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {

  constructor(
    private auth: AuthService
    , private db: DbService
    , private fb: FormBuilder
    , private dialog: MatDialog
  ) { }

  @Input()
  deckId;

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  @ViewChild('questionRef')
  questionRef;

  question;
  answer;

  cardForm: FormGroup;

  card;

  ngOnInit(): void {
    this.question = '';
    this.answer = '';

    const data = {
      question: ''
      , answer: ''
      , source: ''
      , ...this.card
    };

    this.cardForm = this.fb.group({
      question: [
        data.question,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200)
        ]
      ],
      source: [
        data.source,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200)
        ]
      ],
      answer: [
        data.answer,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200)
        ]
      ]
    });
  }

  async createCard() {
    const uid = await this.auth.uid();
    const id = this.card ? this.card.id : '';
    const data = {
      uid,
      createdDate: Date.now(),
      deckid: this.deckId,
      stage: 0,
      ...this.card,
      ...this.cardForm.value,
      modifiedDate: Date.now()
    };

    delete data.id;
    this.db.updateAt(`cards/${id}`, data)
      .then(_ => {
        this.formGroupDirective.resetForm();
        this.questionRef.nativeElement.focus();
      });
  }

  setFocus() {
    this.questionRef.nativeElement.focus();
  }

  // v1. Just one word
  // TODO: select more words to blind them.
  setBlind(event) {
    if (confirm('🛫  Taking Off 🌎')) {
      const selObj = window.getSelection();
      const selText = selObj.toString().trim();
      const startIndex = event.target.selectionStart;
      const endIndex = (selText.length !== selObj.toString().length) ? event.target.selectionEnd - 1 : event.target.selectionEnd;
      const sentence = this.cardForm.get('question').value;

      this.question = sentence.substring(0, startIndex);
      this.question += '❓';
      this.question += sentence.substring(endIndex);
      this.cardForm.get('question').setValue(this.question);

      this.answer = selText;

      if (!!this.cardForm.get('answer').value) {
        this.cardForm.get('answer').setValue(`${this.cardForm.get('answer').value} ${this.answer}`);
      } else {
        this.cardForm.get('answer').setValue(this.answer);
      }

    }
  }

}
