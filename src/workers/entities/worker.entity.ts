import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";

@Schema({ timestamps: true })
export class Worker {
  @Prop({
    required: true,
    unique: true
  })
  name: string;

  @Prop()
  createdAtArabic?: string;

  @Prop()
  updatedAtArabic?: string;

  @Prop({
    required: true,
    ref: 'User'
  })
  createdBy: Types.ObjectId;

  @Prop({
    required: true,
    ref: 'User'
  })
  updatedBy: Types.ObjectId;
}

const WorkerSchema = SchemaFactory.createForClass(Worker);
WorkerSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAtArabic = arabicDateFormatter.format(new Date());
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  } else if (this.isModified()) {
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  }
  next();
});

export { WorkerSchema };

export type WorkerDocument = Worker & Document<Types.ObjectId>;