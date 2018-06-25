export interface FileInterface {
  styles?: {
    InputFile: string;
    [x: string]: string;
  };
  onChange: (e: File) => void;
}