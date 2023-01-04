const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://capstone2:abcd1234@cluster0.iqd2dqq.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect Successfully");
  } catch (error) {
    console.log("Connect Fail");
  }
}

module.exports = { connect };

// mongodb://mock_pj_sm:mock_pj_sm112233@10.20.22.168:27017/smart_english_tts?authSource=smart_english_tts
