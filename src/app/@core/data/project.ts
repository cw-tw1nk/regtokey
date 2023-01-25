import { Question, QuestionAnswer } from './questionnaire/question';
import {Questionnaire} from './questionnaire/questionnaire';
import {StatusType} from './StatusType';
import {Ref} from './Ref';
import { FieldModel, FieldOption } from './questionnaire/form';

export interface FormAnswer {
  _id?: string;
  field: Ref<FieldModel>;
  value: string | number;
  options: Omit<FieldOption, 'selected'>[]
}

export interface ProjectAnswer {
  options?: Ref<QuestionAnswer>[];
  form?: FormAnswer | null;
  answer?: string | number | boolean | null;
}

export interface Project {
  _id?: string;
  status: string;
}
export enum ResultType {
  SCORE,
  PERCENT,
  INTERVAL,
}
export interface ProjectResult {
  questions?: {
    question: Question;
    valid?: boolean,
    skipped?: boolean,
    score?: number;
  }[],
  score: number;
  resultType: ResultType
}

export interface PageData<E, T> {
  page: E;
  data?: T;
}

export enum ProjectPage{
  Question = 'question',
  Result = 'result',
}
export type ProjectData = PageData<ProjectPage, Partial<Question> | ProjectResult>;
