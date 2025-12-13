import { MongoClient, ServerApiVersion, BSON } from "mongodb";
import mysql from "mysql2/promise";

import Connection from "../models/connection.js";
import Query from "../models/query.js";
import { ConnectionModel } from "../types/connection-type.js";
import { QueryModel } from "../types/query-type.js";
import { writeReportFile } from "./writeFile.js";
import Report from "../models/report.js";
import { ReadScheduleType } from "../types/schedule-type.js";

export default async (schedule: ReadScheduleType) => {
  try {
    const query = await Query.findByPk(schedule.queryId);
    if (!query) {
      console.error(
        new Date().toLocaleString(),
        `Query not found fetching by pk ${schedule.queryId}.`,
      );
      return;
    }
    const connectionData = await Connection.findByPk(query.connectionId);
    if (!connectionData) {
      console.error(
        new Date().toLocaleString(),
        `Connection not found fetching by pk ${query.connectionId}.`,
      );
      return;
    }
    const dbType = connectionData?.dbType;

    let results: unknown;
    if (dbType === "MYSQL") {
      results = await executeMySqlQuery({ connectionData, query });
    }
    if (dbType === "MONGODB") {
      results = await executeMongoQuery({ connectionData, query });
    }

    const fileName = `QID${query.id}_${new Date().toLocaleString().replace(/[/:*?"<>|\\,\s]/g, "-").replace(/-+/g, "-")}.${schedule.fileFormat}`;
    await writeReportFile(results, connectionData.userId, fileName, schedule.fileFormat);

    await Report.create({ userId: connectionData.userId, fileName });
  } catch (error) {
    console.error(
      new Date().toLocaleString(),
      "Error running reportId ",
      schedule.queryId,
      error
    );
  }
};

const executeMongoQuery = async ({
  connectionData,
  query,
}: {
  connectionData: ConnectionModel;
  query: QueryModel;
}) => {
  const uri = `mongodb+srv://${connectionData.user}:${connectionData.password}@${connectionData.host}/${connectionData.dbName}?retryWrites=true&w=majority`;
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

    console.log(`Query ${query.id} executed successfully.`);
    return finalData;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

const executeMySqlQuery = async ({
  connectionData,
  query,
}: {
  connectionData: ConnectionModel;
  query: QueryModel;
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
    console.log(`Query ${query.id} executed successfully.`);
    return results;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      await client.end();
    }
  }
};
