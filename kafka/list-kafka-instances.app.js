var zookeeper = require("node-zookeeper-client");

var client = zookeeper.createClient("localhost:2181");
var path = process.argv[0];
console.log("paht", path);

function listChildren(client, path) {
  client.getChildren(
    path,
    function (event) {
      console.log("Got watcher event: %s", event);
      listChildren(client, path);
    },
    function (error, children, stat) {
      if (error) {
        console.log("Failed to list children of %s due to: %s.", path, error);
        return;
      }

      console.log("Children of %s are: %j.", path, children);
    }
  );
}

client.once("connected", function () {
  console.log("Connected to ZooKeeper.");
  listChildren(client, path);
});

client.connect();
