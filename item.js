const mongoose= require('mongoose');

const amenitySchema = new mongoose.Schema({
    name: String,
    icon: String
});

const addressSchema = new mongoose.Schema({
    area: String,
    city: String,
    state: String,
    pincode: Number
});

const bookingSchema = new mongoose.Schema({
    // Define booking properties if needed
});

const imageSchema = new mongoose.Schema({
    public_id: String,
    url: String
});

const propertySchema = new mongoose.Schema({
    propertyName: String,
    description: String,
    propertyType: String,
    roomType: String,
    maximumNight: Number,
    maximumGuest: Number,
    amenities: [amenitySchema],
    images: [imageSchema],
    price: Number,
    address: addressSchema,
    slug: String,
    currentBookings: [bookingSchema]
});

module.exports = mongoose.model('Property', propertySchema);

