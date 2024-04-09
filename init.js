const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err);
});

let chats = [{
    from : "Priyanshu",
    to : "Akshat",
    msg : "Hello Akshat, Where are you",
    created_at : new Date()
},{
    from : "Akshat",
    to : "Priyanshu",
    msg : "I am at my Home, Priyanshu",
    created_at : new Date()
},
{
    from : "Nihar",
    to : "Priyanshu",
    msg : "Hey Priyanshu, Are you free right now",
    created_at : new Date()
},
{
    from : "Priyanshu",
    to : "Nihar",
    msg : "Not today, But I guess, I will be free tomorrow",
    created_at : new Date()
},
{
    from : "Nihar",
    to : "Priyanshu",
    msg : "Ohk, Will meet tommorow, then",
    created_at : new Date()
},
{
    from : "Nihar",
    to : "Akshat",
    msg : "Hello Akshat, Are you free now",
    created_at : new Date()
},
{
    from : "Akshat",
    to : "Nihar",
    msg : "Yes i am always free, Come to my home we will go somewhere",
    created_at : new Date()
}
];


Chat.insertMany(chats);
