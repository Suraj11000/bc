let cache = null;
let lastUpdateTime = 0;
const REVALIDATE_INTERVAL = 30000; // 30 seconds

export default (req, res) => {
    const now = Date.now();

    if (!cache || (now - lastUpdateTime) > REVALIDATE_INTERVAL) {
        cache = { timestamp: new Date().toISOString() };
        lastUpdateTime = now;
    }

    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/') {
        res.status(200).json(cache);
    } else {
        res.status(404).end();
    }
};
