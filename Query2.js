import runResult from './printQuery.js'
import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$sort': {
      'attributes.bpm': -1
    }
  }, {
    '$project': {
      'bpm': '$attributes.bpm'
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
console.log("QUERY2: RETURNS HIGHEST BPM IN ALL PROJECTS")
runResult(result);
await client.close();