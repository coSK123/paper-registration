import PaperEntry from '../model/paperEntry.js';
import { createKeyPointAndConnectToPaper } from '../database/keyPointCreation.js';
import { createPaper } from '../database/createPaper.js';

export const handleNewPaperIdea = async (req, res) => {
    const { title, description, creator, groupsize, keyPoints } = req.body;
    if (!title || !description || !creator || !groupsize)
        return res
            .status(400)
            .json({ message: "Not all required fields were filled out" });

    try {
       const paperID = createPaper({ title, description, creator, groupsize });

       createKeyPointAndConnectToPaper( keyPoints, paperID);
        res.status(201).json({ success: `New paper idea ${title} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};