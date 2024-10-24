import express, {Express} from 'express';
import dbInit from './database/init'
import routes from './database/routes';

const app = express();

const port = 3000;

app.use(express.json());

dbInit();

app.use('/api/v1',routes);

app.get('/',(req,res) =>{
    res.send('Welcome to my Website');
});

app.listen(port, () =>{
    console.log(`Server is running on port : ${port}`);
})