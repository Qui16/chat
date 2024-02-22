import client from '../../client';

export default async (req, res) => {
    const result = client;
    res.status(200).json(result);
};
