import { MongoClient } from 'mongodb';
import runResult from './printQuery.js'
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$addFields': {
      'project_id': 1, 
      'numNotes': {
        '$size': '$notes'
      }
    }
  }, {
    '$sort': {
      'numNotes': -1
    }
  }, {
    '$limit': 1
  }
];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('TrackBranch').collection('projects');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
console.log("QUERY1: RETURNS DOCUMENT WITH MOST NOTES")
runResult(result);
await client.close();