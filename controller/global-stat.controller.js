const {GlobalStat} = require('../database');
const {wrapWithErrorHandler} = require('../util');

// getAll()
// insert
// delete
// update

// 조회
async function getAll(req, res) {
    const result = await GlobalStat.findAll(); //sequelize에서 제공하는 메소드
    res.status(200)
       .json({ result });
    
}

// 추가/수정
async function insertOrUpdate(req, res) {
    // try {
    //     const {cc, date} = req.body;
    //     if (!cc || !date) {
    //         res.status(400)
    //         .json({ error: 'cc and date are required' });
    //         return;
    //     }
    //     const count = await GlobalStat.count({ where: {cc, date} });
    //     if (count === 0) {
    //         await GlobalStat.create(req.body);
    //     } else {
    //         await GlobalStat.update(req.body, { where: {cc, date} });
    //     }

    //     res.status(200)
    //         .json({ result: 'success' });
    // } catch (ex) {
    //     res.status(500).json({ error: ex.toString() });
    // }
    const {cc, date} = req.body;
    if (!cc || !date) {
        res.status(400)
        .json({ error: 'cc and date are required' });
        return;
    }
    const count = await GlobalStat.count({ where: {cc, date} });
    if (count === 0) {
        await GlobalStat.create(req.body);
    } else {
        await GlobalStat.update(req.body, { where: {cc, date} });
    }

    res.status(200)
        .json({ result: 'success' });
}

// 삭제
async function remove(req, res) {
    const {cc, date} = req.body;
    if (!cc || !date) {
        res.status(400).json({ error: 'cc and date are required' });
        return;
    }

    await GlobalStat.destroy({
        where: {
            cc,
            date
        }
    });

    req.status(200).json({ result: 'success' });
}


//
// module.exports = {
//     getAll,
//     insertOrUpdate,
//     remove
// };
module.exports = wrapWithErrorHandler({
    getAll,
    insertOrUpdate,
    remove
});

