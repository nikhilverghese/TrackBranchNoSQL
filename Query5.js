import { MongoClient } from 'mongodb';
import runResult from './printQuery.js';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const before = [
    {
      '$match': {
        '$and': [
          {
            'project_name': 'dictumst'
          }, {
            'attributes.bpm': 119
          }
        ]
      }
    }
  ];
const agg = [
  {
    '$match': {
      '$and': [
        {
          'project_name': 'dictumst'
        }, {
          'attributes.bpm': 119
        }
      ]
    }
  }, {
    '$set': {
      'attributes.bpm': 155
    }
  }
];

const reset = [
    {
      '$match': {
        '$and': [
          {
            'project_name': 'dictumst'
          }, {
            'attributes.bpm': 119
          }
        ]
      }
    }, {
      '$set': {
        'attributes.bpm': 119
      }
    }
  ];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('TrackBranch').collection('projects');
const beforeCursor = coll.aggregate(before);
const resetCursor = coll.aggregate(reset);
const cursor = coll.aggregate(agg);
const beforeResult = await beforeCursor.toArray();
const result = await cursor.toArray();

console.log("QUERY5: CHANGES BPM OF PROJECT dictumst FROM 119 TO 155")
resetCursor;
console.log("BEFORE:")
runResult(beforeResult);
console.log("AFTER:")
runResult(result);
await client.close();