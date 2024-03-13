export interface List {
  id: string;
  name: string;
}

export interface Symbol {
  id: string;
  name: string;
  order: number;
}

export interface Section {
  name: string;
  expanded: boolean;
}
