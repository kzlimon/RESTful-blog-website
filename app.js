// 1. call dependencies
var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

// 2. connect to mongodb databse
// APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_website', {
    useNewUrlParser: true
});

// 3. setup dependenccies 
// ejs package installed for not using routes file name extensions
app.set("view engine", "ejs");
// to serve custom stylesheet
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// 4. database schema setup
// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    // to set a placeholder image if user does not add one
    // image: {type: String, default: "placehodlerimage.jpg"}
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
// 4.1 compile them into a model
var Blog = mongoose.model("Blog", blogSchema);


// a test blog post
// Blog.create({
//     title: "What are you doing with your life?",
//     image: "https://cdn.pixabay.com/photo/2016/08/25/11/39/roe-1619343__340.jpg",
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
// })

// RESTful ROUTES
// all routes is here

// INDEX - route
app.get("/", function (req, res) {
    res.redirect("/blogs");
});
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("Error!");
        } else {
            res.render("index", {
                blogs: blogs
            });
        }
    });
});






// 5. setup server port
app.listen(3000, function () {
    console.log("Server Started");

})