import { QuestionType } from './QuestionType';
import { Ref } from '../Ref';
import { Form } from './form';
import { Observable } from 'rxjs';
import { ProjectAnswer } from '../project';

export interface QuestionAnswer {
  _id: string;
  title: string;
  order: number;
  boolean_value?: boolean;

  selected?: boolean;
}

export interface Question {
  _id?: string;
  title: string;
  content: string;
  ref_form?: Form;
  next_question?: Ref<Question> | null;
  type: QuestionType;
  placeholder?: string;
  answers: QuestionAnswer[];
  filling_percentage?: number;
  depth: number;
  state?: ProjectAnswer;
  // grade?: number;
  // result_show: boolean;
  required: boolean;
  hasPrevious: boolean;
  expires: Date
}

export abstract class QuestionData {
  abstract getQuestion(project_id: string): Observable<Question>;
}
