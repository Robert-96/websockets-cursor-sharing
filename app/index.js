(async function() {
  const ws = await connectToServer();

  document.body.onmousemove = (evt) => {
    const messageBody = { x: evt.clientX, y: evt.clientY };
    ws.send(JSON.stringify(messageBody));
  };

  ws.onmessage = (webSocketMessage) => {
    const messageBody = JSON.parse(webSocketMessage.data);
    const cursor = getCursorFor(messageBody);
    cursor.style.transform = `translate(${messageBody.x}px, ${messageBody.y}px)`;
  };

  async function connectToServer() {
    const ws = new WebSocket("ws://localhost:7171/cursor");

    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer)
          resolve(ws);
        }
      }, 10);
    });
  }

  function getCursorFor(messageBody) {
    const sender = messageBody.sender;
    const existing = document.querySelector(`[data-sender="${sender}"]`);

    if (existing) {
      return existing;
    }

    const template = document.getElementById("cursor");
    const cursor = template.content.firstElementChild.cloneNode(true);
    const svgPath = cursor.getElementsByTagName("path")[0];

    cursor.setAttribute("data-sender", sender);
    svgPath.setAttribute("fill", `hsl(${messageBody.color}, 50%, 50%)`);
    document.body.appendChild(cursor);

    return cursor;
  }
})();
