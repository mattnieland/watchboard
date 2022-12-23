export interface IMyHeader {
  colorScheme: string;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  toggleColorScheme: () => void;
}
