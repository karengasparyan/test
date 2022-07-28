import express, {Router} from 'express';
import http from "http";
const app = express();

const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = Router();
import db from "./configurations/db";

app.use('/test', async (req, res, next) => {
  // const [rows] = await db.query(`SELECT t.id, mat.trainer_id, mat.id, matDoc.material_id, matDoc.path, matDoc.id
  //       FROM trainers t
  //          INNER JOIN materials mat ON t.id = mat.trainer_id
  //          INNER JOIN material_documents matDoc ON mat.id = matDoc.material_id
  //          GROUP BY matDoc.id
  //          `);

  // const [rows] = await db.query(`SELECT
  //                                    t.id,
  //                                    mat.trainer_id,
  //                                    mat.id,
  //                                    matDoc.material_id,
  //                                    matDoc.path,
  //                                    matDoc.id,
  //                                    json_arrayagg(json_object('id', matDoc.id, 'path', matDoc.path, 'test', json_object('id', t.id))) AS picture,
  //                                    json_object('id', t.id) AS trainer
  //                                FROM trainers t
  //                                         INNER JOIN materials mat ON t.id = mat.trainer_id
  //                                         INNER JOIN material_documents matDoc ON mat.id = matDoc.material_id
  //                                GROUP BY matDoc.id
  //          `);
  // console.log(rows[0])

  // const [rows] = await db.query(`SELECT
  //                                    t.id,
  //                                    material_id,
  //                                    JSON_ARRAYAGG(JSON_OBJECT('id', mat.id, 'path', mat.title)) AS materials
  //                                FROM trainers t
  //                                         JOIN materials mat ON t.id = mat.trainer_id
  //                                         JOIN material_documents matDoc ON mat.id = matDoc.material_id
  //                                         GROUP BY t.id, mat.id
  //                                         `);

  const [rows] = await db.query(`select
                                     trainers.id as visit_id,
                                     json_extract(nick_name, '$.hits') as hits,
                                     trainers.nick_name ->> '$.pageviews' as pageviews,
                                     json_extract(trainers.id, '$.adwordsClickInfo.adNetworkType') as adNetworkType,
                                     trainers.id ->>'$.adwordsClickInfo.gclId' as gclId
                                 from
                                     trainers as trainers`);
  console.log(rows)

  const [rows1] = await db.query(`SELECT ADDDATE("2017-06-15", INTERVAL 10 DAY)`);
  console.log(rows1)
  return res.status(200).send({
    test: rows
  })
})

server.listen(3800);
server.on('listening', () => {
  console.log('listened port 3800')
});
