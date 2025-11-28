import { MongoClient, ServerApiVersion, BSON } from "mongodb";
import mysql from "mysql2/promise";

import Connection from "../models/connection.js";
import Query from "../models/query.js";
import { ConnectionModel } from "../types/connection-type.js";
import { QueryModel } from "../types/query-type.js";
import { ScheduleModel } from "../types/schedule-type.js";

export const executeQuery = async (schedule: ScheduleModel) => {
  const connectionData = await Connection.findByPk(schedule.connectionId);
  const query = await Query.findByPk(schedule.queryId);
  if (!connectionData) {
    console.error(
      new Date().toLocaleString(),
      " Connection not found fetching by pk ",
      schedule.connectionId,
      ". Schedule id: ",
      schedule.id
    );
    return;
  }
  if (!query) {
    console.error(
      new Date().toLocaleString(),
      " Query not found fetching by pk ",
      schedule.queryId,
      ". Schedule id: ",
      schedule.id
    );
    return;
  }
  const dbType = connectionData?.dbType;

  if (dbType === "MYSQL") {
    await executeMySqlQuery({ connectionData, query, schedule });
  }
  if (dbType === "MONGODB") {
    await executeMongoQuery({ connectionData, query, schedule });
  }
};

const executeMongoQuery = async ({
  connectionData,
  query,
  schedule,
}: {
  connectionData: ConnectionModel;
  query: QueryModel;
  schedule: ScheduleModel;
}) => {
  const uri = `mongodb+srv://${connectionData.user}:${connectionData.password}@${connectionData.host}/retryWrites=true&w=majority?appName=${connectionData.dbName}`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    const command = BSON.EJSON.parse(query.query);
    console.log(command);
    const results = await client.db(connectionData.dbName).command(command);
    let finalData: unknown;
    // If it is an aggregation, the data is inside result.cursor.firstBatch
    if (results.cursor && Array.isArray(results.cursor.firstBatch)) {
      finalData = results.cursor.firstBatch;
    }
    // If it is a basic command (like count), the data might be at the root or result.n
    else if (results.n !== undefined) {
      finalData = results.n;
    }
    // Fallback for standard finds if the driver returns them differently
    else {
      finalData = results;
    }
    console.log(`Executed Mongo query ${query.id}. \nOutput:\n`, finalData);
  } catch (error) {
    console.error(
      new Date().toLocaleString(),
      " An error occured connecting or executing the query. ScheduleId: ",
      schedule.id,
      " Error: ",
      error
    );
  } finally {
    await client.close();
  }
};

const executeMySqlQuery = async ({
  connectionData,
  query,
  schedule,
}: {
  connectionData: ConnectionModel;
  query: QueryModel;
  schedule: ScheduleModel;
}) => {
  let client: mysql.Connection | null = null;
  try {
    client = await mysql.createConnection({
      host: connectionData.host,
      port: connectionData.port,
      database: connectionData.dbName,
      user: connectionData.user,
      password: connectionData.password,
    });
    const [results, fields] = await client.query(query.query);

    console.log(`Executed MySql query ${query.id}. \nOutput:\n`, results);
  } catch (error) {
    console.error(
      new Date().toLocaleString(),
      " Error executing scheduleId ",
      schedule.id,
      ": ",
      error
    );
  } finally {
    if (client) {
      await client.end();
    }
  }
};
