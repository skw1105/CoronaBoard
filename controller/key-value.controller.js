const {KeyValue} = require('../database');
const {wrapWithErrorHandler} = require('../util');

// get
// insertOrUpdate
// remove

async function get(req, res) {
    // '/~~~/:key' 라는 라우터 경로가 있을 때 req.params.key로 불러올 수 있다.
    const {key} = req.params;
    if (!key) {
        res.status(400).json({ error: 'key is required' });
        return;
    }

    const result = await KeyValue.findOne({
        where: {key}
    });

    res.status(200).json({ result });
}

async function insertOrUpdate(req, res) {
    //req.body는 request body에 key-value의 데이터가 담긴 객체 프로퍼티. JSON객체에 접근 가능
    const {key} = req.body;
    if (!key || !value) {
        res.status(400).json({ error: 'key and value are required' });
        return;
    }

    await KeyValue.upsert({ key, value });

    res.status(200).json({ result: 'success' });
}

async function remove(req, res) {
    const {key} = req.params;
    if (!key) {
        res.status(400).json({ error: 'key is required' });
        return;
    }

    await KeyValue.destroy({
        where: {key}
    });

    res.status(200).json({ result: 'success' });
}

module.exports = wrapWithErrorHandler({
    get,
    insertOrUpdate,
    remove
});
