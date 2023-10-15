export interface IDatabaseConnection {
  connect(): void;
  disconnect(): void;
}
