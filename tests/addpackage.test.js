// use the path of your model
const Product = require('../models/productModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/Travelapp_assignment';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology : true
 
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('Product Schema test anything', () => {
// the code below is for insert testing
 it('Add product testing anything', () => {
 const product = {
 'pname': 'Tours and travels',
 'pdesc': 'Travelling package',
 'pquantity':'10',
 'pprice': '21'

 };
 return Product.create(product)
 .then((pro_ret) => {
 expect(pro_ret.pname).toEqual('Tours and travels');
 });
 });
// the code below is for delete testing
//  it('to test the delete product is working or not', async () => {
//  const status = await Product.deleteMany();

// });
// it('to test the update', async () => {
//     return Product.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')}, 
//    {$set : {pname:'ram'}})

//    });
   })