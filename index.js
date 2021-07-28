// const { v4: uuidv4 } = require('uuid')

// exports.handler = async (event) => {
//   const uuid = uuidv4();
//   return 'uploaded with cli, uuid: ' + uuid;
// };
const host = 'host'
const user = 'test';
const password = 'password';
const database = 'test'

let AWS = require('aws-sdk')
let { Context } = require('aws-lambda')

const knex = require('knex')({
  client: 'mysql',
  connection: {
    ssl: { rejectUnauthorized: false },
    host,
    user,
    password,
    database
  },
});

AWS.config.update({ region: 'ap-northeast-2' })




let count = 0
exports.handler = async (event, context) => {
  try {
    count++;
    await knex('vals').insert({
      key: `test${count}`,
      val: new Date()
    })

    const res = await knex('vals').select();
    console.log(res)
  } catch (err) {
    console.error(err)
  }
};