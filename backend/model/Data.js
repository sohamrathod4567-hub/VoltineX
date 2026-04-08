import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema(
  {
    voltage: { type: Number, required: true },
    current: { type: Number, required: true },
    temperature: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  {
    versionKey: false,
    toJSON: {
      transform: (_, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

const Data = mongoose.model('Data', dataSchema);
export default Data;
