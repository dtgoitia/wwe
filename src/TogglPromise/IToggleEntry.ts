export interface ITogglEntry {
  id: number;
  guid: string;
  wid: string;
  pid: string;
  billable: boolean;
  start: string|Date;
  stop: string|Date;
  duration: number,
  description: string;
  tags?: string[];
  duronly: boolean;
  at: string|Date;
  uid: number;
}