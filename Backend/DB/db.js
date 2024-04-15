const mongoose=require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })


const InvesterSchema=new mongoose.Schema({
    // Schema definition here
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    companyName:{
      type:[{
        comp:String
      }]
    },
    password: {
      type: String,
      required: true
    },
    invested:{
      type:[{
        companyName:String
      }]
    },
    bid:{
      type:[{
        companyName:String,
        Equity:String,
        Price:String,
        accepted:Boolean
      }]
    },
    interested:{
      type:[{
        comp:String
      }
      ]
    }
})

const StartUpSchema=new mongoose.Schema({
    // Schema definition here
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    companyName:{
      type:[{
        comp:String
      }]
    },
    password: {
      type: String,
      required: true
    },
    bid:{
      type:[{
        investerName:String,
        Equity:String,
        Price:String,
        accepted:Boolean
      }]
    },
    investors:{
      type:[{
        name:String,
        companyName:String
      }]
    },
    posts:{
      type:[{
        date:String,
        caption:String,
        Image:String,
        hashtag:[{
          tag:String
        }],
        likes:Number,
        Comments:[{
          Count:Number,
          list:[{
            Comments:String
          }]
        }]
      }]

    }
})

const PostsSchema = new mongoose.Schema({
  posts: {
    type: [{
      name: String,
      email: String,
      date: String,
      caption: String,
      Image: [String], // Array of strings for image URLs
      hashtag: [{ tag: String }], // Array of objects with a single string property
      likes: Number,
      comments: [{
        Count: Number,
        list: [{ Comment: String }] // Array of strings for comments
      }]
    }]
  }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Startup', 'Investor', 'General User'],
    // required: true
  },
  validated: {
    type: Boolean,
    default: false
  }
});
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  profileType: {
    type: String,
    enum: ['Individual', 'Company'],
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  currentInvestors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  }],
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  numberOfInvestors: {
    type: Number,
    default: 0
  },
  stats: {
    // Define your stats schema here
  },
  activity: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
const Invester=mongoose.model("Invester",InvesterSchema);
const User=mongoose.model("User",UserSchema);
const StartUp=mongoose.model("StartUp",StartUpSchema);
const Posts=mongoose.model( "Posts" , PostsSchema)

module.exports={
   Invester,
   StartUp,
   User,
   Posts,
   Profile
}



