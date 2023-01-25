import { StatusType } from '../StatusType';

export enum FieldType {
  INPUT,
  PHONE,
  EMAIL,
  CHECKBOX,
  OPTION,
  TEXTAREA,
  BOOLEAN,
  SELECT,
}

export interface FieldOption {
  _id: string;
  title: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface FieldModel {
  _id?: string;
  title: string;
  type: FieldType;
  order: number;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  hidden: boolean;
  placeholder?: string
  default_value: string | number;
  mask: string;
  validation: string[];
  options: FieldOption[];
  icon?: string;
  pack?: string;
  value: string;

  error?: string;
  valid?: boolean;
}

export interface Form {
  _id: string,
  fields: FieldModel[];
}

