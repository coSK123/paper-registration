

export async function createKeyPointAndConnectToPaper( keyPoints, paperId ) {
    try {
        for (const keyPointText of keyPoints) {
            let keyPoint = await KeyPoint.findOne({ where: { text: keyPointText } });
            if (!keyPoint) {
                keyPoint = await KeyPoint.create({ text: keyPointText });
            }
            await connectPaperAndKeypoint( keyPoint.id, paperId );
        }
    } catch (err) {
       
    }


}

async function connectPaperAndKeypoint( keyPointId, paperId ) {
    try {
        await PaperKeyPoint.create({
            paperEntryId: paperId,
            keyPointId: keyPointId,
        });
    } catch (err) {
       
    }
}