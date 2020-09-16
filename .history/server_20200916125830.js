const express = require("express");
const bodyParser = require("body-parser");
const groups = require("./kafka/list-groups.app");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  //   let area = groups.area(2);
  //   console.log("area", area);
  const groupList = groups.listGroups().then((result) => {
    console.log(result);
    res.json(''result);
  });
  //   console.log("groupList", groupList);
  //   res.send(groupList);
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
