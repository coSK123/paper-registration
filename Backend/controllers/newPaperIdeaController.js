import { createKeyPointAndConnectToPaper } from '../database/keyPointCreation.js';
import { createPaper } from '../database/createPaper.js';

export const handleNewPaperIdea = async (req, res) => {
    const { title, description, creator, groupsize, keyPoints } = req.body;
    
    // Validate required fields
    if (!title || !description || !creator || !groupsize) {
        return res
            .status(400)
            .json({ message: "Not all required fields were filled out" });
    }

    try {
        console.log(`Creating paper idea: ${title} by ${creator}`);
        
        // Create the paper entry first
        const paperID = await createPaper({ 
            title, 
            description, 
            creator, 
            groupsize 
        });

        // Then create and connect key points if provided
        if (keyPoints && keyPoints.length > 0) {
            await createKeyPointAndConnectToPaper(keyPoints, paperID);
        }
        
        console.log(`Paper idea created successfully with ID: ${paperID}`);
        return res.status(201).json({ 
            success: true,
            message: `New paper idea "${title}" created successfully!`,
            paperID: paperID
        });
    } catch (err) {
        console.error("Error in handleNewPaperIdea:", err);
        return res.status(500).json({ 
            success: false,
            message: "Failed to create paper idea",
            error: err.message 
        });
    }
};