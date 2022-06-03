const { start } = require("@nexrender/worker");

const main = async () => {
  const serverHost = "http://localhost:3000";
  const serverSecret = "schaamteloos.online";

  await start(serverHost, serverSecret, {
    binary: "/Applications/AdobeAfterEffects2022/aerender",
    multiFrames: true,
    skipCleanup: false,
    addLicense: false,
    debug: true,
    polling: 4000,
  });
};

main().catch(console.error);
