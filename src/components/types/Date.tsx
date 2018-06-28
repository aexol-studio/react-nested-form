import { Moment } from 'moment';

export type DateInterface = {
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
  value?: Moment;
  styles?: {
    Date: string;
  };
};
