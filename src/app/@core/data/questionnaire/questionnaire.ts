import {Question} from './question';
import {StatusType} from '../StatusType';
import {Ref} from '../Ref';
export enum QuestionnaireType{
  GRAPH,
  LIST,
  RANDOM_LIST,
}
export interface Questionnaire {
  title: string;
  description: string;
  expires?: Date;
  limit?: number;
  status: StatusType;
  type: QuestionnaireType;
  [key: string]: unknown;
}


