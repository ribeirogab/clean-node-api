import { MongoClient, Collection } from 'mongodb';

interface IMongoDbHelper {
  client: MongoClient | undefined;
  connect(url?: string): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(collectionName: string): Collection;
}

class MongoDBHelper implements IMongoDbHelper {
  public client: MongoClient | undefined;

  public async connect(url?: string): Promise<void> {
    if (!url) {
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

  public getCollection(collectionName: string): Collection {
    return this.client?.db().collection(collectionName);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mapper<T>({ _id, ...dataWithoutId }: any): T {
    const mappedData: T = {
      id: _id,
      ...dataWithoutId,
    };

    return mappedData;
  }
}

export const mongodbHelper = new MongoDBHelper();
