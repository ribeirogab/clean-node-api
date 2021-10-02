import { MongoClient } from 'mongodb';

interface IMongoDbHelper {
  client: MongoClient | null;
  connect(url?: string): Promise<void>;
  disconnect(): Promise<void>;
}

class MongoDBHelper implements IMongoDbHelper {
  public client: MongoClient | null;

  public async connect(url?: string): Promise<void> {
    if (url) {
      throw new Error('Connection url with mongodb not provided');
    }

    this.client = new MongoClient(url);
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}

export const mongodbHelper = new MongoDBHelper();
