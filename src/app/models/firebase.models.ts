export interface Lists {
  id: string;
  name: string;
  symbol: string;
  position: number;
  description: string
  // sections: Sections[];
  // items: Items[];
}

export interface Sections {
  name: string;
  expanded: boolean;
}
