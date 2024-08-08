const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66a5e58008e76cd7b9c9fef2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus natus officia nihil unde quidem inventore error enim tenetur earum iste quasi, vitae quo molestiae aliquam labore sunt libero, vel saepe.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dlflwbuwq/image/upload/v1722330152/YelpCamp/goxf0odkqn0ouhja4vjs.jpg',
                    filename: 'YelpCamp/goxf0odkqn0ouhja4vjs',
                },
                {
                    url: 'https://res.cloudinary.com/dlflwbuwq/image/upload/v1722330156/YelpCamp/nzrxiht95pefa4lfhkd5.jpg',
                    filename: 'YelpCamp/nzrxiht95pefa4lfhkd5',
                },
                {
                    url: 'https://res.cloudinary.com/dlflwbuwq/image/upload/v1722330156/YelpCamp/rly0quddauo56owc76ew.jpg',
                    filename: 'YelpCamp/rly0quddauo56owc76ew',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})