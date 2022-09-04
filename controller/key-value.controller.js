const {KeyValue} = require('../database');
const {wrapWithErrorHandler} = require('../util');

// get
// insertOrUpdate
// remove

async function get(req, res) {
    const {key} = req.params;
    if (!key) {
        res.status(400).json({ error: 'key is required' });
        return;
    }

    const result = await KeyValue.findOne({
        where: {key}
    });

    res.status(200).json({ result });
};
