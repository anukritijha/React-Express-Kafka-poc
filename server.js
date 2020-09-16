const express = require("express");
const bodyParser = require("body-parser");
const groups = require("./kafka/list-consumer-groups.app");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/consumergroups", groups.listGroups);

app.listen(port, () => console.log(`Listening on port ${port}`));
