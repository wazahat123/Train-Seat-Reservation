const pool = require('../middlewares/connection');


async function createBooking(uid, nSeats){
  try{
    // TODO:
    // conditions for seat booking and generating a booking id
    const booking_id = 108972350 // hardcoding the booking id for now

    // const result = await pool.query('INSERT INTO')

    return res.status(201).json({"message": "seat booked successfully",
            "booking_id": booking_id, 
            "seat_numbers": [5, 6]})
  }catch(err){
    console.error(err)
    return res.status(500).send('Error creating booking.')
  }
}

async function addTrain(trainName, source, dest, seats, atas, atad, res){
  try{
    // TODO:    
    // const train_id = 1; // hard coding train_id for now
    
    const result = await pool.query('INSERT INTO trains values, ($1, $2, $3, $4, $5, $6);', [trainName, source, dest, seats, atas, atad])

    const train_id = await pool.query('select train_id from trains where train_name = $1;', [trainName]).then((err)=>{
      return res.status(201).json({"message": "train added successfully",
            "booking_id": train_id})
    })
    return res.status(500).json({"message": "Some error occured"})

    
  }catch(err){
    console.error(err)
    return res.status(500).send('Error adding train.')
  }
}

async function signup(username, pass, email, res){
  try{
    // TODO:
    
    // const user_id = 1; // hard coding user_id for now
    
    const result = await pool.query('INSERT INTO users (username, pass, email) values($1, $2, $3);', [username, pass, email])

    return res.status(201).json({"message": "User added successfully",
            "booking_id": user_id})
  }catch(err){
    console.error(err)
    return res.status(500).send('Error adding User.')
  }
}





module.exports = {createBooking, addTrain, signup}