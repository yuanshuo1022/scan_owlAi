import express from 'express';
import ethInitMonitor from './service/index';

const app = express();

const initialize = async () => {
  try {
    const ethInitService = await ethInitMonitor();
    for(let i=1701;i<=5000;i++){
      console.log("for--",i,"--login")
      await ethInitService.AutoRegisterWallet();
    }

    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

initialize();
