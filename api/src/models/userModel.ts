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
    profile_photo: {
      type:String
    },
    token: {
      type:String
    },
    confirmed: {
      type:Boolean
    },
    confirmedCode: {
      type:String
    }
  });

  protected readonly userModel = mongoose.models.user || mongoose.model('user', this.userSchema);

  protected createNewUser(userData:user) {
    return new this.userModel({
      ...userData,
      profile_photo:'',
      token:'',
      confirmed:false,
      confirmedCode:''
    });
  }
}

export default UserModel; 