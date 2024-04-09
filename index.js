const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("path",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err);
});


app.get('/', (req,res) => {
     res.send("Root is working");
})
app.listen(port, () => {
    console.log("Server is listening on port 8080");
});

//Index route , will show all chats
app.get('/chats', async (req,res) => {
  let chats = await Chat.find();
//   console.log(chats);
  res.render("index.ejs",{chats});
});

//new route , getting new message
app.get('/chats/new', (req,res) => {
     res.render("new.ejs");
});

//create route,  adding message route
app.post("/chats", (req,res) => {
    let {from , msg, to} = req.body;
    let newChat = new Chat({
        from : from,
        msg : msg,
        to : to,
        created_at : new Date()
    });
    newChat.save().then(() => {
        console.log("Chat was Saved");
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
});

//Edit Route , to edit messages
app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Route
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {newChat} = req.body;
    console.log(newChat);
    let chat = await Chat.findByIdAndUpdate(id, {msg:newChat}, {runValidators:true, new : true});
    console.log(chat);
    res.redirect("/chats");
});

//Delete/Destroy Route
app.delete("/chats/:id", async(req,res) => {
    let {id} = req.params;
    console.log(id);
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});