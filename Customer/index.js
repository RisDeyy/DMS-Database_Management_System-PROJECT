const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const numeral = require("numeral");
const session = require("express-session"),
bodyParser = require("body-parser");

const app = express();

const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
  helpers: {
    format: (val) => numeral(val).format("0,0") + " đ",
    time: (val, current, block) => {
      var accum = "";
      for (var i = 0; i < val; ++i) accum += block.fn(i + current);
      return accum;
    },
    currentPage: (val, block) => {
      var accum = "";
      accum += block.fn(val);
      return accum;
    },
    rightPage: (val) => Number(val) + 1,
    leftPage: (val) => Number(val) - 1,
    addTwo: (val) => Number(val) + 2,
    ifCond: (v1, operator, v2, options) => {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!=":
          return v1 != v2 ? options.fn(this) : options.inverse(this);
        case "!==":
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case "&&":
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case "||":
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },

    pageIf: (currentPage, operator, value, options) => {
      switch (operator) {
        case "==":
          return currentPage == value
            ? options.fn(currentPage)
            : options.inverse(currentPage);
        default:
          return options.inverse(this);
      }
    },
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "cats" }));
// app.use(function (req, res, next) {
//   res.locals.user = req.user;
//   // res.locals.authenticated = !req.user.anonymous;
//   next();
// });

// app.use((req, res) => {
//   res.render("errors/404", { layout: false });
// });

// app.use((err, req, res, next) => {
//   console.log(err.message);
//   res.status(500).render("errors/500", { layout: false, error: err.message });
// });

app.get('/', (req, res) => {
  res.render('home/home');
})

app.get('/home', (req, res) => {
  res.render('home/home');
})

app.get('/register', (req, res) => {
  res.render('register/register');
})

app.get('/login', (req, res) => {
  res.render('login/login');
})

app.get('/search-for-appointment', (req, res) => {
  res.render('booking/search-for-appointment');
})

app.get('/account', (req, res) => {
  res.render('my-account/my-account');
})

app.get('/contact', (req, res) => {
  res.render('contact/contact');
})

app.listen(process.env.PORT || 5000, () => {
  console.log("App listening on port 5000");
});