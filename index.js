const mongoose = require("mongoose");
const ejs = require("ejs");

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.set("view engine", "ejs");

const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@cluster69.m7nq8c3.mongodb.net/items?retryWrites=true&w=majority&appName=LoanerItems";
mongoose
  .connect(mongoDBConnectionString)
  .then(() => console.log("MongoDB connection successful."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

// const teacherSchema = new mongoose.Schema({
//   name: { type: String, unique: true, required: true },
//   // block: {type: String, required: true},
//   subject: { type: String, required: true }
// });

// const Teacher = mongoose.model("Teacher", teacherSchema);

const classSchema = new mongoose.Schema({
  class: { type: String, required: true },
  teachers: { type: Array, required: true },
  period: { type: String, required: true },
  room: { type: Number },
  dayOfTheWeek: { type: String, required: true },
});

const Class = mongoose.model("Class", classSchema);

// app.get("/teachers", (req, res) => {
//   Teacher.find({}).then((teacher) => {
//     res.render("teacher.ejs", {teacher: teacher});
//   });
// });

// app.post("/teacher", (req, res) => {
//   const teacher = new Teacher({
//     name: req.body.name,
//     // block: req.body.block,
//     subject: req.body.subject,
//   });
//   teacher.save().then((newTeacher) => {
//     res.json(newTeacher);
//   });
// });

// app.patch("/teacher/:name", (req, res) => {
//   const filter = {name: req.body.name};
//   const update = {$set: req.body};
//   Teacher.findOneAndUpdate(filter, update, {new: true})
//   .then((updateItem) => {
//     console.log(updateItem)
//     res.json(updateItem);
//   })
// })

// app.delete("/teacher/:name", (req, res) => {
//   const filter = {name: req.body.name};
//   Teacher.findOneAndDelete(filter)
//   .then((deleteITem) => {
//     res.json(deleteITem)
//   })
// })
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
// app.get("/", (req, res) => {
//   res.send('home')
// });

app.get("/classes", (req, res) => {
  Class.find({}).then((c) => {
    res.render("classes", { classes: c });
  });
});

app.post("/class", (req, res) => {
  const clas = new Class({
    class: req.body.class,
    teachers: req.body.teachers,
    period: req.body.period,
    room: req.body.room,
    dayOfTheWeek: req.body.dayOfTheWeek,
  });
  clas.save().then((newClass) => {
    res.json(newClass);
  });
});

app.get("/substitute/:day", (req, res) => {
  Class.find({ dayOfTheWeek: req.params.day }).then((c) => {
    res.json(c);
  });
});

app.get("/classesmonday", (req, res) => {
  Class.find({ dayOfTheWeek: "Monday" }).then((c) => {
    res.json(c);
  });
});

app.get("/filtercoteacher", (req, res) => {
  Class.find({
    $expr: {
      $gt: [{ $size: "$teachers" }, 1],
    },
  })
    .then((c) => {
      res.json(c);
    })
    .catch((e) => {
      console.log(e);
    });
});
/* app.get("/department", (req, res) => {
  Teacher.find({}).then((t) => {
    if(res.)
  })
}) */

app.listen(3001, () => {
  console.log(`Server running.`);
});
