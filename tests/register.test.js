// use the path of your model
const Customer = require('../models/customerModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/gym_application';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology : true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('Register Schema test anything', () => {
// the code below is for insert testing
 it('Register testing anything', () => {
 const customer = {
    'username': 'Dhirajroy',
    'password': '1234567',
    'address':'Kathmandu',
    'phone': '214567'
 };
 return Customer.create(customer)
 .then((pro_ret) => {
 expect(pro_ret.username).toEqual('Dhirajroy');
 expect(pro_ret.password).toEqual('1234567');
 });
 });
   })






















// // use the path of your model
// const customer = require('../models/customerModel');
// const mongoose = require('mongoose');
// // use the new name of the database
// const url = 'mongodb://127.0.0.1:27017/Travelapp_assignment';
// beforeAll(async () => {
//  await mongoose.connect(url, {
//  useNewUrlParser: true,
//  useUnifiedTopology : true
 
//  });
// });
// afterAll(async () => {
//  await mongoose.connection.close();
// });
// describe('Customer Schema test anything', () => {
// // the code below is for insert testing
//  it('Add registeration testing anything', () => {
//  const Customer = {
//  'username': 'Dhirajroy',
//  'password': '1234567',
//  'address':'Kathmandu',
//  'phone': '214567'

//  };
//  return Customer.create(customer)
//  .then((pro_ret) => {
//  expect(pro_ret.username).toEqual('Dhirajroy');
//  });
//  });
// // the code below is for delete testing
// //  it('to test the delete product is working or not', async () => {
// //  const status = await Product.deleteMany();

// // });
// // it('to test the update', async () => {
// //     return Product.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')}, 
// //    {$set : {pname:'ram'}})

// //    });
//    })