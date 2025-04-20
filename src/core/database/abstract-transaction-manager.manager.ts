import { DatabaseSession } from './database-session.interface';

export abstract class TransactionManager {
  abstract runInTransaction<T>(
    fn: (context: DatabaseSession) => Promise<T>,
  ): Promise<T>;
}
