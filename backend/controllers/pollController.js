const User = require("../models/User");
const Poll = require("../models/Poll");


exports.createPoll = async (req, res) => {
    const { question, type, options, creatorId } = req.body;

    if (!question || !type || !creatorId) {
        return res.status(400).json({ message: "Question, type and creatorId are required" });
    }
    try {
        let proccessedOptions = [];
        switch (type) { 
            case "single-choice":
                if (options.length < 2) {
                    return res.status(400).json({ message: "Single-choice must have at least two options" });
                }
                proccessedOptions = options.map((option) => ({ optionText: option }));
                break;
            
            case "rating":
                proccessedOptions = [1, 2, 3, 4, 5].map((value) => ({
                    optionText: value.toString(),
                }));
                break;
            
            case "yes/no":
                proccessedOptions = ["Yes", "No"].map((option) => ({
                    optionText: value,
                }));
                break;
            case "image-based":
                if (!options || options.length < 2) {
                    return res.status(400).json({ message: "Image-based poll must have at least two image URLs." });
                }
                proccessedOptions = options.map((url) => ({ optionText: url }));
                break;
            
            
            case "open-ended":
                proccessedOptions = [];
                break;
            
            default:
                return res.status(400).json({ message: "Invalid poll type." });
                
        }

        const newPoll = await Poll.create({
            question,
            type,
            options: proccessedOptions,
            creator: creatorId,

        });
        
        res.status(200).json(newPoll);
        



    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}