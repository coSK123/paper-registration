import KeyPoint from '../model/keyPoints.js';
import PaperKeyPoint from '../model/paperKeyPoint.js';

export async function createKeyPointAndConnectToPaper(keyPoints, paperId) {
    if (!keyPoints || !Array.isArray(keyPoints) || keyPoints.length === 0) {
        console.log('No key points to create');
        return;
    }
    
    if (!paperId) {
        throw new Error('Paper ID is required to connect key points');
    }
    
    console.log(`Creating ${keyPoints.length} key points for paper ID: ${paperId}`);
    
    try {
        for (const keyPointText of keyPoints) {
            
            let keyPoint = await KeyPoint.findOne({ 
                where: { description: keyPointText } 
            });
            
          
            if (!keyPoint) {
                keyPoint = await KeyPoint.create({ 
                    description: keyPointText 
                });
                console.log(`Created new key point: ${keyPoint.id} - ${keyPointText}`);
            } else {
                console.log(`Using existing key point: ${keyPoint.id} - ${keyPointText}`);
            }
            
            
            await connectPaperAndKeypoint(keyPoint.id, paperId);
        }
        
        console.log(`Successfully connected all key points to paper ${paperId}`);
    } catch (err) {
        console.error(`Error creating/connecting key points for paper ${paperId}:`, err);
        throw err; 
    }
}

async function connectPaperAndKeypoint(keyPointId, paperId) {
    try {
        const connection = await PaperKeyPoint.create({
            PaperEntryId: paperId,
            KeyPointId: keyPointId,
        });
        console.log(`Connected key point ${keyPointId} to paper ${paperId}`);
        return connection;
    } catch (err) {
        console.error(`Error connecting key point ${keyPointId} to paper ${paperId}:`, err);
        throw err; 
    }
}