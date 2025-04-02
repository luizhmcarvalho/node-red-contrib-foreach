module.exports = function (RED) {
    function ForEachNode(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.on('input', function (msg) {
        if (msg.i === undefined) msg.i = 0;
        if (msg.items === undefined) msg.items = msg.payload;
  
        if (msg.items && Array.isArray(msg.items) && msg.i < msg.items.length) {
          let newMsg = RED.util.cloneMessage(msg);
          newMsg.payload = msg.items[msg.i];
          node.send(newMsg);
  
          msg.i++;
          if (msg.i < msg.items.length) {
            node.send([null, msg]); // Envia a mensagem para o segundo output, para continuar o loop.
          }else {
            msg.i = undefined;
            msg.items = undefined;
          }
        }else{
            msg.i = undefined;
            msg.items = undefined;
        }
      });
    }
    RED.nodes.registerType("foreach-node", ForEachNode);
  }