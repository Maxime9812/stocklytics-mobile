export type Scan =
  | {
      type: 'item';
      id: string;
    }
  | { type: 'not-found' };
