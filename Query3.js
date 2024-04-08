import runResult from './printQuery.js'
import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      '$and': [
        {
          '$or': [
            {
              'project_name': {
                '$regex': 'lorem'
              }
            }, {
              'project_name': {
                '$regex': 'ipsum'
              }
            }
          ]
        }, {
          'attributes.bpm': 121
        }
      ]
    }
  }
];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('TrackBranch').collection('projects');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
console.log("QUERY3: RETURNS ALL DOCUMENTS THAT'S NAME IS LOREM OR IPSUM AND BPM IS 121");
runResult(result);
await client.close();