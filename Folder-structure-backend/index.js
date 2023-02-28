const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion,ObjectId} = require("mongodb");
const cors=require("cors")
const port = 5000
require('dotenv').config()

app.use(cors());
 app.use(express.json())

 const uri = `mongodb+srv://folder-structure-db:wB1f71dJ1x96vfJF@newcluster.zx880.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run =async()=>{
    try {
        await client.connect();
    const db = client.db("folder-db");
    const folderCollection = db.collection("folders");
    

    app.get("/folders",async(req,res)=>{

        const result = await folderCollection.find({}).toArray();
        res.send({ status: true, data: result });
      })

        app.put("/folder",async(req,res)=>{
            const {name,isFolder,items,id}=req.body;
            if(id==="63fcf36f8d1d7e67de62c432"){
                const filter = { _id:new ObjectId(id) };
                const updateDoc = {
                    $push: {
                      items: 
                        {
                            _id: new ObjectId(),
                        name: name,
                        isFolder:isFolder,
                        items:items,
                        }
                    },
                  };
                  const result = await folderCollection.updateOne(filter,updateDoc);
          
                  if(result.acknowledged ){
                    res.send({status: true})
                   }
              
                }
                else{
                  const filter={"items._id": new ObjectId(id)}
                    
            const updateDoc = {
              $push: {
                "items.$[folder].items":{
                  _id: new ObjectId(),
              name: name,
              isFolder:isFolder,
              items:items,
              }
              },
            };
            const arrayFilter = {
              arrayFilters: [{ "folder._id":new ObjectId(id) }],
            };

            const result = await folderCollection.updateOne(
              filter,
              updateDoc,
              arrayFilter
            );
             if(result.acknowledged ){
              res.send({status: true})
             }
                }
            
        })
  
         app.put("/delete/",async(req,res)=>{
          const {id,rootId}=req.body;
         
           
          const filter={"items._id": new ObjectId(id)};
              
          const updateDoc = {
            $pull: {
              "items":{
                _id: new ObjectId(id),
            }
            },
          };
        
          const result = await folderCollection.updateOne(
            filter,
            updateDoc,
          
          );
          if(result.acknowledged ){
            res.send({status: true})
           }
          

         })
        
   
    }
    finally{

    }
        
    }
    run().catch();



    app.get('/', (req, res) => {
        res.send('Hello World!')
      })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
