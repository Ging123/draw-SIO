import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface user {
  email:string;
  username:string;
  password:string;
}

class UserModel {

  private readonly userSchema = new Schema({
    email: {
      type:String,
      required:true,
      maxLength:100,
      index:true,
      unique: true
    },
    username: {
      type:String,
      required:true,
      maxLength:30,
      index:true,
      unique:true
    },
    password: {
      type:String,
      index:true,
      required:true,
      maxlength:100
    },
    token: {
      type:String
    },
    confirmation_code: {
      type:String
    }
  });

  protected readonly userModel = mongoose.models.user || mongoose.model('user', this.userSchema);

  protected createUser(userData:object, confirmation_code:string) {
    return new this.userModel({
      ...userData,
      token:'',
      confirmation_code:confirmation_code
    });
  }
}

export default UserModel; 