import { IsString, Matches } from "class-validator";

export class ProductCategoryDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  name: string;
}