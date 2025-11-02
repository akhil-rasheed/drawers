
import mongoose, { Document, Schema } from 'mongoose';

export interface IDrawer extends Document {
  content: string;
  images: string[];
  status: 'draft' | 'approved';
  createdAt: Date;
}

const DrawerSchema: Schema = new Schema({
  content: { type: String, required: true },
  images: { type: [String], required: false },
  status: { type: String, enum: ['draft', 'approved'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Drawer || mongoose.model<IDrawer>('Drawer', DrawerSchema);
