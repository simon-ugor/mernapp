const router = require("express").Router()
const { now } = require("mongoose")
const Email = require("../models/emailModel")

router.post("/enter", async (req, res) => {
    try {
        const {email, number, timestamp} = req.body

        let diffMins;
        let diffDays;

        // validation

        if(!email) {
            return res.status(400).json({msg: "Email not entered."})
        }
        if (!number) {
            return res.status(400).json({msg: "Number not generated."})
        }
        if (!timestamp) {
            return res.status(400).json({msg: "Timestamp not generated."})
        }

        //generate timestamp in here!
        
        const existingEmail = await Email.findOne({email: email})
        if (existingEmail) {
            const existingTimestamp = existingEmail.timestamp
            const nowTimestamp = Date.now()
            const diffMs = nowTimestamp-existingTimestamp
            diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            diffDays = Math.round(diffMs / 86400000);
            const existingNumber = existingEmail.number
            //maybe try to generate timestamp here and not in frontend
            //check if number is bigger or smaller
            console.log(existingNumber + " " + number)
            if (diffMins < 300 && diffDays === 0) {
                const timeRemaining = 300 - diffMins
                console.log(diffDays)
                console.log("You have to wait " + timeRemaining + " more minutes")
                return res.status(400).json({msg: "You have to wait " + timeRemaining + " more minutes."})
            } else if (existingNumber > number) {
                console.log("You number " + number + " was smaller than " + existingNumber)
                return res.status(400).json({msg: "Generated number " + number + " was smaller than your existing number " + existingNumber + "."})
            } else if ((diffMins >= 300 || diffDays > 0) && existingNumber < number) { //else if edit the database entery
                let update = await Email.findOneAndUpdate({email: email}, {number: number, timestamp: Date.now()}, {new: true})
                return res.json(update)
            }
                
        } 

        const newEntry = new Email({
            email,
            number,
            timestamp
        })

        const savedEntry = await newEntry.save()
        res.json(savedEntry)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router